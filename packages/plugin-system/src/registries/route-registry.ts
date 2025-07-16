import React from "react"
import { RouteObject } from "react-router-dom"

export type RouteEntry = {
  path: string
  index?: boolean,
  layout: "main" | "auth" | "settings" | "public",
  element?: React.ReactNode,
  errorElement?: React.ReactNode
  handle?: RouteObject["handle"]
  lazy?: RouteObject["lazy"],
  Component?: RouteObject["Component"],
  loader?: RouteObject["loader"]
  children?: RouteEntry[]
}

const registeredRoutes: RouteEntry[] = []

export const RouteRegistry = {
  register(route: RouteEntry | RouteEntry[]) {
    const routes = Array.isArray(route) ? route : [route]
    registeredRoutes.push(...routes)
  },

  getAll() {
    return registeredRoutes
  },

  getByLayout(layout: "main" | "auth" | "settings" | "public") {
    return registeredRoutes.filter((r) => r.layout === layout)
  },
  convertToRouteObject(entry: RouteEntry): RouteObject {
    if (entry.index) {
      return {
        index: true,
        path: entry.path,
        element: entry.element,
        errorElement: entry.errorElement,
        handle: entry.handle,
        lazy: entry.lazy,
      }
    } else {
      return {
        index: false,
        path: entry.path,
        element: entry.element,
        errorElement: entry.errorElement,
        handle: entry.handle,
        lazy: entry.lazy,
        children: entry.children?.map(this.convertToRouteObject),
      }
    }
    
  },

  getReactRouterRoutes(layout: "main" | "auth" | "settings" | "public"): RouteObject[] {
    return registeredRoutes
      .filter((r) => r.layout === layout)
      .map(this.convertToRouteObject)
  }
}