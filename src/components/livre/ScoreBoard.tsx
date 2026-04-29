import type { LivreMatch } from "~/types";

interface ScoreBoardProps {
  match: LivreMatch;
}

export function ScoreBoard({ match }: ScoreBoardProps) {
  return (
    <div className="flex px-4 py-5 bg-gray-900 border-b border-gray-800">
      <TeamScore team={match.teamA} align="left" />
      <TeamScore team={match.teamB} align="right" />
    </div>
  );
}

function TeamScore({
  team,
  align,
}: {
  team: LivreMatch["teamA"];
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex flex-col w-1/2 break-words ${align === "right" ? "items-end text-right" : "items-start text-left"}`}
    >
      <span className="text-5xl font-bold font-mono text-yellow-400">{team.score}</span>
      <span className="text-sm text-gray-400 mt-1 leading-tight">{team.name}</span>
    </div>
  );
}
