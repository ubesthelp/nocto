import { RouteEntry } from "@rsc-labs/nocto-plugin-system"
import { ErrorBoundary } from "../../../components/utilities/error-boundary"
import { t } from "i18next"
import { UIMatch } from "react-router-dom"
import { HttpTypes } from "@medusajs/types"

export const collectionsRoutes = {
  id: "@collections",
  routes: (): RouteEntry[] => [
    {
    path: "/collections",
    layout: "main",
    errorElement: <ErrorBoundary />,
    handle: {
      breadcrumb: () => t("collections.domain"),
    },
    children: [
      {
        path: "",
        layout: "main",
        lazy: () =>
          import("../../../routes/collections/collection-list"),
        children: [
          {
            path: "create",
            layout: "main",
            lazy: () =>
              import("../../../routes/collections/collection-create"),
          },
        ],
      },
      {
        path: ":id",
        layout: "main",
        lazy: async () => {
          const { Component, Breadcrumb, loader } = await import(
            "../../../routes/collections/collection-detail"
          )

          return {
            Component,
            loader,
            handle: {
              breadcrumb: (
                match: UIMatch<HttpTypes.AdminCollectionResponse>
              ) => <Breadcrumb {...match} />,
            },
          }
        },
        children: [
          {
            path: "edit",
            layout: "main",
            lazy: () =>
              import("../../../routes/collections/collection-edit"),
          },
          {
            path: "products",
            layout: "main",
            lazy: () =>
              import(
                "../../../routes/collections/collection-add-products"
              ),
          },
          {
            path: "metadata/edit",
            layout: "main",
            lazy: () =>
              import("../../../routes/collections/collection-metadata"),
          },
        ],
      },
    ],
  }
]
}