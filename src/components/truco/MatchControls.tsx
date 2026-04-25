import type { TrucoMatch } from "~/types";
import { MatchLog } from "./MatchLog";

interface MatchControlsProps {
  match: TrucoMatch;
  onUndo: () => void;
  onNewGame: () => void;
}

export function MatchControls({ match, onUndo, onNewGame }: MatchControlsProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-2 py-3 flex-1 min-w-0">
      <button
        type="button"
        onClick={onNewGame}
        className="w-full bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all rounded-lg py-2 text-sm font-semibold"
      >
        Novo Jogo
      </button>
      <button
        type="button"
        onClick={onUndo}
        disabled={match.rounds.length === 0 || match.rounds.every((r) => r.undone)}
        className="w-full bg-gray-800 hover:bg-gray-700 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-lg py-2 text-sm font-semibold"
      >
        Desfazer
      </button>
      <div className="w-full flex-1 overflow-hidden">
        <MatchLog rounds={match.rounds} />
      </div>
    </div>
  );
}
