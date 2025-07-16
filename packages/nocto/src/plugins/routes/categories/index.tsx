import { RouteEntry } from "@rsc-labs/nocto-plugin-system"
import { ErrorBoundary } from "../../../components/utilities/error-boundary"
import { t } from "i18next"
import { UIMatch } from "react-router-dom"
import { HttpTypes } from "@medusajs/types"

export const categoriesRoutes = {
  id: "@categories",
  routes: (): RouteEntry[] => [
    {
    path: "/categories",
    layout: "main",
    errorElement: <ErrorBoundary />,
    handle: {
      breadcrumb: () => t("categories.domain"),
    },
    children: [
      {
        path: "",
        layout: "main",
        lazy: () => import("../../../routes/categories/category-list"),
        children: [
          {
            path: "create",
            layout: "main",
            lazy: () =>
              import("../../../routes/categories/category-create"),
          },
          {
            path: "organize",
            layout: "main",
            lazy: () =>
              import("../../../routes/categories/category-organize"),
          },
        ],
      },
      {
        path: ":id",
        layout: "main",
        lazy: async () => {
          const { Component, Breadcrumb, loader } = await import(
            "../../../routes/categories/category-detail"
          )

          return {
            Component,
            loader,
            handle: {
              breadcrumb: (
                match: UIMatch<HttpTypes.AdminProductCategoryResponse>
              ) => <Breadcrumb {...match} />,
            },
          }
        },
        children: [
          {
            path: "edit",
            layout: "main",
            lazy: () =>
              import("../../../routes/categories/category-edit"),
          },
          {
            path: "products",
            layout: "main",
            lazy: () =>
              import("../../../routes/categories/category-products"),
          },
          {
            path: "organize",
            layout: "main",
            lazy: () =>
              import("../../../routes/categories/category-organize"),
          },
          {
            path: "metadata/edit",
            layout: "main",
            lazy: () =>
              import("../../../routes/categories/categories-metadata"),
          },
        ],
      },
    ],
  }
]
}