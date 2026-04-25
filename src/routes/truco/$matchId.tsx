import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMatch, updateMatch } from "~/lib/storage";
import { addScore, checkWinner, resetMatch, SCORE_BUTTONS, undoLastRound } from "~/lib/truco";
import { ScoreBoard } from "~/components/truco/ScoreBoard";
import { ScoreButtons } from "~/components/truco/ScoreButtons";
import { MatchControls } from "~/components/truco/MatchControls";
import type { TrucoMatch } from "~/types";

export const Route = createFileRoute("/truco/$matchId")({
  component: TrucoMatchPage,
});

function TrucoMatchPage() {
  const { matchId } = Route.useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState<TrucoMatch | null>(null);
  const [winner, setWinner] = useState<"A" | "B" | null>(null);

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
    const final = w ? { ...updated, status: "finished" as const, finishedAt: new Date().toISOString() } : updated;
    setMatch(final);
    setWinner(w);
    updateMatch(final);
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
          label={match.teamA.name}
          buttons={SCORE_BUTTONS}
          onScore={(pts) => applyAndSave(addScore(match, "A", pts))}
          disabled={!!winner}
          align="left"
        />

        <MatchControls
          match={match}
          onUndo={() => applyAndSave(undoLastRound(match))}
          onNewGame={() => applyAndSave(resetMatch(match))}
        />

        <ScoreButtons
          label={match.teamB.name}
          buttons={SCORE_BUTTONS}
          onScore={(pts) => applyAndSave(addScore(match, "B", pts))}
          disabled={!!winner}
          align="right"
        />
      </div>
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
