import RbacSlot from "./plugin";

export const customInjection = {
  id: "@custom-injection",
  injections: () => [
    {
      pluginId: "@products",
      slot: "main.before",
      component: RbacSlot
    }
  ]
}
