import { RouteEntry } from "@rsc-labs/nocto-plugin-system"
import { ErrorBoundary } from "../../../components/utilities/error-boundary"
import { t } from "i18next"
import { UIMatch } from "react-router-dom"
import { HttpTypes } from "@medusajs/types"

export const customerGroupsRoutes = {
  id: "@customer-groups",
  routes: (): RouteEntry[] => [
    {
    path: "/customer-groups",
    layout: "main",
    errorElement: <ErrorBoundary />,
    handle: {
      breadcrumb: () => t("customerGroups.domain"),
    },
    children: [
      {
        path: "",
        layout: "main",
        lazy: () =>
          import("../../../routes/customer-groups/customer-group-list"),
        children: [
          {
            path: "create",
            layout: "main",
            lazy: () =>
              import(
                "../../../routes/customer-groups/customer-group-create"
              ),
          },
        ],
      },
      {
        path: ":id",
        layout: "main",
        lazy: async () => {
          const { Component, Breadcrumb, loader } = await import(
            "../../../routes/customer-groups/customer-group-detail"
          )

          return {
            Component,
            loader,
            handle: {
              breadcrumb: (
                match: UIMatch<HttpTypes.AdminCustomerGroupResponse>
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
                "../../../routes/customer-groups/customer-group-edit"
              ),
          },
          {
            path: "add-customers",
            layout: "main",
            lazy: () =>
              import(
                "../../../routes/customer-groups/customer-group-add-customers"
              ),
          },
          {
            path: "metadata/edit",
            layout: "main",
            lazy: () =>
              import(
                "../../../routes/customer-groups/customer-group-metadata"
              ),
          },
        ],
      },
    ],
  }
]
}