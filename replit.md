# Australian National Parks Voting Application

## Overview

This is a full-stack web application that allows users to vote on Australian national parks in head-to-head matchups using an ELO rating system. Users can compare parks and see real-time rankings based on community voting. The application features a modern React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with JSON responses
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless connection
- **Session Management**: Express sessions with PostgreSQL storage via connect-pg-simple
- **Error Handling**: Centralized error handling middleware
- **Logging**: Custom request/response logging middleware

### Database Schema
The application uses three main tables:
- **Parks**: Stores national park information including name, state, coordinates, establishment date, description, ELO rating, vote statistics, and image URLs
- **Votes**: Records each voting event with winner/loser IDs, previous ratings, new ratings, and rating changes
- **Users**: User account information with relationships to votes (schema defined but not fully implemented)

### ELO Rating System
- Each park starts with a baseline rating of 1500 points
- Rating changes are calculated using standard ELO algorithm with K-factor of 32
- Winners gain points while losers lose points based on relative skill difference
- Rating changes are stored for historical tracking and analysis

### API Endpoints
- `GET /api/matchup` - Returns two random parks for head-to-head comparison
- `POST /api/vote` - Submits a vote and updates ELO ratings
- `GET /api/rankings` - Returns parks sorted by ELO rating
- `GET /api/statistics` - Returns voting statistics and metrics
- `POST /api/initialize-parks` - Seeds database with initial park data

### Data Management
- Park data is seeded from hardcoded Australian national parks information
- Vote history is maintained for analytics and rating recalculation
- Real-time updates to rankings after each vote
- Statistics tracking including daily vote counts and most contested parks

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle Kit**: Database migration and schema management tools

### UI and Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide Icons**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for managing component variants

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment plugins and error overlays

### Data Processing
- **Date-fns**: Date manipulation and formatting utilities
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema parsing