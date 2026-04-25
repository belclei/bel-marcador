interface GameCardProps {
  name: string;
  description: string;
  onClick: () => void;
}

export function GameCard({ name, description, onClick }: GameCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all rounded-xl p-5 cursor-pointer"
    >
      <div className="font-bold text-lg">{name}</div>
      <div className="text-sm text-gray-400 mt-1">{description}</div>
    </button>
  );
}
