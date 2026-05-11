# Quickstart: LoL Champion Explorer PWA

**Date**: 2026-04-14

## Prerequisites

- Node.js 18+ 
- npm or pnpm

## Setup

```bash
# Clone repository
git clone <repository-url>
cd lol-champion-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
.
├── nuxt.config.ts      # Nuxt + PWA configuration
├── app.vue           # Root component
├── pages/
│   ├── index.vue    # Champion grid (home)
│   └── champion/
│       └── [id].vue  # Champion details
├── components/        # Vue components
├── composables/      # Shared logic
├── server/api/      # Serverless endpoints
├── public/data/     # Local data
├── assets/css/      # Styles
└── types/          # TypeScript types
```

## Key Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Build for production
npm run build       # Build for deployment

# Generate PWA
npm run generate    # Static generation

# Run tests
npm run test       # Run unit tests
```

## Features

### Champion Grid (Home Page)
- Displays all champions in responsive grid
- Click champion to view details
- Search/filter by name or role

### Champion Details
- Full stats, abilities, lore
- Back button returns to grid

### Chatbot Assistant
- Persistent floating button
- Click to open chat
- Ask about champions or game mechanics

### PWA Installation
- "Install" button in UI
- Works offline with cached data
- Add to home screen

## Design (Hextech Theme)

- Background: `#0a0a0c` (dark)
- Primary: `#c8aa6e` (gold)
- Secondary: `#0ac8e9` (blue accent)
- Text: `#f0f0f0` (light)
- Cards: `#1a1a1e` (dark card)

## Tech Stack

- **Framework**: Nuxt 3 (Vue 3)
- **Styling**: Tailwind CSS
- **PWA**: @vite-pwa/nuxt
- **Testing**: Vitest
- **Data**: Riot Games Data Dragon API