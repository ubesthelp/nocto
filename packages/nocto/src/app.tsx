import { DashboardApp } from "./dashboard-app"
import { DashboardPlugin } from "./dashboard-app/types"
import { NoctoConfig, NoctoPluginProvider } from "@rsc-labs/nocto-plugin-system"

import { loadBuiltInPlugins } from "./plugin-system/load-plugins"

interface AppProps {
  plugins?: DashboardPlugin[]
  noctoConfig?: NoctoConfig
}

function Dashboard({ plugins = []}: AppProps) {
  const app = new DashboardApp({
    plugins: [...plugins],
  })

  return (<div>{app.render()}</div>
  )
}

function App({ plugins = [], noctoConfig }: AppProps) {

  if (noctoConfig) loadBuiltInPlugins(noctoConfig)

  return (
    <div>
      <NoctoPluginProvider>
        <Dashboard plugins={plugins}/>
      </NoctoPluginProvider>
    </div>
  )

}

export default App
