# Implementation Plan: LoL Champion Explorer PWA

**Branch**: `[001-lol-champion-explorer]` | **Date**: 2026-04-14 | **Spec**: specs/001-lol-champion-explorer/spec.md
**Input**: Feature specification from `/specs/001-lol-champion-explorer/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

A Progressive Web App (PWA) for League of Legends players to explore the complete champion catalog through an interactive visual grid. Each champion has a detail page with stats, abilities, and lore. The key feature is a persistent virtual assistant (chatbot) integrated into the interface to help users choose champions or explain game mechanics. Navigation is fluid with smooth page transitions, and the design reflects the dark and gold Hextech aesthetic of the League of Legends client.

## Technical Context

**Language/Version**: Vue 3.4+ (via Nuxt 3)  
**Primary Dependencies**: @vite-pwa/nuxt, Tailwind CSS, Nitro (Nuxt server routes)  
**Storage**: Riot Games Data Dragon API + localStorage cache (no external database)  
**Testing**: Vitest + Vue Test Utils  
**Target Platform**: Web (Desktop + Mobile browsers)  
**Project Type**: web-service/PWA  
**Performance Goals**: Page load <3s, Champion grid <10s, Chatbot response <3s  
**Constraints**: Offline-capable PWA, Serverless architecture, No heavy backend, No auth required  
**Scale/Scope**: ~170 champions, Single Page Application with 2 routes + persistent chatbot overlay  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|-------|--------|-------|
| I. Code Quality | PASS | Using Vue 3 + Nuxt 3 conventions |
| II. Testing Standards | PASS | Vitest for unit tests |
| III. UX Consistency | PASS | Hextech design system |
| IV. Performance | PASS | <3s load time target |
| V. Code Review | PASS | Standard PR process |

## Project Structure

### Documentation (this feature)

```text
specs/001-lol-champion-explorer/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md           # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # API contracts
└── tasks.md           # Phase 2 output
```

### Source Code (repository root)

```text
# Nuxt 3 project structure
.
├── nuxt.config.ts      # Nuxt configuration with PWA
├── app.vue           # Root app component
├── pages/
│   ├── index.vue    # Champion grid (home)
│   └── champion/
│       └── [id].vue  # Champion detail page
├── components/
│   ├── ChampionCard.vue
│   ├── ChampionGrid.vue
│   ├── ChampionStats.vue
│   ├── ChampionAbilities.vue
│   ├── ChampionLore.vue
│   └── ChatBot.vue
├── composables/
│   ├── useChampions.ts
│   └── useChatBot.ts
├── server/
│   └── api/
│       └── chat.post.ts  # Serverless chat endpoint
├── public/
│   └── data/
│       └── champions.json
├── assets/
│   └── css/
│       └── main.css
├── types/
│   └── index.ts
└── tests/
    └── unit/
```

**Structure Decision**: Nuxt 3 full-stack application with serverless API routes

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

## Research (Phase 0)

Research findings incorporated from user's technical requirements:
- Nuxt.js (Vue 3) confirmed as framework
- @vite-pwa/nuxt for PWA functionality with auto-update service worker
- Tailwind CSS for styling with custom Hextech design tokens
- Nitro server routes for backend (serverless architecture)
- Riot Games Data Dragon API (`ddragon.leagueoflegends.com`) for champion data
- No external database required; localStorage used for champion caching
- **Chatbot**: Nitro serverless endpoint (`server/api/chat.post.ts`) acts as proxy to external AI API
  - External API configurable via `CHATBOT_API_URL` and `CHATBOT_API_KEY` environment variables
  - Supports OpenAI-compatible chat completion API format
  - Falls back to local rule-based responses when no external API is configured
- PWA runtime caching configured for Data Dragon image assets (CacheFirst, 30-day expiry)
- Page transitions use Vue's built-in `<Transition>` with CSS animations (300ms)

## Chatbot API Contract

### External API Integration

The serverless endpoint `POST /api/chat` proxies messages to an external AI API:

**Request** (to Nuxt serverless endpoint):
```json
{
  "message": "string",
  "champions": "ChampionInfo[]"
}
```

**External API Call** (OpenAI-compatible format):
```
POST {CHATBOT_API_URL}/v1/chat/completions
Authorization: Bearer {CHATBOT_API_KEY}
Content-Type: application/json

{
  "model": "gpt-4o-mini",
  "messages": [
    {"role": "system", "content": "Eres un asistente experto en League of Legends..."},
    {"role": "user", "content": "¿Qué campeón me recomiendas?"}
  ]
}
```

**Response** (from Nuxt serverless endpoint):
```json
{
  "reply": "string"
}
```

**Environment Variables**:
- `CHATBOT_API_URL` - Base URL for external API (default: `https://api.openai.com`)
- `CHATBOT_API_KEY` - API key for authentication
- `CHATBOT_MODEL` - Model name (default: `gpt-4o-mini`)

If no API key is configured, the endpoint returns rule-based responses built into the serverless function, ensuring the chatbot always works regardless of configuration.