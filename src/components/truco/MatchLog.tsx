import type { Round } from "~/types";

interface MatchLogProps {
  rounds: Round[];
}

export function MatchLog({ rounds }: MatchLogProps) {
  if (rounds.length === 0) {
    return <span className="text-xs text-gray-600">–</span>;
  }

  return (
    <ul className="text-xs text-gray-400 space-y-0.5 overflow-y-auto max-h-40">
      {rounds.map((round, i) => (
        <li
          key={i}
          className={round.undone ? "line-through text-gray-600" : ""}
        >
          {round.teamAScore} – {round.teamBScore}
        </li>
      ))}
    </ul>
  );
}
