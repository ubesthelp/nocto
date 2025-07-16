import { NoctoSlot } from "@rsc-labs/nocto-plugin-system"
import { SingleColumnPage } from "../../../components/layout/pages"
import { useExtension } from "../../../providers/extension-provider"
import { CollectionListTable } from "./components/collection-list-table"

export const CollectionList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("product_collection.list.after"),
        before: getWidgets("product_collection.list.before"),
      }}
    >
      <NoctoSlot pluginId="@collections" name="main" fallback={<CollectionListTable />}/>
    </SingleColumnPage>
  )
}
