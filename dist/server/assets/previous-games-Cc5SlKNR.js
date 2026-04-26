import { jsxs, jsx } from "react/jsx-runtime";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { l as loadMatches } from "./storage-BGNnnZDs.js";
import "zod";
function PreviousGamesPage() {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    setMatches([...loadMatches()].reverse());
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-4 mb-4", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-gray-400 hover:text-white", children: "←" }),
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold", children: "Jogos anteriores" })
    ] }),
    matches.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-center mt-8", children: "Nenhum jogo registrado." }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: matches.map((match) => /* @__PURE__ */ jsx(MatchRow, { match }, match.id)) })
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
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => navigate({
    to: "/truco/$matchId",
    params: {
      matchId: match.id
    }
  }), className: "w-full text-left bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all rounded-xl p-4 cursor-pointer", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 uppercase tracking-wide", children: match.gameType }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: date })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx(TeamLine, { name: match.teamA.name, score: match.teamA.score }),
      /* @__PURE__ */ jsx(TeamLine, { name: match.teamB.name, score: match.teamB.score })
    ] })
  ] }) });
}
function TeamLine({
  name,
  score
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx("span", { className: "flex-1 truncate text-sm font-semibold", children: name }),
    /* @__PURE__ */ jsx("span", { className: "font-mono text-yellow-400 tabular-nums", children: score })
  ] });
}
export {
  PreviousGamesPage as component
};
