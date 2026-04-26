import { type ReactNode, useEffect, useRef, useState } from "react";
import { z } from "zod";

const SetupSchema = z.object({
  teamAName: z.string().max(50, "Máximo 50 caracteres"),
  teamBName: z.string().max(50, "Máximo 50 caracteres"),
  maxScore: z.coerce
    .number({ invalid_type_error: "Digite um número válido" })
    .int("Deve ser número inteiro")
    .positive("Deve ser maior que zero"),
});

export type SetupValues = z.infer<typeof SetupSchema>;
type FieldErrors = Partial<Record<keyof SetupValues, string>>;

interface TrucoSetupModalProps {
  defaults: { teamAName: string; teamBName: string; maxScore: number };
  onConfirm: (values: SetupValues) => void;
  onCancel: () => void;
}

export function TrucoSetupModal({ defaults, onConfirm, onCancel }: TrucoSetupModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [teamAName, setTeamAName] = useState(
    defaults.teamAName === "Nós" ? "" : defaults.teamAName
  );
  const [teamBName, setTeamBName] = useState(
    defaults.teamBName === "Eles" ? "" : defaults.teamBName
  );
  const [maxScore, setMaxScore] = useState(String(defaults.maxScore));
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function submitSetup() {
    const result = SetupSchema.safeParse({ teamAName, teamBName, maxScore });
    if (!result.success) {
      const errs: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof SetupValues;
        if (!errs[field]) errs[field] = issue.message;
      }
      setErrors(errs);
      return;
    }
    onConfirm(result.data);
  }

  // Clicking the <dialog> backdrop fires a click whose target is the dialog element itself
  function handleDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onCancel();
  }

  return (
    <dialog
      ref={dialogRef}
      className="bg-gray-900 text-white rounded-2xl p-6 w-full max-w-sm border-0"
      onClick={handleDialogClick}
      onKeyDown={(e) => { if (e.key === "Escape" && e.target === dialogRef.current) onCancel(); }}
      onClose={onCancel}
    >
      <h2 className="text-xl font-bold mb-6">Novo Jogo</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitSetup();
        }}
        className="space-y-4"
      >
        <SetupField label="Time 1 (opcional)" htmlFor="setup-team-a" error={errors.teamAName}>
          <input
            id="setup-team-a"
            type="text"
            placeholder="Nós"
            value={teamAName}
            onChange={(e) => setTeamAName(e.target.value)}
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </SetupField>

        <SetupField label="Time 2 (opcional)" htmlFor="setup-team-b" error={errors.teamBName}>
          <input
            id="setup-team-b"
            type="text"
            placeholder="Eles"
            value={teamBName}
            onChange={(e) => setTeamBName(e.target.value)}
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </SetupField>

        <SetupField label="Pontuação máxima" htmlFor="setup-max-score" error={errors.maxScore}>
          <input
            id="setup-max-score"
            type="text"
            inputMode="numeric"
            placeholder="12"
            value={maxScore}
            onChange={(e) => setMaxScore(e.target.value)}
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </SetupField>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition-colors"
          >
            Começar
          </button>
        </div>
      </form>
    </dialog>
  );
}

function SetupField({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="text-sm text-gray-400">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
