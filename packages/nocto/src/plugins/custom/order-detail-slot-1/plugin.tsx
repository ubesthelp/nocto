import { Text, Container } from "@medusajs/ui"
import { useNoctoPluginContext } from "@rsc-labs/nocto-plugin-system";
import * as z from "zod"

export const ConfigSchema = z.object({
  text: z.string().default("Your custom plugin in a slot 1"),
})

type ConfigData = z.infer<typeof ConfigSchema>;

export const Slot1 = () => {

  const { pluginConfigRegistry } = useNoctoPluginContext()

  const config = pluginConfigRegistry.get<ConfigData>("@my-plugin");
  

  return (
    <Container>
      <Text>{config && config.text}</Text>
    </Container>
  )
}

export default Slot1