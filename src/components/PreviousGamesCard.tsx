interface PreviousGamesCardProps {
  onClick: () => void;
}

export function PreviousGamesCard({ onClick }: PreviousGamesCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-gray-700 hover:bg-gray-600 active:scale-95 transition-all rounded-xl p-5 cursor-pointer"
    >
      <div className="font-bold text-lg">Jogos anteriores</div>
      <div className="text-sm text-gray-400 mt-1">Ver partidas já jogadas</div>
    </button>
  );
}
