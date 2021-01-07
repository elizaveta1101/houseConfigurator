import { createContext } from 'react'

interface IAuthContext {
  token?: string | null
  userId?: string | null
  isAdmin?: boolean | null
  login?: (token: string, id: string, isAdmin: boolean) => void
  logout?: () => void
}

export const AuthContext = createContext<any>({})
