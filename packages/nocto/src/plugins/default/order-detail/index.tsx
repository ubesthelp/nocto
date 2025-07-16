import { UIMatch } from "react-router-dom"
import { HttpTypes } from "@medusajs/types"
import { RouteEntry } from "@rsc-labs/nocto-plugin-system"

export const orderDetail = {
  id: "@order-detail",
  routes: (): RouteEntry[] => [
    {
      path: "/orders/:id",
      layout: "main",
      lazy: async () => {
        const { Component, Breadcrumb, loader } = await import(
          "../../../routes/orders/order-detail"
        )

        return {
          Component,
          loader,
          handle: {
            breadcrumb: (
              match: UIMatch<HttpTypes.AdminOrderResponse>
            ) => <Breadcrumb {...match} />,
          },
        }
      },
      children: [
        {
          path: "fulfillment",
          layout: "main",
          lazy: () =>
            import("../../../routes/orders/order-create-fulfillment"),
        },
        {
          path: "returns/:return_id/receive",
          layout: "main",
          lazy: () =>
            import("../../../routes/orders/order-receive-return"),
        },
        {
          path: "allocate-items",
          layout: "main",
          lazy: () =>
            import("../../../routes/orders/order-allocate-items"),
        },
        {
          path: ":f_id/create-shipment",
          layout: "main",
          lazy: () =>
            import("../../../routes/orders/order-create-shipment"),
        },
        {
          path: "returns",
          layout: "main",
          lazy: () =>
            import("../../../routes/orders/order-create-return"),
        },
        {
          path: "claims",
          layout: "main",
          lazy: () =>
            import("../../../routes/orders/order-create-claim"),
        },
        {
          path: "exchanges",
          layout: "main",
          lazy: () =>
            import("../../../routes/orders/order-create-exchange"),
        },
        {
          path: "edits",
          layout: "main",
          lazy: () =>
            import("../../../routes/orders/order-create-edit"),
        },
        {
          path: "refund",
          layout: "main",
          lazy: () =>
            import("../../../routes/orders/order-create-refund"),
        },
        {
          path: "transfer",
          layout: "main",
          lazy: () =>
            import("../../../routes/orders/order-request-transfer"),
        },
        {
          path: "email",
          layout: "main",
          lazy: () =>
            import("../../../routes/orders/order-edit-email"),
        },
        {
          path: "shipping-address",
          layout: "main",
          lazy: () =>
            import(
              "../../../routes/orders/order-edit-shipping-address"
            ),
        },
        {
          path: "billing-address",
          layout: "main",
          lazy: () =>
            import(
              "../../../routes/orders/order-edit-billing-address"
            ),
        },
        {
          path: "metadata/edit",
          layout: "main",
          lazy: () => import("../../../routes/orders/order-metadata"),
        },
      ],
    },
  ]
}