interface ScoreButtonsProps {
  buttons: readonly number[];
  onScore: (points: number) => void;
  disabled: boolean;
  align: "left" | "right";
}

export function ScoreButtons({ buttons, onScore, disabled, align }: ScoreButtonsProps) {
  return (
    <div className={`flex flex-col gap-2 p-3 ${align === "right" ? "items-end" : "items-start"}`}>
      {buttons.map((pts) => (
        <button
          key={pts}
          type="button"
          onClick={() => onScore(pts)}
          disabled={disabled}
          className="w-14 h-14 rounded-lg bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-sm"
        >
          +{pts}
        </button>
      ))}
    </div>
  );
}
