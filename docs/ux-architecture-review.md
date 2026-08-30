# FilmFumble UX and Architecture Review

## Status

This document tracks the implementation of the navigation, information architecture, page structure, user-flow, UX, and product-architecture review completed on 2026-08-30.

The current experience is intentionally compact and has several strengths worth preserving: one clear primary action, a distraction-free game screen, responsive answer choices, visible score and round information, and preloading after an answer. The recommendations below focus on correctness, completion, recovery, accessibility, and maintainability rather than cosmetic preference.

## Recommendations

### Critical

- [x] **Guarantee clue-to-answer integrity.** The fallback path can attach a random clue to an unrelated movie when generation fails. Only 22 of the current 177 movie titles have a same-title fallback. A round must only be served when its clue, answer, and content ID agree; otherwise the server should select another eligible movie or return a typed content-unavailable result. Add an automated catalog-integrity check.

### High priority

- [x] **Give every game an intentional endpoint.** Results currently appear only after all 177 movies are exhausted. Introduce a short default session, optional round-count choices and Endless mode, `Round N of M` progress, and an explicit End Game action.

- [x] **Make navigation and progress recoverable.** Refresh and browser navigation currently destroy the in-memory session, while the header provides no Home, restart, or exit action. Establish Home, Play, and Results navigation, persist the active session, and confirm before abandoning progress.

- [x] **Replace the interruptive feedback overlay.** The full-screen feedback dialog hides the highlighted answer grid and lacks complete modal focus behavior. Prefer inline feedback that keeps the clue and choices visible, moves focus predictably, and provides an obvious Next action.

- [x] **Remove runtime AI generation from the critical play path.** A round can wait on a live free-model request before using a fallback. Serve pre-generated, moderated, versioned clues synchronously and replenish content outside the request path.

- [x] **Curate the movie pool around recognizability and difficulty.** The generated catalog mixes famous and obscure titles without an explicit difficulty model. Retain stable source metadata, create curated difficulty tiers, and provide simple optional category, era, and difficulty settings while keeping a one-click default.

- [ ] **Add Skip and Report Bad Clue controls.** Players currently must answer every clue and cannot flag ambiguous, incorrect, offensive, or overly revealing content. Provide a score-neutral skip and a post-answer report action tied to stable movie and clue IDs.

- [x] **Introduce an explicit domain and session model.** Titles currently act as IDs, and phase, score, rounds, errors, and preload state are independently mutable. Define stable `Movie`, `Clue`, `GameSettings`, `Round`, and `GameSession` models and centralize valid state transitions.

### Medium priority

- [ ] **Align the party-game promise with the actual mode.** The product metadata describes a party game, but the implementation tracks one player and one score. Position the current experience as quick solo trivia unless a deliberate local-party or team mode is added.

- [ ] **Make errors specific and progress-safe.** Server, content, and connectivity failures currently collapse into “Connection Lost,” and ordinary completion uses an outage status. Model typed failures, retry the same round idempotently, and preserve progress through recovery.

- [ ] **Strengthen accessibility and mobile behavior.** Active states lose the page-level heading, several low-opacity text tokens fail WCAG contrast, modal focus is incomplete, and reduced-motion handling is partial. Establish logical headings, AA color tokens, predictable focus, complete reduced-motion behavior, keyboard controls, dynamic viewport sizing, and safe-area support.

- [ ] **Give results stronger closure and replay options.** Results currently provide only score, accuracy, and Play Again. Add incorrect-answer review, replay with the same settings, change settings, and accessible text sharing.

## Top five priorities

1. Guarantee clue-to-answer integrity.
2. Create finite game sessions with visible progress.
3. Make navigation and session state recoverable.
4. Replace the full-screen feedback interruption.
5. Serve deterministic, curated clues outside the live AI request path.

## Quick wins

- Never serve a fallback clue for a different movie.
- Default to a ten-round game and display `Round N of 10`.
- Add task-level Home and End Game controls with leave protection.
- Persist the active session in session storage.
- Keep answer choices visible during feedback.
- Distinguish connectivity, service, content, and completion states.
- Improve low-contrast tokens and reduced-motion coverage.
- Explain the default duration and mechanics before Start.

## Larger architectural improvements

- Build one stable-ID content repository for movies, clues, posters, and content versions.
- Generate and moderate clues asynchronously, backed by automated integrity validation.
- Move orchestration into a dedicated `GameSession` state machine or store.
- Use explicit Home, Play, and Results destinations with resumable state.
- Add report and skip telemetry for content-quality decisions.
- Keep answers and scoring server-authoritative if competitive party play is introduced.

## Risks if the current structure is retained

- Incorrect clue and answer pairings will damage trust and invalidate scoring.
- Most players will leave before reaching the results screen.
- Refresh, Back, and accidental Home navigation will continue destroying progress.
- AI latency and provider failures will directly degrade the main interaction.
- Keyboard and screen-reader users may become disoriented during feedback.
- Uneven title familiarity will make outcomes feel arbitrary.
- Additional modes will increase invalid-state and async-race risk.

## Recommended navigation and information architecture

- **Home `/`:** Value proposition, concise rules, expected duration, immediate Play action, and progressively disclosed mode, difficulty, category, and round-count settings.
- **Play `/play`:** Persistent score and progress, clue, choices, inline feedback, Next, Skip or Report, and End Game. Home navigation should preserve or explicitly abandon the session.
- **Results `/results`:** Score, accuracy, answer review, Play Same Settings, Change Settings, and Share.
- **Supporting footer:** How It Works, About, content attribution, and privacy information.
- **Optional party setup:** Mode and team setup should branch from Home rather than become permanent global navigation.

FilmFumble should remain a shallow, task-focused product. It does not need a conventional multi-page menu, search, or a complex global navigation system.
