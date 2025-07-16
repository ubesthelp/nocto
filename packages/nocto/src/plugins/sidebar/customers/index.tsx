import { Users } from "@medusajs/icons"
import { RouteEntry } from "@rsc-labs/nocto-plugin-system"
import { ErrorBoundary } from "../../../components/utilities/error-boundary"
import { t } from "i18next"
import { UIMatch } from "react-router-dom"
import { HttpTypes } from "@medusajs/types"

export const sidebarCustomers = {
  id: "@customers",
  sidebar: {
    path: "/customers",
    label: "Customers",
    icon: Users,
    items: [
      {
        path: "/customer-groups",
        label: "Customer groups",
      }
    ],
  },
  routes: (): RouteEntry[] => [
      {
      path: "/customers",
      layout: "main",
      errorElement: <ErrorBoundary />,
      handle: {
        breadcrumb: () => t("customers.domain"),
      },
      children: [
        {
          path: "",
          layout: "main",
          lazy: () => import("../../../routes/customers/customer-list"),
          children: [
            {
              path: "create",
              layout: "main",
              lazy: () =>
                import("../../../routes/customers/customer-create"),
            },
          ],
        },
        {
          path: ":id",
          layout: "main",
          lazy: async () => {
            const { Component, Breadcrumb, loader } = await import(
              "../../../routes/customers/customer-detail"
            )

            return {
              Component,
              loader,
              handle: {
                breadcrumb: (
                  match: UIMatch<HttpTypes.AdminCustomerResponse>
                ) => <Breadcrumb {...match} />,
              },
            }
          },
          children: [
            {
              path: "edit",
              layout: "main",
              lazy: () =>
                import("../../../routes/customers/customer-edit"),
            },
            {
              path: "create-address",
              layout: "main",
              lazy: () =>
                import(
                  "../../../routes/customers/customer-create-address"
                ),
            },
            {
              path: "add-customer-groups",
              layout: "main",
              lazy: () =>
                import(
                  "../../../routes/customers/customers-add-customer-group"
                ),
            },
            {
              path: ":order_id/transfer",
              layout: "main",
              lazy: () =>
                import("../../../routes/orders/order-request-transfer"),
            },
            {
              path: "metadata/edit",
              layout: "main",
              lazy: () =>
                import("../../../routes/customers/customer-metadata"),
            },
          ]
        }
      ],
    }
  ]
}