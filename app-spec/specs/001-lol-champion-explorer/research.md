# Research: LoL Champion Explorer PWA

**Date**: 2026-04-14  
**Input**: User technical requirements + Feature specification

## Technical Decisions

### Framework: Nuxt 3 (Vue 3)

- **Decision**: Use Nuxt 3 as the web application framework
- **Rationale**: User explicitly requested Nuxt.js (Vue 3), provides SSR, file-based routing, and server routes built-in
- **Alternatives considered**: Next.js (React), plain Vue 3, Remix

### PWA Module: @vite-pwa/nuxt

- **Decision**: Use @vite-pwa/nuxt for PWA functionality
- **Rationale**: User explicitly requested this module, provides Web Manifest and Service Worker
- **Alternatives considered**: vite-plugin-pwa (more manual setup)

### Styling: Tailwind CSS

- **Decision**: Use Tailwind CSS for all styling
- **Rationale**: User explicitly requested Tailwind CSS, enables rapid responsive design
- **Alternatives considered**: UnoCSS, plain CSS, SCSS

### Backend: Nitro Server Routes

- **Decision**: Use Nuxt's built-in Nitro server routes for backend functionality
- **Rationale**: User requested serverless architecture, Nitro provides API routes without separate backend
- **Alternatives considered**: External API (Firebase, Vercel API), separate Express backend

### Data Source: Riot Games Data Dragon API

- **Decision**: Use Riot Games Data Dragon API for champion data
- **Rationale**: Official free API, provides complete champion data including images, stats, abilities, lore
- **Alternatives considered**: Static JSON files, community APIs (lol.fandom.com)

### Chatbot API Integration

- **Decision**: Create serverless endpoint that communicates with external chatbot API
- **Rationale**: User requested "chatbot se conectará a una API externa", provides flexible AI integration
- **Alternatives considered**: Local rule-based responses, embedded LLM

### No External Database

- **Decision**: No external database - use API + local JSON caching
- **Rationale**: User explicitly stated "No se debe usar una base de datos externa pesada"
- **Alternatives considered**: PostgreSQL, MongoDB, Firebase Firestore (all rejected per user requirements)

## Key Findings

1. Riot Data Dragon API provides champion data at: `https://ddragon.leagueoflegends.com/cdn/latest/data/en_US/`
2. Champion splash images available at: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/`
3. @vite-pwa/nuxt requires proper manifest configuration for installability
4. Nitro routes work in serverless environments (Vercel, Netlify, Cloudflare Workers)
5. Tailwind needs configuration for dark/Hextech theme colors