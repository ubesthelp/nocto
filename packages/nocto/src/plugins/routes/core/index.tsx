import { ErrorBoundary } from "../../../components/utilities/error-boundary"
import { RouteEntry } from "@rsc-labs/nocto-plugin-system"

export const coreRoutes = {
  id: "@core-routes",
  routes: (): RouteEntry[] => [
    {
      path: "/",
      layout: "main",
      errorElement: <ErrorBoundary />,
      lazy: () => import("../../../routes/home"),
    },
  ],
}