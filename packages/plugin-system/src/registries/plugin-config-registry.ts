import { z } from "zod"

type ConfigMap = Map<string, any>

class PluginConfigReg {
  private configs: ConfigMap = new Map()

  register<T>(pluginId: string, schema: z.ZodType<T>, rawConfig: Record<string, any>): T {

    const parsed = schema.parse(rawConfig)

    this.configs.set(pluginId, parsed)
    return parsed
  }

  get<T>(pluginId: string): T | undefined {
    return this.configs.get(pluginId)
  }
}

export const PluginConfigRegistry = new PluginConfigReg()
