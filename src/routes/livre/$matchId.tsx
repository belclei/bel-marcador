import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMatch, saveMatch, updateMatch } from "~/lib/storage";
import { addLivreRound, checkWinner, createLivreMatch, LIVRE_META, undoLastRound } from "~/lib/livre";
import { ScoreBoard } from "~/components/livre/ScoreBoard";
import { ScoreInputs } from "~/components/livre/ScoreInputs";
import { MatchLog } from "~/components/livre/MatchLog";
import { SetupModal, type SetupValues } from "~/components/SetupModal";
import type { LivreMatch } from "~/types";

export const Route = createFileRoute("/livre/$matchId")({
  component: LivreMatchPage,
});

function LivreMatchPage() {
  const { matchId } = Route.useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState<LivreMatch | null>(null);
  const [winner, setWinner] = useState<"A" | "B" | null>(null);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    const loaded = getMatch(matchId);
    if (!loaded || loaded.gameType !== "livre") {
      navigate({ to: "/" });
      return;
    }
    setMatch(loaded as LivreMatch);
    setWinner(checkWinner(loaded as LivreMatch));
  }, [matchId, navigate]);

  function applyAndSave(updated: LivreMatch) {
    const w = checkWinner(updated);
    const final = w ? { ...updated, finishedAt: new Date().toISOString() } : updated;
    setMatch(final);
    setWinner(w);
    updateMatch(final);
  }

  function handleAddRound(teamAPoints: number, teamBPoints: number) {
    if (!match) return;
    applyAndSave(addLivreRound(match, teamAPoints, teamBPoints));
  }

  function handleNewGame(values: SetupValues) {
    const newMatch = createLivreMatch({
      teamAName: values.teamAName || "Nós",
      teamBName: values.teamBName || "Eles",
      maxScore: values.maxScore,
    });
    saveMatch(newMatch);
    setShowSetup(false);
    navigate({ to: "/livre/$matchId", params: { matchId: newMatch.id } });
  }

  if (!match) return null;

  const canUndo = match.rounds.some((r) => !r.undone);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
        <Link to="/" className="text-gray-400 hover:text-white">
          ←
        </Link>
        <span className="text-sm text-gray-400">{LIVRE_META.name}</span>
      </div>

      <ScoreBoard match={match} />
      {winner && <WinnerBanner winner={winner} match={match} />}

      <div className="flex flex-col gap-3 px-4 py-4 overflow-y-auto flex-1">
        <ScoreInputs
          teamAName={match.teamA.name}
          teamBName={match.teamB.name}
          onConfirm={handleAddRound}
          disabled={!!winner}
        />

        <button
          type="button"
          onClick={() => setShowSetup(true)}
          className="w-full bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all rounded-lg py-2 text-sm font-semibold"
        >
          Novo Jogo
        </button>

        <button
          type="button"
          onClick={() => applyAndSave(undoLastRound(match))}
          disabled={!canUndo}
          className="w-full bg-gray-800 hover:bg-gray-700 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-lg py-2 text-sm font-semibold"
        >
          Desfazer
        </button>

        <MatchLog rounds={match.rounds} />
      </div>

      {showSetup && (
        <SetupModal
          defaults={{
            teamAName: match.teamA.name,
            teamBName: match.teamB.name,
            maxScore: match.maxScore,
          }}
          onConfirm={handleNewGame}
          onCancel={() => setShowSetup(false)}
        />
      )}
    </div>
  );
}

function WinnerBanner({ winner, match }: { winner: "A" | "B"; match: LivreMatch }) {
  const name = winner === "A" ? match.teamA.name : match.teamB.name;
  return (
    <div className="bg-yellow-400 text-gray-900 text-center py-2 font-bold">
      🏆 {name} venceu!
    </div>
  );
}
