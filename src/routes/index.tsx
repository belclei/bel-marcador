import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GameCard } from "~/components/GameCard";
import { PreviousGamesCard } from "~/components/PreviousGamesCard";
import { createTrucoMatch, TRUCO_META } from "~/lib/truco";
import { createLivreMatch, LIVRE_META } from "~/lib/livre";
import { loadMatches, saveMatch } from "~/lib/storage";

export const Route = createFileRoute("/")({
  component: GameListPage,
});

function GameListPage() {
  const navigate = useNavigate();

  function handleTrucoClick() {
    const matches = loadMatches();
    const active = [...matches].reverse().find((m) => m.gameType === "truco" && !m.finishedAt);
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

  function handleLivreClick() {
    const matches = loadMatches();
    const active = [...matches].reverse().find((m) => m.gameType === "livre" && !m.finishedAt);
    if (active) {
      navigate({ to: "/livre/$matchId", params: { matchId: active.id } });
      return;
    }
    const newMatch = createLivreMatch({ teamAName: "Nós", teamBName: "Eles", maxScore: 2000 });
    saveMatch(newMatch);
    navigate({ to: "/livre/$matchId", params: { matchId: newMatch.id } });
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
      <GameCard
        name={LIVRE_META.name}
        description={LIVRE_META.description}
        onClick={handleLivreClick}
      />
    </div>
  );
}
