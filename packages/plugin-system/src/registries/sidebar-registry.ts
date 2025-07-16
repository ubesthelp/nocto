type SidebarPlugin = {
  id: string,
  sidebar: SidebarItem
}

export type SidebarItem = {
  path: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  permissions?: string[]
  items?: SidebarItem[]
}

type FinalSidebarItem = {
  id: string
  path: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  order: number
  items?: SidebarItem[]
}

type SidebarConfigMap = Record<string, { order?: number; hidden?: boolean }>

const items = new Map<string, SidebarItem>()

class SidebarRegistryClass {
  private sidebarConfig: SidebarConfigMap = {}

  setConfig(config: SidebarConfigMap) {
    this.sidebarConfig = config
  }

  register(plugin: SidebarPlugin) {
    items.set(plugin.id, plugin.sidebar)
  }

  getAll(): FinalSidebarItem[] {
    return Array.from(items.entries())
      .filter(([id]) => this.sidebarConfig.hasOwnProperty(id))
      .map(([id, meta]) => {
        const cfg = this.sidebarConfig[id] ?? {}
        return {
          id,
          path: meta.path,
          icon: meta.icon,
          label: meta.label,
          items: meta.items,
          order: cfg.order ?? 100,
        }
      })
  }
  getSorted(): FinalSidebarItem[] {
    return this.getAll()
      .sort((a, b) => a.order - b.order)
  }
}

export const SidebarRegistry = new SidebarRegistryClass()
