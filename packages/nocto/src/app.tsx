import { DashboardApp } from "./dashboard-app"
import { DashboardPlugin } from "./dashboard-app/types"
import { NoctoConfig, NoctoPluginProvider, NoctoRbacProvider } from "@rsc-labs/nocto-plugin-system"
import { loadBuiltInPlugins } from "./plugin-system/load-plugins"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/query-client"
import { useMe } from "./hooks/api"

interface AppProps {
  plugins?: DashboardPlugin[]
  noctoConfig?: NoctoConfig,
  rbac?: {
    fetchPermissions: any,
    evaluateAccess: any
  }
}

function Dashboard({ plugins = []}: AppProps) {
  const app = new DashboardApp({
    plugins: [...plugins],
  })

  return (<div>{app.render()}</div>
  )
}

function AppUser({ plugins = [], rbac}: AppProps) {
  const { user, isLoading } = useMe();

  return (
    <NoctoRbacProvider user={user} isLoading={isLoading} fetchPermissions={rbac?.fetchPermissions} evaluateAccess={rbac?.evaluateAccess}>
      <NoctoPluginProvider>
        <Dashboard plugins={plugins} />
      </NoctoPluginProvider>
    </NoctoRbacProvider>
  );
}


function App({ plugins = [], noctoConfig, rbac }: AppProps) {

  if (noctoConfig) loadBuiltInPlugins(noctoConfig)

  return (
    <QueryClientProvider client={queryClient}>
      <AppUser plugins={plugins} rbac={rbac}/>
    </QueryClientProvider>
  )

}

export default App
