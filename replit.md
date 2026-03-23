# SRPH MIS Portal

## Overview
An internal employee portal for SRPH MIS (Samsung Research Philippines Management Information Systems). The portal provides quick access to enterprise applications, tools, and resources with an AI-powered assistant.

## Tech Stack
- **Frontend**: React 19 with Vite, TailwindCSS, Radix UI components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter (lightweight React router)
- **State Management**: React Context API

## Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── dashboard/  # Dashboard-specific components
│   │   │   ├── layout/     # Layout components (TopNav, Sidebar, etc.)
│   │   │   └── ui/         # shadcn/ui components
│   │   ├── context/        # React Context providers
│   │   │   └── SiteContext.tsx  # Global site configuration state
│   │   ├── pages/          # Page components
│   │   │   ├── admin.tsx   # Admin management panel
│   │   │   └── dashboard.tsx # Main dashboard
│   │   └── lib/            # Utility functions
│   └── public/             # Static assets
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes (config, chat)
│   ├── db.ts              # Database connection
│   └── vite.ts            # Vite dev server integration
├── shared/                # Shared types and schemas
│   └── schema.ts          # Drizzle database schema
└── attached_assets/       # Generated images and assets
```

## Key Features

### Dashboard
- Hero section with customizable content
- 3-column featured quick links section (editable from admin)
- Quick stats section
- AI Chatbot assistant

### AI Chatbot
- Integrates with Samsung AI Agent API
- Endpoint: `https://agent.sec.samsung.net/api/v1/run/d98b0949-3362-46b8-947a-16084bb3a710`
- API key configurable in admin panel under "AI Chatbot" settings
- Accessible via "Ask AI" button or floating chat icon

### Admin Panel
- URL: `/admin`
- Login: `admin` / `admin123`
- Manage: Header, Hero, Featured Quick Links, Statistics, All Quick Links, Footer, AI Chatbot settings
- All changes are saved to PostgreSQL database

## Development

### Running Locally
```bash
npm install
npm run db:push   # Create database tables
npm run dev       # Start development server
```

The server runs on port 5000 and serves both the API and the Vite-powered frontend.

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `PORT`: Server port (default: 5000)

### Local PostgreSQL Setup
1. Install PostgreSQL on your machine.
2. Create a `.env` file in the root directory and add your connection string:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/srph_mis
   SESSION_SECRET=your_random_secret_here
   ```
3. Run `npm run db:push` to sync the schema to your local database.
4. Run `npm run dev` to start the application.

## API Endpoints

### GET /api/config
Returns the current site configuration.

### POST /api/config
Saves the site configuration to the database.

### POST /api/chat
Sends a message to the Samsung AI Agent and returns the response.
- Body: `{ message: string, apiKey: string }`

## Recent Changes
- Added PostgreSQL database storage for site configuration
- Added AI Chatbot with Samsung Agent API integration
- Added 3-column featured quick links section below welcome message
- Fixed external links to properly redirect to external URLs
- Added Featured Quick Links management to admin panel
- Added AI Chatbot configuration in admin settings
- Updated Quick Access Tools design with cleaner white card layout

## User Preferences
- Changes in admin panel are saved to PostgreSQL database
- External links open in new tab with proper URL formatting
- API key for chatbot stored securely in database
