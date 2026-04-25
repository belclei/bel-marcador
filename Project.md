This project is Bel Marcador, a responsive website, used mainly in mobile devices, that is used to log scores in games. Each interaction must be stored in local storage, and no more than 30 matches needs to be stored. No database, no api calls.


# Rules
- Each game has its rules described in its corresponding file: [[truco]]
- First page is a list of available games as cards: first line is the name of the game, second line, in smaller text is the description of the game (those data is provided in each game corresponding file).
- First card is "Jogos anteriores" and shows the list of past matches (game type, teams, final score, date).
- Tapping a game card resumes the current in-progress match for that game, or creates a new one with default settings if none exists.
- A match is only reset when the user clicks "Novo Jogo" inside the match screen and confirms the modal. Navigating away and back does not reset the game.


### Technologies

Typescript, ReactJS, Tanstack Start framework, tailwindcss, zod

### Storage

- All match data is persisted in localStorage under the key `bel-marcador`.
- Maximum 30 matches stored; oldest is pruned when the limit is exceeded.
- Data is validated with Zod on every read.

### Project structure

```
src/
  routes/
    __root.tsx              # HTML shell, global styles
    index.tsx               # Game list page
    previous-games.tsx      # Jogos anteriores
    truco/
      $matchId.tsx          # Live Truco match screen
      -setup.tsx            # TrucoSetupModal component (not a route)
  components/
    GameCard.tsx
    PreviousGamesCard.tsx
    truco/
      ScoreBoard.tsx        # Scores + team names (equal 50/50 columns)
      ScoreButtons.tsx      # +1 +3 +6 +9 +12 per team (disabled when would exceed max)
      MatchControls.tsx     # Novo Jogo, Desfazer, match log
      MatchLog.tsx          # Round-by-round history with strikethrough for undone rounds
  lib/
    storage.ts              # localStorage CRUD
    truco.ts                # Pure game logic + metadata
  types/
    index.ts                # Zod schemas and inferred types
```
