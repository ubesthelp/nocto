import { NoctoConfig } from "@rsc-labs/nocto-plugin-system"
import {
  Sparkles,
} from "@medusajs/icons"

export const noctoConfig: NoctoConfig = {
  plugins: {
    "@login": {
      config: {
        title: "Welcome to Nocto",
        hint: "Sign in to access",
        mainIcon: Sparkles
      }
    },
    "@orders": {},
    "@order-detail": {},
    "@campaigns-routes": {},
    "@categories-routes": {},
    "@collections-routes": {},
    "@core-routes": {},
    "@customer-groups-routes": {},
    "@public-routes": {},
    "@reservations-routes": {},
    "@settings-routes": {}
  },
  sidebar: {
    "@orders": { order: 1 },
    "@products": { order: 2 },
    "@inventory": { order: 3 },
    "@customers": { order: 4 },
    "@promotions": { order: 5 },
    "@price-lists": { order: 6 },
  }
}
