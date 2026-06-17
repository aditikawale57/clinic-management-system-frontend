import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as authApi from '@/api/auth'
import { clearToken, getToken, setToken } from '@/lib/token'
import type { LoginPayload, RegisterPayload, User } from '@/types'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  /** True while the initial token -> user hydration is in progress. */
  initializing: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  // Only block on hydration when there is a token to validate.
  const [initializing, setInitializing] = useState(() => getToken() !== null)

  // On first load, restore the session from a stored token (if any).
  useEffect(() => {
    const token = getToken()
    if (!token) return

    let active = true
    authApi
      .getCurrentUser()
      .then((currentUser) => {
        if (active) setUser(currentUser)
      })
      .catch(() => {
        clearToken()
        if (active) setUser(null)
      })
      .finally(() => {
        if (active) setInitializing(false)
      })

    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    const { token, user: loggedInUser } = await authApi.login(payload)
    setToken(token)
    setUser(loggedInUser)
  }, [])

  const register = useCallback(async (payload: RegisterPayload) => {
    const { token, user: newUser } = await authApi.register(payload)
    setToken(token)
    setUser(newUser)
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      initializing,
      login,
      register,
      logout,
    }),
    [user, initializing, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
