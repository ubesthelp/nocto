
import React, { createContext, useContext, useMemo } from "react"
import { RbacSlotRegistry, SlotRegistry } from "../registries/slot-registry"
import { useNoctoRbac } from "./nocto-rbac-context"
import { PluginConfigRegistry } from "../registries/plugin-config-registry"
import { SidebarRegistry } from "../registries/sidebar-registry"
import { RouteEntry, RouteRegistry } from "../registries/route-registry"

type NoctoPluginContextType = {
  pluginConfigRegistry: typeof PluginConfigRegistry
  sidebarItems: ReturnType<typeof SidebarRegistry.getSorted>
  routes: ReturnType<typeof RouteRegistry.getAll>
  routesPlugins: string[]
  slotsRegistry: RbacSlotRegistry,
}

const NoctoPluginContext = createContext<NoctoPluginContextType | undefined>(undefined)

export const NoctoPluginProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const { checkAccess, isReady } = useNoctoRbac()

  const [sidebarItems, setSidebarItems] = React.useState<ReturnType<typeof SidebarRegistry.getSorted>>([])
  const [accessibleRoutes, setAccessibleRoutes] = React.useState<RouteEntry[]>([])

  React.useEffect(() => {
    if (!isReady) return;
    const allSidebarItems = SidebarRegistry.getSorted()
    const filtered = allSidebarItems.filter(item => checkAccess({
      pluginId: item.id
    }))

    setSidebarItems(filtered)

    const routesMap = RouteRegistry.getMap()
    const filteredRoutesMap = new Map<string, RouteEntry[]>(
      Array.from(routesMap.entries())
        .filter(([pluginId, _]) => checkAccess({ pluginId }))
    )
    setAccessibleRoutes(Array.from(filteredRoutesMap.values()).flat())

  }, [checkAccess, isReady])

  const rbacSlotRegistry: RbacSlotRegistry = useMemo(() => {
    return {
      register(contribution) {
        return SlotRegistry.register(contribution)
      },
      get(pluginId, slot) {
        if (!checkAccess({ pluginId })) {
          return []
        } else {
          return SlotRegistry.get(pluginId, slot).filter(c => checkAccess({pluginId: c.injectedPluginId}))
        }
      },
      getAll() {
        return SlotRegistry.getAll().filter(c =>
          checkAccess({ pluginId: c.pluginId })
        )
      }
    }
  }, [checkAccess])

  if (!rbacSlotRegistry) return null

  const routesPlugins = RouteRegistry.getPluginsIds()

  return (
    <NoctoPluginContext.Provider value={{ 
      pluginConfigRegistry: PluginConfigRegistry, 
      sidebarItems: sidebarItems, 
      routes: accessibleRoutes, 
      slotsRegistry: rbacSlotRegistry, 
      routesPlugins: routesPlugins,
    }}>
      {children}
    </NoctoPluginContext.Provider>
  )
}

export const useNoctoPluginContext = () => {
  const ctx = useContext(NoctoPluginContext)
  if (!ctx) {
    throw new Error("useNoctoPluginContext must be used within <NoctoPluginProvider>")
  }
  return ctx
}