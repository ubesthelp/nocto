import { ReceiptPercent } from "@medusajs/icons"
import { RouteEntry } from "@rsc-labs/nocto-plugin-system"
import { ErrorBoundary } from "../../../components/utilities/error-boundary"
import { t } from "i18next"
import { UIMatch } from "react-router-dom"
import { HttpTypes } from "@medusajs/types"

export const sidebarPromotions = {
  id: "@promotions",
  sidebar: {
    path: "/promotions",
    label: "促销活动",
    icon: ReceiptPercent,
    items: [
      {
        label: "营销活动",
        path: "/campaigns",
      },
    ],
  },
  routes: (): RouteEntry[] => [
      {
      path: "/promotions",
      layout: "main",
      errorElement: <ErrorBoundary />,
      handle: {
        breadcrumb: () => t("promotions.domain"),
      },
      children: [
        {
          path: "",
          layout: "main",
          lazy: () => import("../../../routes/promotions/promotion-list"),
        },
        {
          path: "create",
          layout: "main",
          lazy: () =>
            import("../../../routes/promotions/promotion-create"),
        },
        {
          path: ":id",
          layout: "main",
          lazy: async () => {
            const { Component, Breadcrumb, loader } = await import(
              "../../../routes/promotions/promotion-detail"
            )

            return {
              Component,
              loader,
              handle: {
                breadcrumb: (
                  match: UIMatch<HttpTypes.AdminPromotionResponse>
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
                  "../../../routes/promotions/promotion-edit-details"
                ),
            },
            {
              path: "add-to-campaign",
              layout: "main",
              lazy: () =>
                import(
                  "../../../routes/promotions/promotion-add-campaign"
                ),
            },
            {
              path: ":ruleType/edit",
              layout: "main",
              lazy: () =>
                import("../../../routes/promotions/common/edit-rules"),
            },
          ],
        },
      ],
    }
  ]
}
