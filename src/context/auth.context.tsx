import { createContext } from 'react'

interface IAuthContext {
  token: string | null
  userId: string | null
  login: (jwtToken: any, id: any) => void
  logout: () => void
  isAuth: boolean
}

function noop() {}

export const AuthContext = createContext<IAuthContext>({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuth: false,
})
