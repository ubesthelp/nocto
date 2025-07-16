import { RouteEntry } from "@rsc-labs/nocto-plugin-system"
import { ErrorBoundary } from "../../../components/utilities/error-boundary"
import { t } from "i18next"
import { UIMatch } from "react-router-dom"
import { HttpTypes } from "@medusajs/types"

export const reservationRoutes = {
  id: "@reservations",
  routes: (): RouteEntry[] => [
  {
    path: "/reservations",
    layout: "main",
    errorElement: <ErrorBoundary />,
    handle: {
      breadcrumb: () => t("reservations.domain"),
    },
    children: [
      {
        path: "",
        layout: "main",
        lazy: () =>
          import("../../../routes/reservations/reservation-list"),
        children: [
          {
            path: "create",
            layout: "main",
            lazy: () =>
              import("../../../routes/reservations/reservation-create"),
          },
        ],
      },
      {
        path: ":id",
        layout: "main",
        lazy: async () => {
          const { Component, Breadcrumb, loader } = await import(
            "../../../routes/reservations/reservation-detail"
          )

          return {
            Component,
            loader,
            handle: {
              breadcrumb: (
                match: UIMatch<HttpTypes.AdminReservationResponse>
              ) => <Breadcrumb {...match} />,
            },
          }
        },
        children: [
          {
            path: "edit",
            layout: "main",
            lazy: () =>
              import(
                "../../../routes/reservations/reservation-detail/components/edit-reservation"
              ),
          },
          {
            path: "metadata/edit",
            layout: "main",
            lazy: () =>
              import(
                "../../../routes/reservations/reservation-metadata"
              ),
          },
        ],
      },
    ],
  }
]
}