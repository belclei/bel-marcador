import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import "~/styles/app.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bel Marcador" },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body className="bg-gray-950 text-white min-h-screen">
        <div className="max-w-md mx-auto min-h-screen">
          <Outlet />
        </div>
        <Scripts />
      </body>
    </html>
  );
}
