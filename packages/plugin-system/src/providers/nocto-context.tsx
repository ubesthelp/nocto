import React, { createContext, useContext } from "react"
import { PluginConfigRegistry } from "./../registries/plugin-config-registry"
import { SidebarRegistry } from "../registries/sidebar-registry"
import { RouteRegistry } from "../registries/route-registry"
import { SlotRegistry } from "../registries/slot-registry"

type NoctoPluginContextType = {
  pluginConfigRegistry: typeof PluginConfigRegistry
  sidebarItems: ReturnType<typeof SidebarRegistry.getSorted>
  routes: ReturnType<typeof RouteRegistry.getAll>
  routesPlugins: string[]
  slotsRegistry: typeof SlotRegistry,
}

const NoctoPluginContext = createContext<NoctoPluginContextType | undefined>(undefined)

export const NoctoPluginProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const sidebarItems = SidebarRegistry.getSorted()
  const routes = RouteRegistry.getAll()
  const routesPlugins = RouteRegistry.getPluginsIds()

  return (
    <NoctoPluginContext.Provider value={{ pluginConfigRegistry: PluginConfigRegistry, sidebarItems, routes, slotsRegistry: SlotRegistry, routesPlugins: routesPlugins }}>
      {children}
    </NoctoPluginContext.Provider>
  )
}

export const useNoctoPluginContext = () => {
  const ctx = useContext(NoctoPluginContext)
  if (!ctx) {
    throw new Error("usePluginContext must be used within <PluginProvider>")
  }
  return ctx
}
