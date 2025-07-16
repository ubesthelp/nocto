import { NoctoSlot } from "@rsc-labs/nocto-plugin-system"
import { SingleColumnPage } from "../../../components/layout/pages"
import { useExtension } from "../../../providers/extension-provider"
import { CategoryListTable } from "./components/category-list-table"

export const CategoryList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("product_category.list.after"),
        before: getWidgets("product_category.list.before"),
      }}
      hasOutlet
    >
      <NoctoSlot pluginId="@categories" name="main" fallback={<CategoryListTable />}/>
    </SingleColumnPage>
  )
}
