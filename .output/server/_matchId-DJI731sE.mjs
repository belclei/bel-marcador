import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useNavigate, L as Link } from "./_libs/tanstack__react-router.mjs";
import { g as getMatch, u as updateMatch, s as saveMatch } from "./_ssr/storage-38al-aT2.mjs";
import { S as SCORE_BUTTONS, a as addScore, c as createTrucoMatch } from "./_ssr/truco-C1UuxXTW.mjs";
import { c as checkWinner, u as undoLastRound, S as SetupModal } from "./_ssr/SetupModal-DLIKnAFJ.mjs";
import { R as Route$1 } from "./_ssr/router-ShMDI1HA.mjs";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch px-4 py-5 bg-gray-900 border-b border-gray-800 gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TeamScore, { team: match.teamA, align: "left" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-600 text-2xl font-light flex items-center", children: "–" }),
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
      className: `flex flex-col w-0 flex-1 break-words ${align === "right" ? "items-end text-right" : "items-start text-left"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-bold font-mono text-yellow-400", children: team.score }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-400 mt-1 leading-tight", children: team.name }),
        team.members.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 leading-tight", children: team.members.join(", ") })
      ]
    }
  );
}
function ScoreButtons({ buttons, onScore, disabled, align }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex flex-col gap-2 p-3 ${align === "right" ? "items-end" : "items-start"}`, children: buttons.map((pts) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => onScore(pts),
      disabled,
      className: "w-20 h-20 rounded-lg bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-sm",
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600 block text-center", children: "–" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "font-mono text-lg text-gray-400 space-y-1 overflow-y-auto max-h-40 text-center tabular-nums", children: rounds.map((round, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: round.undone ? "line-through text-gray-600" : "", children: [
    round.teamAScore,
    " – ",
    round.teamBScore
  ] }, i)) });
}
function MatchControls({ match, onUndo, onNewGameClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 px-2 py-3 flex-1 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onNewGameClick,
        className: "w-full bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all rounded-lg py-2 text-sm font-semibold",
        children: "Novo Jogo"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onUndo,
        disabled: match.rounds.length === 0 || match.rounds.every((r) => r.undone),
        className: "w-full bg-gray-800 hover:bg-gray-700 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-lg py-2 text-sm font-semibold",
        children: "Desfazer"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchLog, { rounds: match.rounds }) })
  ] });
}
function TrucoMatchPage() {
  const {
    matchId
  } = Route$1.useParams();
  const navigate = useNavigate();
  const [match, setMatch] = reactExports.useState(null);
  const [winner, setWinner] = reactExports.useState(null);
  const [showSetup, setShowSetup] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 border-b border-gray-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-gray-400 hover:text-white", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-400", children: "Truco" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreBoard, { match }),
    winner && /* @__PURE__ */ jsxRuntimeExports.jsx(WinnerBanner, { winner, match }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreButtons, { buttons: SCORE_BUTTONS, onScore: (pts) => applyAndSave(addScore(match, "A", pts)), disabled: !!winner, align: "left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MatchControls, { match, onUndo: () => applyAndSave(undoLastRound(match)), onNewGameClick: () => setShowSetup(true) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreButtons, { buttons: SCORE_BUTTONS, onScore: (pts) => applyAndSave(addScore(match, "B", pts)), disabled: !!winner, align: "right" })
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
  TrucoMatchPage as component
};
