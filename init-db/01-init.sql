-- Initialize database for Australian National Parks Voting App
-- This script runs when the PostgreSQL container starts for the first time

-- Ensure the database exists
SELECT 'CREATE DATABASE nps_rank' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'nps_rank')\gexec

-- Connect to the database
\c nps_rank;

-- The application will handle table creation via Drizzle migrations
-- This file ensures the database is ready for the application

-- Optional: Create additional indexes for performance if needed
-- (These will be created by the application, but can be added here for production optimization)

-- Log successful initialization
DO $$
BEGIN
    RAISE NOTICE 'Australian National Parks Voting Database initialized successfully';
END $$;