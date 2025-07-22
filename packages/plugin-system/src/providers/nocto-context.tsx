
import React, { createContext, useContext, useMemo } from "react"
import { RbacSlotRegistry, SlotRegistry } from "../registries/slot-registry"
import { useNoctoRbac } from "./nocto-rbac-context"
import { PluginConfigRegistry } from "../registries/plugin-config-registry"
import { SidebarRegistry } from "../registries/sidebar-registry"
import { RouteRegistry } from "../registries/route-registry"

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

  const checkAccess = useNoctoRbac()

  const [sidebarItems, setSidebarItems] = React.useState<ReturnType<typeof SidebarRegistry.getSorted>>([])

  React.useEffect(() => {
    const allSidebarItems = SidebarRegistry.getSorted()
    const filtered = allSidebarItems.filter(item => checkAccess({
      pluginId: item.id
    }))

    setSidebarItems(filtered)
  }, [checkAccess])

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
 
  const routes = RouteRegistry.getAll()
  const routesPlugins = RouteRegistry.getPluginsIds()

  return (
    <NoctoPluginContext.Provider value={{ 
      pluginConfigRegistry: PluginConfigRegistry, 
      sidebarItems: sidebarItems, 
      routes, 
      slotsRegistry: rbacSlotRegistry, 
      routesPlugins: routesPlugins 
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
