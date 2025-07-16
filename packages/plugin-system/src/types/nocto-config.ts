export type NoctoPluginConfigEntry = {
  config?: Record<string, any>
}

export type NoctoSidebarEntry = {
  order: number
}

export type NoctoConfig = {
  plugins: Record<string, NoctoPluginConfigEntry>
  sidebar: Record<string, NoctoSidebarEntry>
}