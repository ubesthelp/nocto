import { NoctoSlot } from "@rsc-labs/nocto-plugin-system"
import { SingleColumnPage } from "../../../components/layout/pages"
import { useExtension } from "../../../providers/extension-provider"
import { PromotionListTable } from "./components/promotion-list-table"

export const PromotionsList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        before: getWidgets("promotion.list.before"),
        after: getWidgets("promotion.list.after"),
      }}
    >
      <NoctoSlot pluginId="@promotions" name="main" fallback={<PromotionListTable />}/>
    </SingleColumnPage>
  )
}
