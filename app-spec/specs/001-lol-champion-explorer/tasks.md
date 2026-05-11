---

description: "Task list for LoL Champion Explorer PWA implementation"
---

# Tasks: LoL Champion Explorer PWA

**Input**: Design documents from `/specs/001-lol-champion-explorer/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are NOT included in this feature specification - skip test task generation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Nuxt 3 project**: pages/, components/, composables/, server/api/, types/ at repository root
- Paths assume Nuxt 3 structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Nuxt 3 project with required dependencies
- [ ] T002 Configure Tailwind CSS with Hextech dark theme colors
- [ ] T003 Configure @vite-pwa/nuxt module with manifest settings
- [ ] T004 Setup TypeScript types in types/index.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Create types for Champion, ChampionStats, Ability, ChatMessage in types/index.ts
- [ ] T006 [P] Setup Riot Data Dragon API integration to fetch champion data
- [ ] T007 Create composable useChampions.ts for champion data management
- [ ] T008 Configure PWA Service Worker with cache strategies
- [ ] T009 [P] Create global CSS with Hextech design tokens

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Explorar catálogo de campeones (Priority: P1) 🎯 MVP

**Goal**: Display all champions in an interactive visual grid

**Independent Test**: Can be fully tested by loading the home page and verifying all champions appear with their image, name, and title

### Implementation for User Story 1

- [ ] T010 [P] [US1] Create ChampionCard component in components/ChampionCard.vue
- [ ] T011 [P] [US1] Create ChampionGrid component in components/ChampionGrid.vue
- [ ] T012 [US1] Implement pages/index.vue with champion grid display
- [ ] T013 [US1] Add navigation to champion detail page from grid
- [ ] T014 [US1] Implement responsive grid layout with Tailwind CSS
- [ ] T015 [US1] Add loading state for champion data fetch

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Ver detalles de campeón (Priority: P1)

**Goal**: Display complete champion information (stats, abilities, lore)

**Independent Test**: Can be tested by selecting any champion and verifying all required data appears

### Implementation for User Story 2

- [ ] T016 [P] [US2] Create ChampionStats component in components/ChampionStats.vue
- [ ] T017 [P] [US2] Create ChampionAbilities component in components/ChampionAbilities.vue
- [ ] T018 [P] [US2] Create ChampionLore component in components/ChampionLore.vue
- [ ] T019 [US2] Implement pages/champion/[id].vue detail page
- [ ] T020 [US2] Add back navigation to champion grid
- [ ] T021 [US2] Display champion image, name, title, stats
- [ ] T022 [US2] Display champion abilities with icons and descriptions

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Asistente virtual para selección de campeón (Priority: P1)

**Goal**: Persistent chatbot to help users choose champions or explain game mechanics

**Independent Test**: Can be tested by sending messages to the chatbot and verifying relevant responses

### Implementation for User Story 3

- [ ] T023 [P] [US3] Create ChatBot component in components/ChatBot.vue
- [ ] T024 [P] [US3] Create composable useChatBot.ts in composables/useChatBot.ts
- [ ] T025 [US3] Implement server/api/chat.post.ts serverless endpoint
- [ ] T026 [US3] Make chatbot persistent across all pages
- [ ] T027 [US3] Implement champion recommendation logic based on user criteria
- [ ] T028 [US3] Add game mechanics explanation responses
- [ ] T029 [US3] Add chat history display with user/assistant messages
- [ ] T030 [US3] Implement chatbot open/close toggle

**Checkpoint**: All three P1 user stories should now be independently functional

---

## Phase 6: User Story 4 - Instalar aplicación como PWA (Priority: P2)

**Goal**: PWA installable on devices with offline capability

**Independent Test**: Can be tested by installing the PWA and verifying it works without internet

### Implementation for User Story 4

- [ ] T031 [P] [US4] Configure PWA Web Manifest in nuxt.config.ts
- [ ] T032 [P] [US4] Add PWA install prompt UI component
- [ ] T033 [US4] Implement offline service worker caching
- [ ] T034 [US4] Add "Add to Home Screen" functionality
- [ ] T035 [US4] Test PWA installation on different browsers

**Checkpoint**: User Story 4 should be complete

---

## Phase 7: User Story 5 - Navegación fluida (Priority: P2)

**Goal**: Smooth page transitions for premium experience

**Independent Test**: Can be tested by navigating between pages and measuring visual continuity

### Implementation for User Story 5

- [ ] T036 [P] [US5] Configure Nuxt page transitions in nuxt.config.ts
- [ ] T037 [P] [US5] Add CSS transition animations for Hextech feel
- [ ] T038 [US5] Test smooth transitions between grid and detail pages
- [ ] T039 [US5] Optimize transition timing (200-400ms per success criteria)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T040 [P] Run quickstart.md validation against implementation
- [ ] T041 Optimize page load performance (target <3s per success criteria)
- [ ] T042 Verify all components follow Hextech design system
- [ ] T043 Run final browser testing (Chrome, Firefox, Safari, Edge)
- [ ] T044 [P] Update README with final implementation details

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Works independently from US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Works independently from US1/US2
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Works independently
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - Works independently

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All components for a user story marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Create ChampionCard component in components/ChampionCard.vue"
Task: "Create ChampionGrid component in components/ChampionGrid.vue"

# Then implement the page:
Task: "Implement pages/index.vue with champion grid display"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence