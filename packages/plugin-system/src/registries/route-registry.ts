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
  loader?: RouteObject["loader"],
  permissions?: string[],
  children?: RouteEntry[]
}

type RouteMap = Map<string, RouteEntry[]>

class PluginRouteRegistry {
  private routesMap: RouteMap = new Map<string, RouteEntry[]>()

  register(pluginId: string, route: RouteEntry | RouteEntry[]) {
    const routes = Array.isArray(route) ? route : [route]
    this.routesMap.set(pluginId, routes)
  }

  getMap() {
    return this.routesMap;
  }

  getAll() : RouteEntry[] {
    return Array.from(this.routesMap.values()).flat()
  }

  getPluginsIds() : string[] {
    return Array.from(this.routesMap.keys())
  }
}

export const RouteRegistry = new PluginRouteRegistry()