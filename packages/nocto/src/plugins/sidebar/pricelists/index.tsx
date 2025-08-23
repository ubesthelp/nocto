
import { CurrencyDollar } from "@medusajs/icons"
import { ErrorBoundary } from "../../../components/utilities/error-boundary"
import { t } from "i18next"
import { UIMatch } from "react-router-dom"
import { HttpTypes } from "@medusajs/types"
import { RouteEntry } from "@rsc-labs/nocto-plugin-system"

export const sidebarPriceLists = {
  id: "@price-lists",
  sidebar: {
    path: "/price-lists",
    label: "价格列表",
    icon: CurrencyDollar,
  },
  routes: (): RouteEntry[] => [
    {
      path: "/price-lists",
      layout: "main",
      errorElement: <ErrorBoundary />,
      handle: {
        breadcrumb: () => t("priceLists.domain"),
      },
      children: [
        {
          path: "",
          layout: "main",
          lazy: () => import("../../../routes/price-lists/price-list-list"),
          children: [
            {
              path: "create",
              layout: "main",
              lazy: () => import("../../../routes/price-lists/price-list-create"),
            },
          ],
        },
        {
          path: ":id",
          layout: "main",
          lazy: async () => {
            const { Component, Breadcrumb, loader } = await import(
              "../../../routes/price-lists/price-list-detail"
            )
            return {
              Component,
              loader,
              handle: {
                breadcrumb: (
                  match: UIMatch<HttpTypes.AdminPriceListResponse>
                ) => <Breadcrumb {...match} />,
              },
            }
          },
          children: [
            {
              path: "edit",
              layout: "main",
              lazy: () => import("../../../routes/price-lists/price-list-edit"),
            },
            {
              path: "configuration",
              layout: "main",
              lazy: () => import("../../../routes/price-lists/price-list-configuration"),
            },
            {
              path: "products/add",
              layout: "main",
              lazy: () => import("../../../routes/price-lists/price-list-prices-add"),
            },
            {
              path: "products/edit",
              layout: "main",
              lazy: () => import("../../../routes/price-lists/price-list-prices-edit"),
            },
          ],
        },
      ],
    }
  ]
}