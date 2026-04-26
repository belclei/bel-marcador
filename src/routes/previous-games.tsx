import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadMatches } from "~/lib/storage";
import type { TrucoMatch } from "~/types";

export const Route = createFileRoute("/previous-games")({
  component: PreviousGamesPage,
});

function PreviousGamesPage() {
  const [matches, setMatches] = useState<TrucoMatch[]>([]);

  useEffect(() => {
    setMatches([...loadMatches()].reverse());
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 py-4 mb-4">
        <Link to="/" className="text-gray-400 hover:text-white">
          ←
        </Link>
        <h1 className="text-xl font-bold">Jogos anteriores</h1>
      </div>

      {matches.length === 0 && (
        <p className="text-gray-400 text-center mt-8">Nenhum jogo registrado.</p>
      )}

      <ul className="space-y-3">
        {matches.map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </ul>
    </div>
  );
}

function MatchRow({ match }: { match: TrucoMatch }) {
  const navigate = useNavigate();
  const date = new Date(match.createdAt).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <li>
      <button
        type="button"
        onClick={() => navigate({ to: "/truco/$matchId", params: { matchId: match.id } })}
        className="w-full text-left bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all rounded-xl p-4 cursor-pointer"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-wide">{match.gameType}</span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <div className="space-y-1">
          <TeamLine name={match.teamA.name} score={match.teamA.score} />
          <TeamLine name={match.teamB.name} score={match.teamB.score} />
        </div>
      </button>
    </li>
  );
}

function TeamLine({ name, score }: { name: string; score: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex-1 truncate text-sm font-semibold">{name}</span>
      <span className="font-mono text-yellow-400 tabular-nums">{score}</span>
    </div>
  );
}
