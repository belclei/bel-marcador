Name: Livre (ex: Canastra)
Description: Adicione manualmente o placar de seus jogos.

### Rules
- 2 teams play against each other.
- Each round, both teams can score.
- The first team to reach the max score wins the match.

### Configurável
- Team names are optional; defaults are "Nós" (team A) and "Eles" (team B).
- Max score is set when starting a new game via the "Novo Jogo" modal; must be a positive integer.

### New game flow
- Tapping "Livre (ex: Canastra)" on the home screen resumes the current in-progress match, or creates one with defaults (Nós vs Eles, max 2000) if none exists.
- Inside the match, tapping "Novo Jogo" opens a modal to configure team names and max score. Confirming creates a new match and navigates to it; the previous match is preserved in storage.

### UI

**Score board** (top section, two equal columns):
- Left column (left-aligned): team A score in bold yellow, team name below.
- Right column (right-aligned): team B score in bold yellow, team name below.
- Long names wrap to the next line; both columns always occupy exactly 50% of the width.
- A winner banner appears below the score board when a team reaches max score.

**Action section**:
- Vertical list:
	- Two numeric input fields where user inputs new round score to be added to previous one (ex: previous round is 200 - 300; user inputs 300 - 100; new score is 500 - 400); right below there is a button to confirm the inclusion of the new score; put a background in this whole box.
	- "Novo Jogo" button — opens setup modal.
	- "Desfazer" button — undoes the last active round (disabled when no active rounds exist).

**Match log section** (three zones per row):
- Each line represents a round and has a background set.
- Between lines, there is a small gap.
- Left edge (green, left-aligned): points added for team A this round (e.g. `+260`).
- Center (gray): running cumulative totals for both teams (e.g. `460 – 300`).
- Right edge (green, right-aligned): points added for team B this round (e.g. `+250`).
- Undone rounds appear with strikethrough and all text in gray.
