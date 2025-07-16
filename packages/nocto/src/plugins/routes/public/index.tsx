import { RouteEntry } from "@rsc-labs/nocto-plugin-system"

export const publicRoutes = {
  id: "@public-routes",
  routes: (): RouteEntry[] => [
    {
      path: "/reset-password",
      layout: "public",
      lazy: () => import("../../../routes/reset-password"),
    },
    {
      path: "/invite",
      layout: "public",
      lazy: () => import("../../../routes/invite"),
    },
    {
      path: "*",
      layout: "public",
      lazy: () => import("../../../routes/no-match"),
    },
  ],
}