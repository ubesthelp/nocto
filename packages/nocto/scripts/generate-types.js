/**
 * This script generates a minimal `dist/index.d.ts` for public API consumption.
 * It avoids full type generation to prevent TS4023 and other internal typing issues.
 */

const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "../dist");
const filePath = path.join(distDir, "index.d.ts");

const fileContent = `
  declare function App(props: {
    plugins?: any[],
    noctoConfig?: any,
    rbac?: {
      fetchPermissions: any,
      evaluateAccess: any
    }
  }): JSX.Element;

  export default App;
`;

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(filePath, fileContent.trim(), "utf8");

console.log(`Custom type file created at ${filePath}`);
