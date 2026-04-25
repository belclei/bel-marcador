import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GameCard } from "~/components/GameCard";
import { PreviousGamesCard } from "~/components/PreviousGamesCard";
import { createTrucoMatch, TRUCO_META } from "~/lib/truco";
import { loadMatches, saveMatch } from "~/lib/storage";

export const Route = createFileRoute("/")({
  component: GameListPage,
});

function GameListPage() {
  const navigate = useNavigate();

  function handleTrucoClick() {
    const matches = loadMatches();
    const active = [...matches].reverse().find(
      (m) => m.gameType === "truco" && m.status === "in_progress"
    );
    if (active) {
      navigate({ to: "/truco/$matchId", params: { matchId: active.id } });
      return;
    }
    const newMatch = createTrucoMatch({
      teamAName: "Nós",
      teamAMembers: [],
      teamBName: "Eles",
      teamBMembers: [],
      maxScore: 12,
    });
    saveMatch(newMatch);
    navigate({ to: "/truco/$matchId", params: { matchId: newMatch.id } });
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center py-4">Bel Marcador</h1>
      <PreviousGamesCard onClick={() => navigate({ to: "/previous-games" })} />
      <GameCard
        name={TRUCO_META.name}
        description={TRUCO_META.description}
        onClick={handleTrucoClick}
      />
    </div>
  );
}
