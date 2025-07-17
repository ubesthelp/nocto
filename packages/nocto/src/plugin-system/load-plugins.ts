/// <reference types="vite/client" />

import { SidebarRegistry, RouteRegistry, NoctoConfig, SlotRegistry, PluginConfigRegistry } from "@rsc-labs/nocto-plugin-system"
import { defaultPlugins } from "../plugins/plugins"

export function loadBuiltInPlugins(noctoConfig: NoctoConfig) {

  SidebarRegistry.setConfig(noctoConfig.sidebar)

  for (const plugin of defaultPlugins) {
    if (!plugin?.id) continue

    if (noctoConfig.plugins[plugin.id] || noctoConfig.sidebar[plugin.id]) {
      // Load config if schema exists
      if (plugin.configSchema) {
        const userConfig = noctoConfig.plugins?.[plugin.id]?.config ?? {}
        PluginConfigRegistry.register(plugin.id, plugin.configSchema, userConfig)
      }

      // Register routes if defined
      if (typeof plugin.routes === "function") {
        const routes = plugin.routes()
        RouteRegistry.register(plugin.id, routes)
      }

      // Register sidebar if defined
      if (plugin.sidebar) {
        SidebarRegistry.register(plugin as unknown as any)
      }
      if (plugin.injections) {
        plugin.injections().forEach((c: any) => {
          if (SlotRegistry.get(c.pluginId, c.slot).length) {
            return;
          }
          SlotRegistry.register({ ...c })
        })
      }
    }
  }
}