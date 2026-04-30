import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { l as loadMatches } from "./storage-38al-aT2.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
function PreviousGamesPage() {
  const [matches, setMatches] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setMatches([...loadMatches()].reverse());
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-gray-400 hover:text-white", children: "←" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Jogos anteriores" })
    ] }),
    matches.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-center mt-8", children: "Nenhum jogo registrado." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: matches.map((match) => /* @__PURE__ */ jsxRuntimeExports.jsx(MatchRow, { match }, match.id)) })
  ] });
}
function MatchRow({
  match
}) {
  const navigate = useNavigate();
  const date = new Date(match.createdAt).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => navigate({
    to: "/truco/$matchId",
    params: {
      matchId: match.id
    }
  }), className: "w-full text-left bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all rounded-xl p-4 cursor-pointer", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400 uppercase tracking-wide", children: match.gameType }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: date })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TeamLine, { name: match.teamA.name, score: match.teamA.score }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TeamLine, { name: match.teamB.name, score: match.teamB.score })
    ] })
  ] }) });
}
function TeamLine({
  name,
  score
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-sm font-semibold", children: name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-yellow-400 tabular-nums", children: score })
  ] });
}
export {
  PreviousGamesPage as component
};
