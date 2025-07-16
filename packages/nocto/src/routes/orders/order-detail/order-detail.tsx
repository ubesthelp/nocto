import { useLoaderData, useParams } from "react-router-dom"

import { TwoColumnPageSkeleton } from "../../../components/common/skeleton"
import { TwoColumnPage } from "../../../components/layout/pages"
import { useOrder, useOrderPreview } from "../../../hooks/api/orders"
import { usePlugins } from "../../../hooks/api/plugins"
import { useExtension } from "../../../providers/extension-provider"
import { ActiveOrderClaimSection } from "./components/active-order-claim-section"
import { ActiveOrderExchangeSection } from "./components/active-order-exchange-section"
import { ActiveOrderReturnSection } from "./components/active-order-return-section"
import { OrderActiveEditSection } from "./components/order-active-edit-section"
import { OrderActivitySection } from "./components/order-activity-section"
import { OrderCustomerSection } from "./components/order-customer-section"
import { OrderFulfillmentSection } from "./components/order-fulfillment-section"
import { OrderGeneralSection } from "./components/order-general-section"
import { OrderPaymentSection } from "./components/order-payment-section"
import { OrderSummarySection } from "./components/order-summary-section"
import { DEFAULT_FIELDS } from "./constants"
import { orderLoader } from "./loader"
import { NoctoSlot } from "@rsc-labs/nocto-plugin-system"

export const OrderDetail = () => {
  const initialData = useLoaderData() as Awaited<ReturnType<typeof orderLoader>>

  const { id } = useParams()
  const { getWidgets } = useExtension()
  const { plugins = [] } = usePlugins()

  const { order, isLoading, isError, error } = useOrder(
    id!,
    {
      fields: DEFAULT_FIELDS,
    },
    {
      initialData,
    }
  )

  // TODO: Retrieve endpoints don't have an order ability, so a JS sort until this is available
  if (order) {
    order.items = order.items.sort((itemA, itemB) => {
      if (itemA.created_at > itemB.created_at) {
        return 1
      }

      if (itemA.created_at < itemB.created_at) {
        return -1
      }

      return 0
    })
  }

  const { order: orderPreview, isLoading: isPreviewLoading } = useOrderPreview(
    id!
  )

  if (isLoading || !order || isPreviewLoading) {
    return (
      <TwoColumnPageSkeleton mainSections={4} sidebarSections={2} showJSON />
    )
  }

  if (isError) {
    throw error
  }

  return (
    <TwoColumnPage
      widgets={{
        after: getWidgets("order.details.after"),
        before: getWidgets("order.details.before"),
        sideAfter: getWidgets("order.details.side.after"),
        sideBefore: getWidgets("order.details.side.before"),
      }}
      data={order}
      showJSON
      showMetadata
      hasOutlet
    >
      <TwoColumnPage.Main>
        <NoctoSlot pluginId="@order-detail" name="activeEdit" runtimeProps={{ order, orderPreview }} fallback={<OrderActiveEditSection order={order} />}/>
        <NoctoSlot pluginId="@order-detail" name="activeOrderClaim" runtimeProps={{ order, orderPreview }} fallback={<ActiveOrderClaimSection orderPreview={orderPreview!} />}/>
        <NoctoSlot pluginId="@order-detail" name="activeOrderExchange" runtimeProps={{ order, orderPreview }} fallback={<ActiveOrderExchangeSection orderPreview={orderPreview!} />}/>
        <NoctoSlot pluginId="@order-detail" name="activeOrderReturn" runtimeProps={{ order, orderPreview }} fallback={<ActiveOrderReturnSection orderPreview={orderPreview!} />}/>
        <NoctoSlot pluginId="@order-detail" name="general" runtimeProps={{ order, orderPreview }} fallback={<OrderGeneralSection order={order}/>}/>
        <NoctoSlot pluginId="@order-detail" name="summary" runtimeProps={{ order, orderPreview }} fallback={<OrderSummarySection order={order} plugins={plugins}/>}/>
        <NoctoSlot pluginId="@order-detail" name="payment" runtimeProps={{ order, orderPreview }} fallback={<OrderPaymentSection order={order} plugins={plugins}/>}/>
        <NoctoSlot pluginId="@order-detail" name="fulfillment" runtimeProps={{ order, orderPreview }} fallback={<OrderFulfillmentSection order={order}/>}/>
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <NoctoSlot pluginId="@order-detail" name="customerSection" runtimeProps={{ order, orderPreview }} fallback={ <OrderCustomerSection order={order} />}/>
        <NoctoSlot pluginId="@order-detail" name="activitySection" runtimeProps={{ order, orderPreview }} fallback={ <OrderActivitySection order={order} />}/>
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  )
}
