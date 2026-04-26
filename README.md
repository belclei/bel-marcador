# 🃏 Bel Marcador

> Keep score. No internet. No fuss.

A mobile-first score tracker built for card games around the table. Open it on your phone, start a game, and track every round — even when the Wi-Fi is out.

---

## ✨ Features

- **Zero backend** — everything lives in your browser's `localStorage`
- **Offline-ready** — no API calls, no login, no account
- **Persistent games** — navigate away and come back; your match is exactly where you left it
- **Match history** — browse past games with scores, teams, and timestamps
- **Undo** — made a mistake? Undo the last round (it stays visible with a strikethrough)
- **Score capping** — scores can never exceed the configured maximum; any button that would overshoot caps at the limit

---

## 🎮 Games

### Truco

Two teams, up to three players each. First to reach the maximum score wins.

| Button | Points |
|--------|--------|
| +1 | 1 pt |
| +3 | 3 pts |
| +6 | 6 pts |
| +9 | 9 pts |
| +12 | 12 pts |

**Configurable per match:**
- Team names (up to 50 characters, defaults to *Nós* and *Eles*)
- Maximum score (any positive integer, default 12)

---

## 🖥️ Tech Stack

| Layer | Tool |
|-------|------|
| Framework | [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) |
| UI | [React 19](https://react.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Validation | [Zod](https://zod.dev) |
| Build | [Vite 7](https://vite.dev) |
| Linting & formatting | [Biome](https://biomejs.dev) |
| Testing | [Vitest](https://vitest.dev) |
| Language | TypeScript (strict) |

---

## 🚀 Getting Started

**Prerequisites:** Node.js ≥ 22.12

```bash
# install dependencies
npm install

# start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) on your phone or browser.

---

## 📜 Scripts

```bash
npm run dev          # development server with HMR
npm run build        # production build
npm run preview      # preview the production build
npm run test         # run unit tests
npm run type-check   # TypeScript type check
```

---

## 🗂️ Project Structure

```
src/
├── routes/
│   ├── __root.tsx           # HTML shell & global styles
│   ├── index.tsx            # Game list (home)
│   ├── previous-games.tsx   # Match history
│   └── truco/
│       ├── $matchId.tsx     # Live match screen
│       └── -setup.tsx       # New-game modal (not a route)
├── components/
│   ├── GameCard.tsx
│   ├── PreviousGamesCard.tsx
│   └── truco/
│       ├── ScoreBoard.tsx   # Scores + team names
│       ├── ScoreButtons.tsx # +1 +3 +6 +9 +12
│       ├── MatchControls.tsx
│       └── MatchLog.tsx     # Round history
├── lib/
│   ├── storage.ts           # localStorage CRUD (max 30 matches)
│   └── truco.ts             # Pure game logic
└── types/
    └── index.ts             # Zod schemas + inferred types
```

---

## 🧪 Tests

Unit tests cover all pure game logic and storage operations, including edge cases like score capping, undo chaining, localStorage corruption, and the 30-match pruning limit.

```bash
npm run test
```

---

## 📱 Usage

1. **Open the app** on your phone browser
2. **Tap a game** to resume the current match or start a fresh one
3. **Score** by tapping the point buttons for each team
4. **Undo** the last round if you tapped the wrong button
5. **Novo Jogo** — opens a modal to configure teams and max score for a brand new match
6. **Jogos anteriores** — browse your last 30 matches, tap any to reopen it

---

## 💾 Storage

Matches are stored in `localStorage` under the key `bel-marcador` as a JSON array. On every read the data is validated through Zod schemas — corrupted or outdated entries are silently discarded. The 30 most recent matches are kept; older ones are pruned automatically.

---

## 🤝 Adding a New Game

1. Create a `<gameName>.md` with the game's name, description, and rules
2. Add pure logic functions in `src/lib/<gameName>.ts`
3. Add a route at `src/routes/<gameName>/$matchId.tsx`
4. Register the game card in `src/routes/index.tsx`
5. Extend `GameStorageSchema` in `src/types/index.ts` if the match shape differs

---

*Made with ♥ for the table.*
