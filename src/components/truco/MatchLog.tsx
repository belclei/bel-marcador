import type { Round } from "~/types";

interface MatchLogProps {
  rounds: Round[];
}

export function MatchLog({ rounds }: MatchLogProps) {
  if (rounds.length === 0) {
    return <span className="text-sm text-gray-600 block text-center">–</span>;
  }

  return (
    <ul className="text-sm text-gray-400 space-y-1 overflow-y-auto max-h-40 text-center">
      {rounds.map((round, i) => (
        <li key={i} className={round.undone ? "line-through text-gray-600" : ""}>
          {round.teamAScore} – {round.teamBScore}
        </li>
      ))}
    </ul>
  );
}
