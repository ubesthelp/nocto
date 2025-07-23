import { RouteObject } from "react-router-dom"
import { ProtectedRoute } from "../../components/authentication/protected-route"
import { MainLayout } from "../../components/layout/main-layout"
import { PublicLayout } from "../../components/layout/public-layout"
import { SettingsLayout } from "../../components/layout/settings-layout"
import { ErrorBoundary } from "../../components/utilities/error-boundary"
import { mapPluginRoutes } from "./utils"
import { Spinner } from "@medusajs/icons"
import { useNoctoPluginContext } from "@rsc-labs/nocto-plugin-system"

export function getRouteMap({
  settingsRoutes,
  coreRoutes,
}: {
  settingsRoutes: RouteObject[]
  coreRoutes: RouteObject[]
}) {
  const { routes } = useNoctoPluginContext()

  if (!routes.length) {
    return [
      {
        path: "*",
        element: (
          <div className="flex min-h-screen items-center justify-center">
            <Spinner className="text-ui-fg-interactive animate-spin" />
          </div>
        )
      },
    ]
  }

  const authRoutes = routes.filter((r) => r.layout === "auth")
  const mainRoutes = routes.filter((r) => r.layout === "main")
  const settingsNoctoRoutes = routes.filter((r) => r.layout === "settings")
  const publicRoutes = routes.filter((r) => r.layout === "public")

  const mappedAuthRoutes = mapPluginRoutes(authRoutes)
  const mappedMainRoutes = mapPluginRoutes(mainRoutes)
  const mappedSettingsRoutes = mapPluginRoutes(settingsNoctoRoutes)
  const mappedPublicRoutes = mapPluginRoutes(publicRoutes)
  return [
    {
      element: <ProtectedRoute />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          element: <MainLayout />,
          children: mappedMainRoutes,
        },
      ],
    },
    {
      // 🔓 Public (auth) routes like login, reset-password, etc.
      errorElement: <ErrorBoundary />,
      children: mappedAuthRoutes,
    },
    {
      element: <ProtectedRoute />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/",
              errorElement: <ErrorBoundary />,
              lazy: () => import("../../routes/home"),
            },
            ...coreRoutes,
          ],
        },
      ],
    },
    {
      element: <ProtectedRoute />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          element: <SettingsLayout />,
          children: mappedSettingsRoutes,
        },
      ],
    },
    {
      element: <ProtectedRoute />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          element: <SettingsLayout />,
          children: settingsRoutes,
        },
      ],
    },
    {
      element: <PublicLayout />,
      children: [
        {
          errorElement: <ErrorBoundary />,
          children: [
            ...mappedPublicRoutes
          ],
        },
      ],
    },
  ]
}
