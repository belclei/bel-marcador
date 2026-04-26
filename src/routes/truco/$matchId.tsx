import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMatch, saveMatch, updateMatch } from "~/lib/storage";
import { addScore, checkWinner, createTrucoMatch, SCORE_BUTTONS, undoLastRound } from "~/lib/truco";
import { ScoreBoard } from "~/components/truco/ScoreBoard";
import { ScoreButtons } from "~/components/truco/ScoreButtons";
import { MatchControls } from "~/components/truco/MatchControls";
import { TrucoSetupModal } from "~/components/truco/TrucoSetupModal";
import type { TrucoMatch } from "~/types";

export const Route = createFileRoute("/truco/$matchId")({
  component: TrucoMatchPage,
});

function TrucoMatchPage() {
  const { matchId } = Route.useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState<TrucoMatch | null>(null);
  const [winner, setWinner] = useState<"A" | "B" | null>(null);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    const loaded = getMatch(matchId);
    if (!loaded) {
      navigate({ to: "/" });
      return;
    }
    setMatch(loaded);
    setWinner(checkWinner(loaded));
  }, [matchId, navigate]);

  function applyAndSave(updated: TrucoMatch) {
    const w = checkWinner(updated);
    const final = w ? { ...updated, finishedAt: new Date().toISOString() } : updated;
    setMatch(final);
    setWinner(w);
    updateMatch(final);
  }

  function handleNewGame(values: { teamAName: string; teamBName: string; maxScore: number }) {
    const newMatch = createTrucoMatch({
      teamAName: values.teamAName || "Nós",
      teamAMembers: [],
      teamBName: values.teamBName || "Eles",
      teamBMembers: [],
      maxScore: values.maxScore,
    });
    saveMatch(newMatch);
    setShowSetup(false);
    navigate({ to: "/truco/$matchId", params: { matchId: newMatch.id } });
  }

  if (!match) return null;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
        <Link to="/" className="text-gray-400 hover:text-white">
          ←
        </Link>
        <span className="text-sm text-gray-400">Truco</span>
      </div>

      <ScoreBoard match={match} />

      {winner && <WinnerBanner winner={winner} match={match} />}

      <div className="flex flex-1 overflow-hidden">
        <ScoreButtons
          buttons={SCORE_BUTTONS}
          onScore={(pts) => applyAndSave(addScore(match, "A", pts))}
          disabled={!!winner}
          align="left"
        />

        <MatchControls
          match={match}
          onUndo={() => applyAndSave(undoLastRound(match))}
          onNewGameClick={() => setShowSetup(true)}
        />

        <ScoreButtons
          buttons={SCORE_BUTTONS}
          onScore={(pts) => applyAndSave(addScore(match, "B", pts))}
          disabled={!!winner}
          align="right"
        />
      </div>

      {showSetup && (
        <TrucoSetupModal
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

function WinnerBanner({ winner, match }: { winner: "A" | "B"; match: TrucoMatch }) {
  const name = winner === "A" ? match.teamA.name : match.teamB.name;
  return (
    <div className="bg-yellow-400 text-gray-900 text-center py-2 font-bold">
      🏆 {name} venceu!
    </div>
  );
}
