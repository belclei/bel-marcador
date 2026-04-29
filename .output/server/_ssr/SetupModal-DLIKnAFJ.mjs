import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { o as objectType, c as coerce, s as stringType } from "../_libs/zod.mjs";
function undoLastRound(match) {
  if (match.rounds.length === 0) return match;
  const lastActiveIndex = [...match.rounds].reverse().findIndex((r) => !r.undone);
  if (lastActiveIndex === -1) return match;
  const realIndex = match.rounds.length - 1 - lastActiveIndex;
  const rounds = match.rounds.map((r, i) => i === realIndex ? { ...r, undone: true } : r);
  const activeRounds = rounds.filter((r) => !r.undone);
  const last = activeRounds[activeRounds.length - 1];
  const teamA = { ...match.teamA, score: last?.teamAScore ?? 0 };
  const teamB = { ...match.teamB, score: last?.teamBScore ?? 0 };
  return { ...match, teamA, teamB, rounds };
}
function checkWinner(match) {
  if (match.teamA.score >= match.maxScore) return "A";
  if (match.teamB.score >= match.maxScore) return "B";
  return null;
}
const SetupSchema = objectType({
  teamAName: stringType().max(50, "Máximo 50 caracteres"),
  teamBName: stringType().max(50, "Máximo 50 caracteres"),
  maxScore: coerce.number({ invalid_type_error: "Digite um número válido" }).int("Deve ser número inteiro").positive("Deve ser maior que zero")
});
function SetupModal({ defaults, onConfirm, onCancel }) {
  const dialogRef = reactExports.useRef(null);
  const [teamAName, setTeamAName] = reactExports.useState(
    defaults.teamAName === "Nós" ? "" : defaults.teamAName
  );
  const [teamBName, setTeamBName] = reactExports.useState(
    defaults.teamBName === "Eles" ? "" : defaults.teamBName
  );
  const [maxScore, setMaxScore] = reactExports.useState(String(defaults.maxScore));
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    dialogRef.current?.showModal();
  }, []);
  function submitSetup() {
    const result = SetupSchema.safeParse({ teamAName, teamBName, maxScore });
    if (!result.success) {
      const errs = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (!errs[field]) errs[field] = issue.message;
      }
      setErrors(errs);
      return;
    }
    onConfirm(result.data);
  }
  function handleDialogClick(e) {
    if (e.target === dialogRef.current) onCancel();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      ref: dialogRef,
      className: "bg-gray-900 text-white rounded-2xl p-6 w-full max-w-sm border-0",
      onClick: handleDialogClick,
      onKeyDown: (e) => {
        if (e.key === "Escape" && e.target === dialogRef.current) onCancel();
      },
      onClose: onCancel,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-6", children: "Novo Jogo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              submitSetup();
            },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SetupField, { label: "Time 1 (opcional)", htmlFor: "setup-team-a", error: errors.teamAName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "setup-team-a",
                  type: "text",
                  placeholder: "Nós",
                  value: teamAName,
                  onChange: (e) => setTeamAName(e.target.value),
                  className: "w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SetupField, { label: "Time 2 (opcional)", htmlFor: "setup-team-b", error: errors.teamBName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "setup-team-b",
                  type: "text",
                  placeholder: "Eles",
                  value: teamBName,
                  onChange: (e) => setTeamBName(e.target.value),
                  className: "w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SetupField,
                {
                  label: "Pontuação máxima",
                  htmlFor: "setup-max-score",
                  error: errors.maxScore,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "setup-max-score",
                      type: "text",
                      inputMode: "numeric",
                      placeholder: "2000",
                      value: maxScore,
                      onChange: (e) => setMaxScore(e.target.value),
                      className: "w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onCancel,
                    className: "flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-colors",
                    children: "Cancelar"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    className: "flex-1 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition-colors",
                    children: "Começar"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function SetupField({
  label,
  htmlFor,
  error,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor, className: "text-sm text-gray-400", children: label }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400", children: error })
  ] });
}
export {
  SetupModal as S,
  checkWinner as c,
  undoLastRound as u
};
