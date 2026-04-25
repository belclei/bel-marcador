import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { createTrucoMatch } from "~/lib/truco";
import { saveMatch } from "~/lib/storage";

export const Route = createFileRoute("/truco/setup")({
  component: TrucoSetupPage,
});

function TrucoSetupPage() {
  const navigate = useNavigate();
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [maxScore, setMaxScore] = useState(12);

  function handleStart(e: React.FormEvent) {
    e.preventDefault();
    const match = createTrucoMatch({
      teamAName: teamAName || "Nós",
      teamAMembers: [],
      teamBName: teamBName || "Eles",
      teamBMembers: [],
      maxScore,
    });
    saveMatch(match);
    navigate({ to: "/truco/$matchId", params: { matchId: match.id } });
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 py-4 mb-6">
        <Link to="/" className="text-gray-400 hover:text-white">
          ←
        </Link>
        <h1 className="text-xl font-bold">Novo jogo de Truco</h1>
      </div>

      <form onSubmit={handleStart} className="space-y-6">
        <div className="space-y-4">
          <Field label="Nome do time 1 (opcional)">
            <input
              type="text"
              placeholder="Nós"
              value={teamAName}
              onChange={(e) => setTeamAName(e.target.value)}
              className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </Field>

          <Field label="Nome do time 2 (opcional)">
            <input
              type="text"
              placeholder="Eles"
              value={teamBName}
              onChange={(e) => setTeamBName(e.target.value)}
              className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </Field>

          <Field label={`Pontuação máxima: ${maxScore}`}>
            <div className="flex gap-3 flex-wrap">
              {[12, 15, 24].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setMaxScore(v)}
                  className={`px-5 py-2 rounded-lg font-semibold transition-colors ${
                    maxScore === v
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl text-lg hover:bg-yellow-300 transition-colors"
        >
          Começar
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>
      {children}
    </div>
  );
}
