# Australian National Parks Voting Application

## Overview

This is a full-stack web application that allows users to vote on Australian national parks in head-to-head matchups using an ELO rating system. Users can compare parks and see real-time rankings based on voting results. The application features a modern React frontend with a comprehensive collection of Australian national parks from all states and territories.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for consistent theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management with real-time updates
- **Build Tool**: Vite for fast development and optimized production builds
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Framework**: Express.js with TypeScript for robust API development
- **API Design**: RESTful API with JSON responses following standard HTTP conventions
- **Database ORM**: Drizzle ORM for type-safe database operations and migrations
- **Session Management**: Express sessions with PostgreSQL storage via connect-pg-simple
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Logging**: Custom request/response logging middleware for debugging and monitoring
- **Static Files**: Development mode uses Vite middleware, production serves static files

### Database Schema
The application uses a PostgreSQL database with three main entities designed for the ELO rating voting system:

- **Parks Table**: Stores comprehensive park information including name, state, coordinates, establishment date, description, image URL, ELO rating (default 1500), and vote statistics
- **Votes Table**: Records each voting interaction with winner/loser IDs, previous ratings, new ratings, and rating changes for complete audit trail
- **Users Table**: Basic user management structure (defined but not fully implemented in current codebase)

### Key Features
- **ELO Rating System**: Implements proper ELO calculations with configurable K-factor for dynamic park rankings
- **Real-time Updates**: Queries refresh every 5 seconds to show live voting results and ranking changes
- **Comprehensive Park Data**: Includes parks from all Australian states and territories with detailed metadata
- **Responsive Design**: Mobile-first approach with adaptive layouts for all screen sizes
- **Docker Support**: Complete containerization with development and production Docker configurations

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database with WebSocket support for real-time connections
- **Connection Pooling**: Uses @neondatabase/serverless with connection pooling for optimal performance

### UI Framework
- **Radix UI**: Accessible component primitives for dropdowns, dialogs, navigation, and form controls
- **Lucide React**: Consistent icon library for UI elements
- **Tailwind CSS**: Utility-first CSS framework with PostCSS for processing

### Development Tools
- **TypeScript**: Full type safety across frontend, backend, and shared schemas
- **Drizzle Kit**: Database migrations and schema management
- **ESBuild**: Fast bundling for production server builds
- **Vite Plugins**: Runtime error overlay and development tooling integration

### Runtime Dependencies
- **Express Session Store**: connect-pg-simple for PostgreSQL-backed session persistence
- **Date Utilities**: date-fns for consistent date formatting and manipulation
- **Class Utilities**: clsx and tailwind-merge for dynamic CSS class management
- **Validation**: Zod for runtime type validation and schema parsing