import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["./src/main.tsx"],
  format: ["cjs", "esm"],
  tsconfig: "tsconfig.build.json",
  clean: true,
})