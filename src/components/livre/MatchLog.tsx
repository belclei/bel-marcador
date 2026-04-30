import type { Round } from "~/types";

interface MatchLogProps {
  rounds: Round[];
}

// Finds the cumulative score from the last non-undone round before `index`, or 0.
// Needed because undone rounds break the "previous index = previous base" assumption.
function baseBefore(rounds: Round[], index: number): { a: number; b: number } {
  for (let j = index - 1; j >= 0; j--) {
    if (!rounds[j].undone) return { a: rounds[j].teamAScore, b: rounds[j].teamBScore };
  }
  return { a: 0, b: 0 };
}

export function MatchLog({ rounds }: MatchLogProps) {
  if (rounds.length === 0) {
    return <span className="text-sm text-gray-600 block text-center">–</span>;
  }

  return (
    <ul className="space-y-1 overflow-y-auto">
      {rounds.map((round, i) => {
        const base = baseBefore(rounds, i);
        const deltaA = round.teamAScore - base.a;
        const deltaB = round.teamBScore - base.b;
        return (
          <li
            key={i}
            className={`flex items-center px-3 py-1.5 rounded-lg font-mono tabular-nums text-sm ${
              round.undone ? "bg-gray-800/40 line-through" : "bg-gray-800"
            }`}
          >
            <span
              className={`w-14 text-left text-base ${round.undone ? "text-gray-600" : "text-emerald-400"}`}
            >
              +{deltaA}
            </span>
            <span
              className={`flex-1 text-center ${round.undone ? "text-gray-600" : "text-gray-300"}`}
            >
              {round.teamAScore} – {round.teamBScore}
            </span>
            <span
              className={`w-14 text-right text-base ${round.undone ? "text-gray-600" : "text-emerald-400"}`}
            >
              +{deltaB}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
