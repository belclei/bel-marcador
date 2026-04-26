import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { T as TRUCO_META, c as createTrucoMatch } from "./truco-DbCLcUWO.js";
import { l as loadMatches, s as saveMatch } from "./storage-BGNnnZDs.js";
import "zod";
function GameCard({ name, description, onClick }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "w-full text-left bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all rounded-xl p-5 cursor-pointer",
      children: [
        /* @__PURE__ */ jsx("div", { className: "font-bold text-lg", children: name }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mt-1", children: description })
      ]
    }
  );
}
function PreviousGamesCard({ onClick }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "w-full text-left bg-gray-700 hover:bg-gray-600 active:scale-95 transition-all rounded-xl p-5 cursor-pointer",
      children: [
        /* @__PURE__ */ jsx("div", { className: "font-bold text-lg", children: "Jogos anteriores" }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 mt-1", children: "Ver partidas já jogadas" })
      ]
    }
  );
}
function GameListPage() {
  const navigate = useNavigate();
  function handleTrucoClick() {
    const matches = loadMatches();
    const active = [...matches].reverse().find((m) => m.gameType === "truco" && !m.finishedAt);
    if (active) {
      navigate({
        to: "/truco/$matchId",
        params: {
          matchId: active.id
        }
      });
      return;
    }
    const newMatch = createTrucoMatch({
      teamAName: "Nós",
      teamAMembers: [],
      teamBName: "Eles",
      teamBMembers: [],
      maxScore: 12
    });
    saveMatch(newMatch);
    navigate({
      to: "/truco/$matchId",
      params: {
        matchId: newMatch.id
      }
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-center py-4", children: "Bel Marcador" }),
    /* @__PURE__ */ jsx(PreviousGamesCard, { onClick: () => navigate({
      to: "/previous-games"
    }) }),
    /* @__PURE__ */ jsx(GameCard, { name: TRUCO_META.name, description: TRUCO_META.description, onClick: handleTrucoClick })
  ] });
}
export {
  GameListPage as component
};
