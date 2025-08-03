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

The application uses a PostgreSQL database with three main entities designed for the ELO rating voting system:

```mermaid
erDiagram
    PARKS {
        string id PK "Unique identifier (kebab-case)"
        string name "Park display name"
        string state "Australian state/territory"
        string coordinates "GPS coordinates"
        string establishedDate "Year established"
        text description "Park description"
        string imageUrl "High-quality park image URL"
        integer eloRating "Current ELO rating (default: 1500)"
        integer totalVotes "Total votes involving this park"
        integer wins "Number of wins"
        integer losses "Number of losses"
        timestamp createdAt "Record creation time"
        timestamp updatedAt "Last update time"
    }
    
    VOTES {
        string id PK "UUID vote identifier"
        string winnerId FK "Reference to winning park"
        string loserId FK "Reference to losing park"
        integer winnerPreviousRating "Winner's rating before vote"
        integer loserPreviousRating "Loser's rating before vote"
        integer winnerNewRating "Winner's rating after vote"
        integer loserNewRating "Loser's rating after vote"
        integer winnerRatingChange "Rating points gained by winner"
        integer loserRatingChange "Rating points lost by loser"
        timestamp createdAt "Vote timestamp"
    }
    
    USERS {
        integer id PK "Auto-increment user ID"
        string username "Unique username"
        string passwordHash "Hashed password"
        timestamp createdAt "Account creation time"
        timestamp updatedAt "Last profile update"
    }
    
    PARKS ||--o{ VOTES : "wins/losses"
    PARKS ||--o{ VOTES : "participates_in"
    USERS ||--o{ VOTES : "casts (future feature)"
```

#### Schema Details

**Parks Table**
- Primary entity storing all Australian national park information
- ELO rating system with 1500 starting rating for all parks
- Comprehensive metadata including establishment dates and coordinates
- Vote statistics tracking for analytics and leaderboards

**Votes Table** 
- Records complete voting history with before/after ratings
- Enables ELO calculation verification and historical analysis
- Stores rating changes for statistics and trending analysis
- Foreign key relationships to parks for winner/loser tracking

**Users Table**
- Authentication system (currently not fully implemented)
- Designed for future features like user profiles and voting history
- Prepared for user-specific analytics and preferences

#### Relationships
- Each vote references exactly two parks (winner and loser)
- Parks can participate in unlimited votes over time
- Rating changes are calculated using standard ELO algorithm (K-factor: 32)
- All historical data preserved for analysis and rating recalculation

### ELO Rating System

The application implements a chess-style ELO rating system for ranking national parks based on head-to-head vote outcomes:

```mermaid
flowchart LR
    A[Park A: 1500] --> C{Vote Outcome}
    B[Park B: 1500] --> C
    
    C -->|A Wins| D[Calculate Rating Change]
    C -->|B Wins| E[Calculate Rating Change]
    
    D --> F[A: 1516 ↑+16<br/>B: 1484 ↓-16]
    E --> G[A: 1484 ↓-16<br/>B: 1516 ↑+16]
    
    F --> H[Update Database]
    G --> H
    H --> I[Record Vote History]
    
    style C fill:#e3f2fd
    style F fill:#e8f5e8
    style G fill:#ffebee
```

**Algorithm Details:**
- **Starting Rating**: All parks begin with 1500 points (industry standard)
- **K-Factor**: 32 (determines rating volatility - higher = more dramatic changes)
- **Expected Score Formula**: `E = 1 / (1 + 10^((RatingB - RatingA) / 400))`
- **New Rating Formula**: `NewRating = OldRating + K * (ActualScore - ExpectedScore)`

**Rating Dynamics:**
- Underdog victories result in larger rating swings
- Closely matched parks see smaller rating changes  
- System naturally converges toward accurate rankings over time
- All rating changes are symmetric (winner gains = loser loses)

**Implementation Benefits:**
- Self-balancing system requires minimal manual adjustment
- Handles new parks entering the system gracefully
- Historical vote data enables rating recalculation if needed
- Provides intuitive ranking that reflects community preferences

### API Endpoints

```mermaid
flowchart TD
    A[Client Request] --> B{Endpoint Type}
    
    B -->|GET /api/matchup| C[Select Random Parks]
    C --> D[Return Two Parks for Voting]
    
    B -->|POST /api/vote| E[Receive Vote Data]
    E --> F[Calculate ELO Changes]
    F --> G[Update Park Ratings]
    G --> H[Record Vote History]
    H --> I[Return Updated Ratings]
    
    B -->|GET /api/rankings| J[Query Parks by ELO Rating]
    J --> K[Return Sorted Park List]
    
    B -->|GET /api/statistics| L[Aggregate Vote Data]
    L --> M[Calculate Statistics]
    M --> N[Return Metrics]
    
    B -->|POST /api/initialize-parks| O[Check Existing Data]
    O --> P[Insert Park Data]
    P --> Q[Return Success Message]
    
    style F fill:#e1f5fe
    style G fill:#e8f5e8
    style H fill:#fff3e0
```

**Core API Endpoints:**
- `GET /api/matchup` - Returns two random parks for head-to-head comparison
- `POST /api/vote` - Submits a vote and updates ELO ratings with full history tracking
- `GET /api/rankings` - Returns parks sorted by ELO rating (supports state filtering)
- `GET /api/statistics` - Returns comprehensive voting statistics and metrics
- `POST /api/initialize-parks` - Seeds database with initial park data (idempotent)

**API Response Examples:**
```typescript
// GET /api/matchup
{
  parks: [
    { id: "kakadu-national-park", name: "Kakadu National Park", ... },
    { id: "uluru-kata-tjuta-national-park", name: "Uluru-Kata Tjuta National Park", ... }
  ]
}

// POST /api/vote (body: { winnerId, loserId })
{
  message: "Vote recorded successfully",
  ratingChanges: {
    winner: { previous: 1520, new: 1536, change: +16 },
    loser: { previous: 1480, new: 1464, change: -16 }
  }
}

// GET /api/rankings
{
  rankings: [
    { id: "...", name: "...", eloRating: 1650, wins: 23, losses: 8, ... }
  ]
}

// GET /api/statistics  
{
  totalVotes: "1247",
  todayVotes: "23", 
  totalParks: "41",
  mostContested: "Blue Mountains National Park"
}
```

### Data Management
- Significantly expanded park dataset representing major parks from Australia's 600+ national parks system
- Comprehensive coverage across all states and territories with authentic park information
- Queensland leads with 8 major parks (from 237+ total), NSW with 11 major parks (from 200+ total)
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