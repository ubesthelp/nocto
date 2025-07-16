import { ConfigSchema } from "./plugin"

export const loginPlugin = {
  id: "@login",
  configSchema: ConfigSchema,
  routes: () => [
    {
      path: "/login",
      layout: "auth",
      lazy: () =>
        import("./plugin").then((mod) => ({
          Component: () => mod.default(),
        })),
    },
  ],
}
