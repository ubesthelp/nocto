type SlotContribution = {
  pluginId: string
  slot: string
  component: React.ComponentType<any>
  staticProps?: Record<string, any>
}

class SlotRegistryClass {
  private slots: SlotContribution[] = []

  register(contribution: SlotContribution) {
    this.slots.push(contribution)
  }

  get(pluginId: string, slot: string): SlotContribution[] {
    return this.slots.filter((c) => c.pluginId === pluginId && c.slot === slot )
  }

  getAll(): SlotContribution[] {
    return this.slots
  }
}

export const SlotRegistry = new SlotRegistryClass()
