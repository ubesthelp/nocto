import React from "react"

type VisibilityContext = {
  pluginId: string,
}

type NoctoRbacCheck = (ctx: VisibilityContext) => boolean | Promise<boolean>
type PermissionsMap = Map<string, string[]>

type RBACContextType = {
  checkAccess: NoctoRbacCheck
}

const NoctoRbacContext = React.createContext<RBACContextType>({
  checkAccess: () => true
})

export const NoctoRbacProvider = ({
  children,
  user,
  isLoading,
  fetchPermissions,
  evaluateAccess = () => true
}: {
  children: React.ReactNode
  user?: any,
  isLoading?: boolean
  fetchPermissions?: (userId: string) => Promise<PermissionsMap>,
  evaluateAccess?: (permissions?: string[]) => boolean | Promise<boolean>
}) => {

  const [permissions, setPermissions] = React.useState<PermissionsMap | undefined>()

  React.useEffect(() => {
    if (!user || isLoading) return

    if (!fetchPermissions || !user) return

    fetchPermissions(user.id).then(setPermissions)

  }, [fetchPermissions, user])

  const checkAccess: NoctoRbacCheck = ({ pluginId }) => {
    return evaluateAccess(permissions?.get(pluginId));
  }

  return (
    <NoctoRbacContext.Provider value={{ checkAccess }}>
      {children}
    </NoctoRbacContext.Provider>
  )
}

export const useNoctoRbac = () => {
  const ctx = React.useContext(NoctoRbacContext)
  return ctx.checkAccess
}