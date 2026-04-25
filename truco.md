Name: Truco
Description: Jogo de cartas em equipes. Marque pontos e vença a rodada.

### Rules
- 2 teams play against each other.
- Each round, only one team scores.
- The first team to reach the max score wins the match.

### Configurável
- Team names are optional; defaults are "Nós" (team A) and "Eles" (team B).
- Max score is set when starting a new game via the "Novo Jogo" modal; must be a positive integer.
- Score buttons that would cause a team's score to exceed the max are disabled.

### New game flow
- Tapping "Truco" on the home screen resumes the current in-progress match, or creates one with defaults (Nós vs Eles, max 12) if none exists.
- Inside the match, tapping "Novo Jogo" opens a modal to configure team names and max score. Confirming creates a new match and navigates to it; the previous match is preserved in storage.

### UI

**Score board** (top section, two equal columns):
- Left column (left-aligned): team A score in bold yellow, team name below.
- Right column (right-aligned): team B score in bold yellow, team name below.
- Long names wrap to the next line; both columns always occupy exactly 50% of the width.
- A winner banner appears below the score board when a team reaches max score.

**Action section** (three columns):
- Left column: score buttons (+1, +3, +6, +9, +12) for team A. Buttons that would exceed max score are disabled.
- Center column:
  - "Novo Jogo" button — opens setup modal.
  - "Desfazer" button — undoes the last active round (disabled when no active rounds exist).
  - Match log below: one line per round showing the score evolution (e.g. `0 – 3`, `1 – 3`, `4 – 3`). Undone rounds appear with strikethrough. Text is centered.
- Right column: score buttons (+1, +3, +6, +9, +12) for team B. Same disable logic as left.
