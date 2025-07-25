import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app.js"
import { noctoConfig } from "../nocto-config"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App noctoConfig={noctoConfig} rbac={{
        fetchPermissions: async (userId: string) => {
            const response = await fetch(`${import.meta.env.VITE_MEDUSA_ADMIN_BACKEND_URL}/admin/users/${userId}`, {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            })
            const json = await response.json()
            /*
              Example of json:
              {
                  "id": "user_01J8M9MBE14VGDPPJ5YZ3VG94S",
                  "first_name": "Admin",
                  "last_name": "Test1",
                  "email": "admin@medusa-test.com",
                  "avatar_url": null,
                  "metadata": {
                    "role": "product-manager"
                  },
                  "created_at": "2024-09-25T09:54:05.889Z",
                  "updated_at": "2025-07-18T10:27:34.615Z",
                  "deleted_at": null
              }
            */
        
          if (json.user.metadata.role === 'product-manager') {
            return new Map<string, string[]>([
              ["@customers", ["forbid"]],
              ["@orders", ["forbid"]],
              ["@price-lists", ["forbid"]],
              ["@promotions", ["forbid"]],
            ]);
          }
          return new Map<string, string[]>();
        },
        evaluateAccess: (permissions?: string[]) => {
          if (permissions?.includes("forbid") ) {
            return false;
          }
          return true;
        },
      }}/>
  </React.StrictMode>
)
