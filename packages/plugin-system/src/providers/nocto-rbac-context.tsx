import React from "react"

type VisibilityContext = {
  pluginId: string,
}
type PermissionsMap = Map<string, string[]>

type NoctoRbacCheck = (ctx: VisibilityContext) => boolean | Promise<boolean>

type RBACContextType = {
  checkAccess: NoctoRbacCheck,
  isReady: boolean
}

const NoctoRbacContext = React.createContext<RBACContextType>({
  checkAccess: () => true,
  isReady: false
})

export const NoctoRbacProvider = ({
  children,
  user,
  isLoading,
  rbac
}: {
  children: React.ReactNode
  user?: any,
  isLoading?: boolean,
  rbac?: {
    fetchPermissions?: (userId: string) => Promise<PermissionsMap>,
    evaluateAccess?: (permissions?: string[]) => boolean | Promise<boolean>
  }
}) => {

  const [permissions, setPermissions] = React.useState<PermissionsMap | undefined>()

  React.useEffect(() => {
    if (!user || isLoading) return

    if (!rbac || !rbac.fetchPermissions || !user) return

    rbac.fetchPermissions(user.id).then(setPermissions)

  }, [rbac, user])

  const checkAccess: NoctoRbacCheck = ({ pluginId }) => {
    if (rbac && rbac.evaluateAccess !== undefined) {
      return rbac.evaluateAccess(permissions?.get(pluginId));
    }
    return true
  }

  const isReady = !!permissions || !rbac

  return (
    <NoctoRbacContext.Provider value={{ checkAccess, isReady }}>
      {children}
    </NoctoRbacContext.Provider>
  )
}

export const useNoctoRbac = () => {
  return React.useContext(NoctoRbacContext)
}