import { defineConfig } from "tsup"
import fs from 'fs'

export default defineConfig({
  entry: ["./src/app.tsx"],
  format: ["cjs", "esm"],
  external: [
    "virtual:medusa/forms",
    "virtual:medusa/displays",
    "virtual:medusa/routes",
    "virtual:medusa/links",
    "virtual:medusa/menu-items",
    "virtual:medusa/widgets",
  ],
  tsconfig: "tsconfig.build.json",
  onSuccess: () => {
    fs.copyFileSync('src/index.css', 'dist/index.css')
  },
  clean: true,
})