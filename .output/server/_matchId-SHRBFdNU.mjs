import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useNavigate, L as Link } from "./_libs/tanstack__react-router.mjs";
import { g as getMatch, u as updateMatch, s as saveMatch } from "./_ssr/storage-38al-aT2.mjs";
import { L as LIVRE_META, a as addLivreRound, c as createLivreMatch } from "./_ssr/livre-CaWiho2_.mjs";
import { c as checkWinner, u as undoLastRound, S as SetupModal } from "./_ssr/SetupModal-DLIKnAFJ.mjs";
import { a as Route } from "./_ssr/router-ShMDI1HA.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/zod.mjs";
function ScoreBoard({ match }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex px-4 py-5 bg-gray-900 border-b border-gray-800", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TeamScore, { team: match.teamA, align: "left" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TeamScore, { team: match.teamB, align: "right" })
  ] });
}
function TeamScore({
  team,
  align
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col w-1/2 break-words ${align === "right" ? "items-end text-right" : "items-start text-left"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-bold font-mono text-yellow-400", children: team.score }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-400 mt-1 leading-tight", children: team.name })
      ]
    }
  );
}
function ScoreInputs({ teamAName, teamBName, onConfirm, disabled }) {
  const [teamAInput, setTeamAInput] = reactExports.useState("");
  const [teamBInput, setTeamBInput] = reactExports.useState("");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-xl p-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          placeholder: teamAName,
          value: teamAInput,
          onChange: (e) => setTeamAInput(e.target.value),
          disabled,
          className: "w-0 flex-1 bg-gray-700 rounded-lg px-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center text-xl font-mono"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          placeholder: teamBName,
          value: teamBInput,
          onChange: (e) => setTeamBInput(e.target.value),
          disabled,
          className: "w-0 flex-1 bg-gray-700 rounded-lg px-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center text-xl font-mono"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleConfirm,
        disabled: !canConfirm,
        className: "w-full bg-yellow-400 hover:bg-yellow-300 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-gray-900 font-bold py-2 rounded-lg transition-all",
        children: "Confirmar"
      }
    )
  ] });
}
function MatchLog({ rounds }) {
  if (rounds.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600 block text-center", children: "–" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 overflow-y-auto", children: rounds.map((round, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "li",
    {
      className: `flex px-3 py-1.5 rounded-lg font-mono tabular-nums text-lg ${round.undone ? "bg-gray-800/40 line-through text-gray-600" : "bg-gray-800 text-gray-300"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-left", children: round.teamAScore }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-right", children: round.teamBScore })
      ]
    },
    i
  )) });
}
function LivreMatchPage() {
  const {
    matchId
  } = Route.useParams();
  const navigate = useNavigate();
  const [match, setMatch] = reactExports.useState(null);
  const [winner, setWinner] = reactExports.useState(null);
  const [showSetup, setShowSetup] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const loaded = getMatch(matchId);
    if (!loaded || loaded.gameType !== "livre") {
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
  function handleAddRound(teamAPoints, teamBPoints) {
    if (!match) return;
    applyAndSave(addLivreRound(match, teamAPoints, teamBPoints));
  }
  function handleNewGame(values) {
    const newMatch = createLivreMatch({
      teamAName: values.teamAName || "Nós",
      teamBName: values.teamBName || "Eles",
      maxScore: values.maxScore
    });
    saveMatch(newMatch);
    setShowSetup(false);
    navigate({
      to: "/livre/$matchId",
      params: {
        matchId: newMatch.id
      }
    });
  }
  if (!match) return null;
  const canUndo = match.rounds.some((r) => !r.undone);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b border-gray-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-gray-400 hover:text-white", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-400", children: LIVRE_META.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreBoard, { match }),
    winner && /* @__PURE__ */ jsxRuntimeExports.jsx(WinnerBanner, { winner, match }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 px-4 py-4 overflow-y-auto flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreInputs, { teamAName: match.teamA.name, teamBName: match.teamB.name, onConfirm: handleAddRound, disabled: !!winner }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowSetup(true), className: "w-full bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all rounded-lg py-2 text-sm font-semibold", children: "Novo Jogo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => applyAndSave(undoLastRound(match)), disabled: !canUndo, className: "w-full bg-gray-800 hover:bg-gray-700 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-lg py-2 text-sm font-semibold", children: "Desfazer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MatchLog, { rounds: match.rounds })
    ] }),
    showSetup && /* @__PURE__ */ jsxRuntimeExports.jsx(SetupModal, { defaults: {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-yellow-400 text-gray-900 text-center py-2 font-bold", children: [
    "🏆 ",
    name,
    " venceu!"
  ] });
}
export {
  LivreMatchPage as component
};
