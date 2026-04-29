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
- **Score capping** — scores can never exceed the configured maximum

---

## 🎮 Games

### Truco

Two teams, up to three players each. First to reach the maximum score wins. Each round only one team scores.

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

### Livre (ex: Canastra)

Manually add scores each round for both teams. Suitable for any game where both sides score simultaneously (e.g. Canastra, Buraco).

**Configurable per match:**
- Team names (up to 50 characters, defaults to *Nós* and *Eles*)
- Maximum score (any positive integer, default 2000)

**Match log** shows three values per round:
- Left (green): points added for team A that round (e.g. `+260`)
- Center (gray): running totals (e.g. `460 – 300`)
- Right (green): points added for team B that round (e.g. `+250`)

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
│   ├── __root.tsx              # HTML shell & global styles
│   ├── index.tsx               # Game list (home)
│   ├── previous-games.tsx      # Match history
│   ├── truco/
│   │   └── $matchId.tsx        # Live Truco match screen
│   └── livre/
│       └── $matchId.tsx        # Live Livre match screen
├── components/
│   ├── GameCard.tsx
│   ├── PreviousGamesCard.tsx
│   ├── SetupModal.tsx          # Shared "Novo Jogo" modal (team names + max score)
│   ├── truco/
│   │   ├── ScoreBoard.tsx      # Scores + team names
│   │   ├── ScoreButtons.tsx    # +1 +3 +6 +9 +12
│   │   ├── MatchControls.tsx   # Novo Jogo, Desfazer, match log
│   │   └── MatchLog.tsx        # Round history (centered, strikethrough for undone)
│   └── livre/
│       ├── ScoreBoard.tsx      # Scores + team names (two equal columns)
│       ├── ScoreInputs.tsx     # Numeric inputs + Confirmar button
│       └── MatchLog.tsx        # Round history (+delta left/right, totals center)
├── lib/
│   ├── storage.ts              # localStorage CRUD (max 30 matches)
│   ├── match.ts                # Shared logic: undoLastRound, checkWinner
│   ├── truco.ts                # Truco game logic + metadata
│   └── livre.ts                # Livre game logic + metadata
└── types/
    └── index.ts                # Zod schemas + inferred types
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
3. **Truco** — tap the point buttons (+1, +3, +6, +9, +12) for each team
4. **Livre** — type each team's round points and tap Confirmar
5. **Undo** the last round if you made a mistake
6. **Novo Jogo** — opens a modal to configure teams and max score for a new match
7. **Jogos anteriores** — browse your last 30 matches, tap any to reopen it

---

## 💾 Storage

Matches are stored in `localStorage` under the key `bel-marcador` as a JSON array. On every read the data is validated through Zod schemas — corrupted or outdated entries are silently discarded. The 30 most recent matches are kept; older ones are pruned automatically.

---

## 🤝 Adding a New Game

1. Create a `<gameName>.md` with the game's name, description, and rules
2. Add pure logic functions in `src/lib/<gameName>.ts` (export `createMatch`, `GAME_META`)
3. Add shared logic to `src/lib/match.ts` if applicable
4. Add components in `src/components/<gameName>/`
5. Add a route at `src/routes/<gameName>/$matchId.tsx`
6. Register the game card in `src/routes/index.tsx`
7. Extend `MatchSchema` in `src/types/index.ts` with the new game type

---

*Made with ♥ for the table.*
