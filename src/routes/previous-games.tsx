import { createFileRoute, Link } from "@tanstack/react-router";
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
  const date = new Date(match.createdAt).toLocaleDateString("pt-BR");
  const status = match.status === "finished" ? "Finalizado" : "Em andamento";

  return (
    <li className="bg-gray-800 rounded-xl p-4">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs text-gray-400 uppercase tracking-wide">{match.gameType}</span>
          <div className="mt-1 text-lg font-semibold">
            {match.teamA.name}{" "}
            <span className="text-yellow-400">
              {match.teamA.score} – {match.teamB.score}
            </span>{" "}
            {match.teamB.name}
          </div>
        </div>
        <div className="text-right text-xs text-gray-400">
          <div>{date}</div>
          <div className="mt-1">{status}</div>
        </div>
      </div>
    </li>
  );
}
