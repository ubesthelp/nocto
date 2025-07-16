import { ErrorBoundary } from "../../../components/utilities/error-boundary"
import { t } from "i18next"
import { UIMatch } from "react-router-dom"
import { HttpTypes } from "@medusajs/types"
import { RouteEntry } from "@rsc-labs/nocto-plugin-system"

export const campaignsRoutes = {
  id: "@campaigns",
  routes: (): RouteEntry[] => [
    {
    path: "/campaigns",
    layout: "main",
    errorElement: <ErrorBoundary />,
    handle: {
      breadcrumb: () => t("campaigns.domain"),
    },
    children: [
      {
        path: "",
        layout: "main",
        lazy: () => import("../../../routes/campaigns/campaign-list"),
        children: [],
      },
      {
        path: "create",
        layout: "main",
        lazy: () => import("../../../routes/campaigns/campaign-create"),
      },
      {
        path: ":id",
        layout: "main",
        lazy: async () => {
          const { Component, Breadcrumb, loader } = await import(
            "../../../routes/campaigns/campaign-detail"
          )

          return {
            Component,
            loader,
            handle: {
              breadcrumb: (
                match: UIMatch<HttpTypes.AdminCampaignResponse>
              ) => <Breadcrumb {...match} />,
            },
          }
        },
        children: [
          {
            path: "edit",
            layout: "main",
            lazy: () =>
              import("../../../routes/campaigns/campaign-edit"),
          },
          {
            path: "configuration",
            layout: "main",
            lazy: () =>
              import("../../../routes/campaigns/campaign-configuration"),
          },
          {
            path: "edit-budget",
            layout: "main",
            lazy: () =>
              import("../../../routes/campaigns/campaign-budget-edit"),
          },
          {
            path: "add-promotions",
            layout: "main",
            lazy: () =>
              import(
                "../../../routes/campaigns/add-campaign-promotions"
              ),
          },
        ],
      },
    ],
  }
]
}