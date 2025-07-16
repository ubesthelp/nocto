import { OrderListTable } from "./components/order-list-table"

import { SingleColumnPage } from "../../../components/layout/pages"
import { useExtension } from "../../../providers/extension-provider"
import { NoctoSlot } from "@rsc-labs/nocto-plugin-system"

export const OrderList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("order.list.after"),
        before: getWidgets("order.list.before"),
      }}
      hasOutlet={false}
    >
      <NoctoSlot pluginId="@orders" name="main" fallback={<OrderListTable />}/>
    </SingleColumnPage>
  )
}
