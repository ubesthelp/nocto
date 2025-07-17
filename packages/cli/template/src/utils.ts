/// <reference types="vite/client" />

import { SidebarRegistry, PluginConfigRegistry, RouteRegistry, NoctoConfig, SlotRegistry } from "@rsc-labs/nocto-plugin-system"

export async function loadMyNoctoPlugins(noctoConfig: NoctoConfig) {

  SidebarRegistry.setConfig(noctoConfig.sidebar)

  const modules = {
    ...import.meta.glob("./plugins/**/index.ts", { eager: false }),
    ...import.meta.glob("./plugins/**/index.tsx", { eager: false }),
  }
  for (const path in modules) {
    const mod = await modules[path]() as any

    for (const key in mod) {
      const plugin = mod[key]
      if (noctoConfig.plugins[plugin.id] || noctoConfig.sidebar[plugin.id]) {
        if (plugin.configSchema) {
          const userConfig = noctoConfig.plugins?.[plugin.id]?.config ?? {}
          PluginConfigRegistry.register(plugin.id, plugin.configSchema, userConfig)
        }

        if (typeof plugin.routes === "function") {
          const routes = plugin.routes()
          RouteRegistry.register(plugin.id, routes)
        }

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
}