import { createRootRoute, HeadContent, Outlet, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
const Route$3 = createRootRoute({
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
  return /* @__PURE__ */ jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "bg-gray-950 text-white min-h-screen", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-md mx-auto min-h-screen", children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$2 = () => import("./previous-games-Cc5SlKNR.js");
const Route$2 = createFileRoute("/previous-games")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-ChE5yxbD.js");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./_matchId-DNzFV1w5.js");
const Route = createFileRoute("/truco/$matchId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const PreviousGamesRoute = Route$2.update({
  id: "/previous-games",
  path: "/previous-games",
  getParentRoute: () => Route$3
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$3
});
const TrucoMatchIdRoute = Route.update({
  id: "/truco/$matchId",
  path: "/truco/$matchId",
  getParentRoute: () => Route$3
});
const rootRouteChildren = {
  IndexRoute,
  PreviousGamesRoute,
  TrucoMatchIdRoute
};
const routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  return createRouter({ routeTree, scrollRestoration: true });
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  router as r
};
