import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GameCard } from "~/components/GameCard";
import { PreviousGamesCard } from "~/components/PreviousGamesCard";
import { TRUCO_META } from "~/lib/truco";

export const Route = createFileRoute("/")({
  component: GameListPage,
});

function GameListPage() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center py-4">Bel Marcador</h1>
      <PreviousGamesCard onClick={() => navigate({ to: "/previous-games" })} />
      <GameCard
        name={TRUCO_META.name}
        description={TRUCO_META.description}
        onClick={() => navigate({ to: "/truco/setup" })}
      />
    </div>
  );
}
