// / <reference types="vite/types/importMeta.d.ts" />
import React from "react"
import { useNoctoPluginContext } from "../providers/nocto-context";

type NoctoSlotProps = {
  pluginId: string,
  name: string
  runtimeProps?: Record<string, any>,
  fallback?: React.ReactNode
}

const Note = ({ text, children } : { text: string, children: any}) => {
  return (
    <div className="relative w-full mb-4">
      <div className="absolute left-4 -top-3 px-2 text-sm font-medium z-10
                      border-t border-l border-r rounded-t-md
                      bg-white dark:bg-gray-900
                      text-gray-800 dark:text-gray-100">
        {text}
      </div>
      <div className="border rounded-md pt-4 border-gray-300 dark:border-gray-700">
        {children}
      </div>
    </div>
  );
};

export const NoctoSlot = ({ pluginId, name, runtimeProps = {}, fallback = null }: NoctoSlotProps) => {

  const showSlots = import.meta.env.VITE_NOCTO_SHOW_SLOTS;

  const { slotsRegistry } = useNoctoPluginContext()

  const before = slotsRegistry.get(pluginId, `${name}.before`)
  const main = slotsRegistry.get(pluginId, name)
  const after = slotsRegistry.get(pluginId, `${name}.after`)

  const hasMain = main.length > 0

  return (
    <>
      {before.map(({ component: Component, staticProps }, i) => (
        <Component key={`before-${i}`} {...staticProps} {...runtimeProps} />
      ))}

      {hasMain
        ? main.map(({ component: Component, staticProps }, i) => (
            <Component key={`main-${i}`} {...staticProps} {...runtimeProps} />
          ))
        : (showSlots ? <Note text={`Plugin: ${pluginId}, slot name: ${name}`}>
          {fallback}</Note> : fallback)}

      {after.map(({ component: Component, staticProps }, i) => (
        <Component key={`after-${i}`} {...staticProps} {...runtimeProps} />
      ))}
    </>
  )
}
