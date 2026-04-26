import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { g as getMatch, u as updateMatch, s as saveMatch } from "./storage-BGNnnZDs.js";
import { a as checkWinner, S as SCORE_BUTTONS, b as addScore, u as undoLastRound, c as createTrucoMatch } from "./truco-DbCLcUWO.js";
import { z } from "zod";
import { R as Route } from "./router-DBQ-1iOy.js";
function ScoreBoard({ match }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-stretch px-4 py-5 bg-gray-900 border-b border-gray-800 gap-3", children: [
    /* @__PURE__ */ jsx(TeamScore, { team: match.teamA, align: "left" }),
    /* @__PURE__ */ jsx("div", { className: "text-gray-600 text-2xl font-light flex items-center", children: "–" }),
    /* @__PURE__ */ jsx(TeamScore, { team: match.teamB, align: "right" })
  ] });
}
function TeamScore({
  team,
  align
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex flex-col w-0 flex-1 break-words ${align === "right" ? "items-end text-right" : "items-start text-left"}`,
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-5xl font-bold font-mono text-yellow-400", children: team.score }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 mt-1 leading-tight", children: team.name }),
        team.members.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 leading-tight", children: team.members.join(", ") })
      ]
    }
  );
}
function ScoreButtons({ buttons, onScore, disabled, align }) {
  return /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-2 p-3 ${align === "right" ? "items-end" : "items-start"}`, children: buttons.map((pts) => /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: () => onScore(pts),
      disabled,
      className: "w-14 h-14 rounded-lg bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-sm",
      children: [
        "+",
        pts
      ]
    },
    pts
  )) });
}
function MatchLog({ rounds }) {
  if (rounds.length === 0) {
    return /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600 block text-center", children: "–" });
  }
  return /* @__PURE__ */ jsx("ul", { className: "font-mono text-sm text-gray-400 space-y-1 overflow-y-auto max-h-40 text-center tabular-nums", children: rounds.map((round, i) => /* @__PURE__ */ jsxs("li", { className: round.undone ? "line-through text-gray-600" : "", children: [
    round.teamAScore,
    " – ",
    round.teamBScore
  ] }, i)) });
}
function MatchControls({ match, onUndo, onNewGameClick }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 px-2 py-3 flex-1 min-w-0", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onNewGameClick,
        className: "w-full bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all rounded-lg py-2 text-sm font-semibold",
        children: "Novo Jogo"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onUndo,
        disabled: match.rounds.length === 0 || match.rounds.every((r) => r.undone),
        className: "w-full bg-gray-800 hover:bg-gray-700 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-lg py-2 text-sm font-semibold",
        children: "Desfazer"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "w-full flex-1 overflow-hidden", children: /* @__PURE__ */ jsx(MatchLog, { rounds: match.rounds }) })
  ] });
}
const SetupSchema = z.object({
  teamAName: z.string().max(50, "Máximo 50 caracteres"),
  teamBName: z.string().max(50, "Máximo 50 caracteres"),
  maxScore: z.coerce.number({ invalid_type_error: "Digite um número válido" }).int("Deve ser número inteiro").positive("Deve ser maior que zero")
});
function TrucoSetupModal({ defaults, onConfirm, onCancel }) {
  const dialogRef = useRef(null);
  const [teamAName, setTeamAName] = useState(
    defaults.teamAName === "Nós" ? "" : defaults.teamAName
  );
  const [teamBName, setTeamBName] = useState(
    defaults.teamBName === "Eles" ? "" : defaults.teamBName
  );
  const [maxScore, setMaxScore] = useState(String(defaults.maxScore));
  const [errors, setErrors] = useState({});
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-6", children: "Novo Jogo" }),
        /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              submitSetup();
            },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsx(SetupField, { label: "Time 1 (opcional)", htmlFor: "setup-team-a", error: errors.teamAName, children: /* @__PURE__ */ jsx(
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
              /* @__PURE__ */ jsx(SetupField, { label: "Time 2 (opcional)", htmlFor: "setup-team-b", error: errors.teamBName, children: /* @__PURE__ */ jsx(
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
              /* @__PURE__ */ jsx(SetupField, { label: "Pontuação máxima", htmlFor: "setup-max-score", error: errors.maxScore, children: /* @__PURE__ */ jsx(
                "input",
                {
                  id: "setup-max-score",
                  type: "text",
                  inputMode: "numeric",
                  placeholder: "12",
                  value: maxScore,
                  onChange: (e) => setMaxScore(e.target.value),
                  className: "w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onCancel,
                    className: "flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-colors",
                    children: "Cancelar"
                  }
                ),
                /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsx("label", { htmlFor, className: "text-sm text-gray-400", children: label }),
    children,
    error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-400", children: error })
  ] });
}
function TrucoMatchPage() {
  const {
    matchId
  } = Route.useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [winner, setWinner] = useState(null);
  const [showSetup, setShowSetup] = useState(false);
  useEffect(() => {
    const loaded = getMatch(matchId);
    if (!loaded) {
      navigate({
        to: "/"
      });
      return;
    }
    setMatch(loaded);
    setWinner(checkWinner(loaded));
  }, [matchId, navigate]);
  function applyAndSave(updated) {
    const w = checkWinner(updated);
    const final = w ? {
      ...updated,
      finishedAt: (/* @__PURE__ */ new Date()).toISOString()
    } : updated;
    setMatch(final);
    setWinner(w);
    updateMatch(final);
  }
  function handleNewGame(values) {
    const newMatch = createTrucoMatch({
      teamAName: values.teamAName || "Nós",
      teamAMembers: [],
      teamBName: values.teamBName || "Eles",
      teamBMembers: [],
      maxScore: values.maxScore
    });
    saveMatch(newMatch);
    setShowSetup(false);
    navigate({
      to: "/truco/$matchId",
      params: {
        matchId: newMatch.id
      }
    });
  }
  if (!match) return null;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b border-gray-800", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-gray-400 hover:text-white", children: "←" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400", children: "Truco" })
    ] }),
    /* @__PURE__ */ jsx(ScoreBoard, { match }),
    winner && /* @__PURE__ */ jsx(WinnerBanner, { winner, match }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsx(ScoreButtons, { buttons: SCORE_BUTTONS, onScore: (pts) => applyAndSave(addScore(match, "A", pts)), disabled: !!winner, align: "left" }),
      /* @__PURE__ */ jsx(MatchControls, { match, onUndo: () => applyAndSave(undoLastRound(match)), onNewGameClick: () => setShowSetup(true) }),
      /* @__PURE__ */ jsx(ScoreButtons, { buttons: SCORE_BUTTONS, onScore: (pts) => applyAndSave(addScore(match, "B", pts)), disabled: !!winner, align: "right" })
    ] }),
    showSetup && /* @__PURE__ */ jsx(TrucoSetupModal, { defaults: {
      teamAName: match.teamA.name,
      teamBName: match.teamB.name,
      maxScore: match.maxScore
    }, onConfirm: handleNewGame, onCancel: () => setShowSetup(false) })
  ] });
}
function WinnerBanner({
  winner,
  match
}) {
  const name = winner === "A" ? match.teamA.name : match.teamB.name;
  return /* @__PURE__ */ jsxs("div", { className: "bg-yellow-400 text-gray-900 text-center py-2 font-bold", children: [
    "🏆 ",
    name,
    " venceu!"
  ] });
}
export {
  TrucoMatchPage as component
};
