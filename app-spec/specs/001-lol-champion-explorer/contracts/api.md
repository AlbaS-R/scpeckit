# API Contracts: LoL Champion Explorer PWA

**Date**: 2026-04-14

## Public Endpoints

### Chatbot API

Process chat messages and return AI responses.

**Endpoint**: `POST /api/chat`

**Request**:

```json
{
  "message": "What champion should I play if I like assassins?",
  "history": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant", 
      "content": "Hi! I can help you find the perfect champion. What playstyle do you prefer?"
    }
  ],
  "context": {
    "preferredRoles": ["Assassin"],
    "skillLevel": "intermediate"
  }
}
```

**Response (Success)**:

```json
{
  "success": true,
  "response": {
    "content": "For an assassin playstyle, I recommend Akali, Zed, or Kayn...",
    "type": "recommendation",
    "champions": [
      {
        "id": "Akali",
        "reason": "High mobility and burst damage"
      },
      {
        "id": "Zed", 
        "reason": "Shadow-based combat"
      },
      {
        "id": "Kayn",
        "reason": "Two transformation paths"
      }
    ]
  },
  "sources": [
    {
      "type": "champion",
      "id": "Akali"
    }
  ]
}
```

**Response (Error)**:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT",
    "message": "Too many requests. Please wait a moment."
  }
}
```

### Champion List API

Get all champions (cached from Riot API).

**Endpoint**: `GET /api/champions`

**Response**:

```json
{
  "success": true,
  "data": {
    "version": "14.8.1",
    "Champions": {
      "Ahrandom": {
        "id": "Ahrandom",
        "key": "157",
        "name": "Akshan",
        "title": "the Rebel",
        "image": {
          "full": "Akshan.png",
          "sprite": "champion0.png"
        },
        "tags": ["Assassin", "Marksman"]
      }
    }
  },
  "cached": true,
  "expiresAt": "2026-04-14T10:14:00Z"
}
```

### Champion Detail API

Get specific champion details.

**Endpoint**: `GET /api/champions/[id]`

**Response**:

```json
{
  "success": true,
  "data": {
    "id": "Akshan",
    "name": "Akshan",
    "title": "the Rebel",
    "stats": {
      "hp": 610,
      "hpperlevel": 119,
      "movespeed": 345
    },
    "tags": ["Assassin", "Marksman"],
    "lore": "Buried history...",
    "abilities": [...]
  }
}
```

## Interface Contracts

### ChampionCard Component

Input: Champion data object  
Output: Rendered card with image, name, title

### ChampionGrid Component

Input: Champion[] array, filter options  
Output: Responsive grid of ChampionCard components

### ChatBot Component

Input: Open/close state, chat history  
Output: Floating chat window with messages + input

### Page Transitions

Input: From/To route  
Output: Animated transition between pages

## PWA Contracts

### Web Manifest

```json
{
  "name": "LoL Champion Explorer",
  "short_name": "LoL Champions",
  "description": "Explore League of Legends champions",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0c",
  "theme_color": "#c8aa6e",
  "icons": [...]
}
```

### Service Worker Strategy

- Cache-first for static assets
- Network-first for API data
- Stale-while-revalidate for champion images