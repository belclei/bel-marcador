import { useState } from "react";

interface ScoreInputsProps {
  teamAName: string;
  teamBName: string;
  onConfirm: (teamAPoints: number, teamBPoints: number) => void;
  disabled?: boolean;
}

export function ScoreInputs({ teamAName, teamBName, onConfirm, disabled }: ScoreInputsProps) {
  const [teamAInput, setTeamAInput] = useState("");
  const [teamBInput, setTeamBInput] = useState("");

  function handleConfirm() {
    const a = Number(teamAInput);
    const b = Number(teamBInput);
    if (!Number.isFinite(a) || !Number.isFinite(b) || teamAInput === "" || teamBInput === "")
      return;
    onConfirm(a, b);
    setTeamAInput("");
    setTeamBInput("");
  }

  const canConfirm = !disabled && teamAInput !== "" && teamBInput !== "";

  return (
    <div className="bg-gray-800 rounded-xl p-4 space-y-3">
      <div className="flex gap-3">
        <input
          type="text"
          inputMode="numeric"
          placeholder={teamAName}
          value={teamAInput}
          onChange={(e) => setTeamAInput(e.target.value)}
          disabled={disabled}
          className="w-0 flex-1 bg-gray-700 rounded-lg px-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center text-xl font-mono"
        />
        <input
          type="text"
          inputMode="numeric"
          placeholder={teamBName}
          value={teamBInput}
          onChange={(e) => setTeamBInput(e.target.value)}
          disabled={disabled}
          className="w-0 flex-1 bg-gray-700 rounded-lg px-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center text-xl font-mono"
        />
      </div>
      <button
        type="button"
        onClick={handleConfirm}
        disabled={!canConfirm}
        className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-gray-900 font-bold py-2 rounded-lg transition-all"
      >
        Confirmar
      </button>
    </div>
  );
}
