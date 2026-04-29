import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { T as TRUCO_META, c as createTrucoMatch } from "./truco-C1UuxXTW.mjs";
import { L as LIVRE_META, c as createLivreMatch } from "./livre-CaWiho2_.mjs";
import { l as loadMatches, s as saveMatch } from "./storage-38al-aT2.mjs";
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
function GameCard({ name, description, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "w-full text-left bg-gray-800 hover:bg-gray-700 active:scale-95 transition-all rounded-xl p-5 cursor-pointer",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg", children: name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400 mt-1", children: description })
      ]
    }
  );
}
function PreviousGamesCard({ onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "w-full text-left bg-gray-700 hover:bg-gray-600 active:scale-95 transition-all rounded-xl p-5 cursor-pointer",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg", children: "Jogos anteriores" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-400 mt-1", children: "Ver partidas já jogadas" })
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
  function handleLivreClick() {
    const matches = loadMatches();
    const active = [...matches].reverse().find((m) => m.gameType === "livre" && !m.finishedAt);
    if (active) {
      navigate({
        to: "/livre/$matchId",
        params: {
          matchId: active.id
        }
      });
      return;
    }
    const newMatch = createLivreMatch({
      teamAName: "Nós",
      teamBName: "Eles",
      maxScore: 2e3
    });
    saveMatch(newMatch);
    navigate({
      to: "/livre/$matchId",
      params: {
        matchId: newMatch.id
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-center py-4", children: "Bel Marcador" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PreviousGamesCard, { onClick: () => navigate({
      to: "/previous-games"
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GameCard, { name: TRUCO_META.name, description: TRUCO_META.description, onClick: handleTrucoClick }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GameCard, { name: LIVRE_META.name, description: LIVRE_META.description, onClick: handleLivreClick })
  ] });
}
export {
  GameListPage as component
};
