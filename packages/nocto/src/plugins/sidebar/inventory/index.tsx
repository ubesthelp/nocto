import { Buildings } from "@medusajs/icons"
import { RouteEntry } from "@rsc-labs/nocto-plugin-system"
import { ErrorBoundary } from "../../../components/utilities/error-boundary"
import { t } from "i18next"
import { UIMatch } from "react-router-dom"
import { HttpTypes } from "@medusajs/types"

export const sidebarInventory = {
  id: "@inventory",
  sidebar: {
    path: "/inventory",
    label: "Inventory",
    icon: Buildings,
    items: [
      {
        path: "/reservations",
        label: "Reservations",
      }
    ],
  },
  routes: (): RouteEntry[] => [
    {
      path: "/inventory",
      layout: "main",
      errorElement: <ErrorBoundary />,
      handle: {
        breadcrumb: () => t("inventory.domain"),
      },
      children: [
        {
          path: "",
          layout: "main",
          lazy: () => import("../../../routes/inventory/inventory-list"),
          children: [
            {
              path: "create",
              layout: "main",
              lazy: () =>
                import("../../../routes/inventory/inventory-create"),
            },
            {
              path: "stock",
              layout: "main",
              lazy: () =>
                import("../../../routes/inventory/inventory-stock"),
            },
          ],
        },
        {
          path: ":id",
          layout: "main",
          lazy: async () => {
            const { Component, Breadcrumb, loader } = await import(
              "../../../routes/inventory/inventory-detail"
            )

            return {
              Component,
              loader,
              handle: {
                breadcrumb: (
                  match: UIMatch<HttpTypes.AdminInventoryItemResponse>
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
                  "../../../routes/inventory/inventory-detail/components/edit-inventory-item"
                ),
            },
            {
              path: "attributes",
              layout: "main",
              lazy: () =>
                import(
                  "../../../routes/inventory/inventory-detail/components/edit-inventory-item-attributes"
                ),
            },
            {
              path: "metadata/edit",
              layout: "main",
              lazy: () =>
                import("../../../routes/inventory/inventory-metadata"),
            },
            {
              path: "locations",
              layout: "main",
              lazy: () =>
                import(
                  "../../../routes/inventory/inventory-detail/components/manage-locations"
                ),
            },
            {
              path: "locations/:location_id",
              layout: "main",
              lazy: () =>
                import(
                  "../../../routes/inventory/inventory-detail/components/adjust-inventory"
                ),
            },
          ],
        },
      ],
    }
  ]
}