Name: Truco
Description: 

### rules
- 2 teams play
- Each round, only one team scores

### configurável
- Os times podem ser formados por 1, 2 ou três pessoas
	- Os times se enfrentam sempre com o mesmo número de pessoas;
	- If no name is provided, then show team "Nós" against "Eles"
- Score Max
	- This is the maximum a team can score, and who achieve it, win the game
### UI
First section is two columns:
- Left: aligned left: Score of the "Nós" team in bold, second line with team members name (or "Nós");
- Right: aligned right: Score of the "Eles" team in bold, second line with team members name (or "Eles");
Second section is three columns:
- First and third has buttons to score for "Nós" and "Eles" respectively;
	- Buttons have labels "+1", "+3", "+6", "+9", "+12",  and their actions is to score the amount informed in the labels of points for the respective team;
	- Each button is a square; Each one in one line
- Second column 
	- first line is the button "Novo Jogo", that starts a new game (each team with no point)
	- Second line is "Desfazer", that undo the last round score. (the score undone is showed in the third line (described above) as strikethrough text)
	- shows the log of the match (historical of scores); Each line is a round. What is logged is the evolution of amounts of points of each team. Like:
  0 - 3
  1 - 3
  4 - 3