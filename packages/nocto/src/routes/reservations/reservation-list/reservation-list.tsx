import { NoctoSlot } from "@rsc-labs/nocto-plugin-system"
import { SingleColumnPage } from "../../../components/layout/pages"
import { useExtension } from "../../../providers/extension-provider"
import { ReservationListTable } from "./components/reservation-list-table"

export const ReservationList = () => {
  const { getWidgets } = useExtension()

  return (
    <SingleColumnPage
      widgets={{
        before: getWidgets("reservation.list.before"),
        after: getWidgets("reservation.list.after"),
      }}
    >
      <NoctoSlot pluginId="@reservations" name="main" fallback={<ReservationListTable />}/>
    </SingleColumnPage>
  )
}
