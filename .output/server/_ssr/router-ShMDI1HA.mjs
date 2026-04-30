import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, O as Outlet, S as Scripts } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
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
const Route$4 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bel Marcador" }
    ]
  }),
  component: RootLayout
});
function RootLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "bg-gray-950 text-white min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$3 = () => import("./previous-games-DKgNjTne.mjs");
const Route$3 = createFileRoute("/previous-games")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-C5bLMYtF.mjs");
const Route$2 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("../_matchId-DJI731sE.mjs");
const Route$1 = createFileRoute("/truco/$matchId")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_matchId-SHRBFdNU.mjs");
const Route = createFileRoute("/livre/$matchId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const PreviousGamesRoute = Route$3.update({
  id: "/previous-games",
  path: "/previous-games",
  getParentRoute: () => Route$4
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const TrucoMatchIdRoute = Route$1.update({
  id: "/truco/$matchId",
  path: "/truco/$matchId",
  getParentRoute: () => Route$4
});
const LivreMatchIdRoute = Route.update({
  id: "/livre/$matchId",
  path: "/livre/$matchId",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  PreviousGamesRoute,
  LivreMatchIdRoute,
  TrucoMatchIdRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  return createRouter({ routeTree, scrollRestoration: true });
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  Route as a,
  router as r
};
