import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";

// Development or production mode helper functions
async function initializeViteHelpers() {
  if (process.env.NODE_ENV === "development") {
    const viteModule = await import("./vite");
    return {
      setupVite: viteModule.setupVite,
      serveStatic: viteModule.serveStatic,
      log: viteModule.log,
    };
  } else {
    // Production implementations
    return {
      setupVite: null,
      serveStatic: (app: express.Application) => {
        app.use(express.static(path.resolve("dist")));
        
        // Serve index.html for all non-API routes (SPA routing)
        app.get("*", (req, res, next) => {
          if (req.path.startsWith("/api")) {
            return next();
          }
          res.sendFile(path.resolve("dist/index.html"));
        });
      },
      log: (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`${timestamp} [express] ${message}`);
      },
    };
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Temporary logging function that will be replaced
let logFunction = (message: string) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${timestamp} [express] ${message}`);
};

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      logFunction(logLine);
    }
  });

  next();
});

(async () => {
  // Initialize helpers based on environment
  const { setupVite, serveStatic, log } = await initializeViteHelpers();
  
  // Replace the temporary log function with the proper one
  logFunction = log;
  
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Setup Vite in development or serve static files in production
  if (process.env.NODE_ENV === "development" && setupVite) {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Start the server
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
