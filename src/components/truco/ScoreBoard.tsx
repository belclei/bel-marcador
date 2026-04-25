import type { TrucoMatch } from "~/types";

interface ScoreBoardProps {
  match: TrucoMatch;
}

export function ScoreBoard({ match }: ScoreBoardProps) {
  return (
    <div className="flex justify-between items-start px-6 py-5 bg-gray-900 border-b border-gray-800">
      <TeamScore team={match.teamA} align="left" />
      <div className="text-gray-600 text-2xl font-light self-center">–</div>
      <TeamScore team={match.teamB} align="right" />
    </div>
  );
}

function TeamScore({
  team,
  align,
}: {
  team: TrucoMatch["teamA"];
  align: "left" | "right";
}) {
  return (
    <div className={`flex flex-col ${align === "right" ? "items-end" : "items-start"}`}>
      <span className="text-5xl font-bold text-yellow-400">{team.score}</span>
      <span className="text-sm text-gray-400 mt-1">{team.name}</span>
      {team.members.length > 0 && (
        <span className="text-xs text-gray-500">{team.members.join(", ")}</span>
      )}
    </div>
  );
}
