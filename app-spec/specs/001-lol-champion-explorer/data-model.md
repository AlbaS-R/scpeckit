# Data Model: LoL Champion Explorer PWA

**Date**: 2026-04-14


## Entities

### Champion

Represents a League of Legends champion with all their data.

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| id | string | Unique identifier (e.g., "Ahirandom") | Yes |
| key | string | Numeric key as string (e.g., "157") | Yes |
| name | string | Display name (e.g., "Akshan") | Yes |
| title | string | Champion title (e.g., "the Rebel") | Yes |
| image | object | Image URLs from Data Dragon | Yes |
| splash | string | Splash art URL | Yes |
| center | string | Loading screen URL | Yes |
| portrait | string | Portrait URL | Yes |
| stats | object | Base statistics | Yes |
| tags | string[] | Champion roles (e.g., ["Assassin", "Marksman"]) | Yes |
| partype | string | Resource type (e.g., "Mana") | Yes |
| lore | string | Champion backstory | Yes |
| blurb | string | Short lore summary | Yes |
| abilities | Ability[] | List of 4 abilities + ultimate | Yes |
| skins | Skin[] | Available skins | Yes |

### Champion Statistics

Base statistics for a champion.

| Field | Type | Description |
|-------|------|-------------|
| hp | number | Health points |
| hpperlevel | number | HP gain per level |
| mp | number | Mana points |
| mpperlevel | number | Mana gain per level |
| movespeed | number | Movement speed |
| armor | number | Base armor |
| armorperlevel | number | Armor per level |
| spellblock | number | Magic resist |
| spellblockperlevel | number | Magic resist per level |
| attackrange | number | Attack range |
| hpregen | number | HP regeneration |
| hpregenperlevel | number | HP regen per level |
| mpregen | number | Mana regeneration |
| mpregenperlevel | number | Mana regen per level |
| crit | number | Critical strike chance |
| critperlevel | number | Critical strike per level |
| attackdamage | number | Base AD |
| attackdamageperlevel | number | AD per level |
| attackspeedperlevel | number | Attack speed per level |
| attackspeed | number | Base attack speed |

### Ability

A champion's ability/spell.

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| id | string | Ability ID (e.g., "Q") | Yes |
| name | string | Ability name | Yes |
| description | string | Ability tooltip | Yes |
| image | string | Ability icon filename | Yes |
| maxrank | number | Maximum ability rank | Yes |
| cooldown | number[] | Cooldown at each rank | Yes |
| cooldownBurn | string | Cooldown string (e.g., "10/8/6/4/2") | Yes |
| cost | number[] | Mana cost at each rank | Yes |
| costBurn | string | Cost string (e.g., "60/65/70/75/80") | Yes |
| costType | string | Resource cost type | Yes |
| range | number[] | Ability range at each rank | Yes |
| rangeBurn | string | Range string | Yes |
| effect | number[][] | Effect values | No |
| vars | object[] | Variables | No |

### Skin

A champion's alternative skin.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Skin ID |
| name | string | Skin name |
| num | number | Skin number |
| chromas | boolean | Has chromas |

### ChatMessage

A message in the chatbot conversation.

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| id | string | Unique message ID | Yes |
| role | "user" \| "assistant" | Message sender | Yes |
| content | string | Message text | Yes |
| timestamp | number | Unix timestamp | Yes |
| championId | string | Related champion (optional) | No |

### ChatSession

A chat session with history.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Session ID |
| messages | ChatMessage[] | Message history |
| context | object | Current context |
| createdAt | number | Session start |
| updatedAt | number | Last activity |

## Relationships

```
Champion 1 ---> * Ability
Champion 1 ---> * Skin
ChatSession 1 ---> * ChatMessage
User 1 ---> * ChatSession (future)
```

## State Transitions

### Champion Data Flow
```
API Fetch -> Cache -> Display
(Champion list loads, detail loads on demand)
```

### Chat Session
```
New Session -> Active -> Archived
(User opens chatbot, conversation happens, session closes)
```

## Validation Rules

- Champion ID: non-empty string, alphanumeric
- Champion name: 2-50 characters
- Stats: all numbers >= 0
- Chat message: non-empty, max 1000 chars
- Skin: num >= 0