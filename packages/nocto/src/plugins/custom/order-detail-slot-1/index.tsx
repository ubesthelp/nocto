import { ConfigSchema } from "./plugin";

export const myPlugin = {
  id: "@my-plugin",
  configSchema: ConfigSchema,
  routes: () => [
    {
      path: "/my-plugin",
      layout: "main",
      lazy: () =>
        import("./plugin").then((mod) => ({
          Component: () => mod.default(),
        })),
    },
  ],
}
