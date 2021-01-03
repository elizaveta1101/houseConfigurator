import { createContext, SyntheticEvent } from 'react'

interface IAppContext {
  isAuth?: boolean
  isNavMenuOpen?: boolean
  isAuthMenuOpen?: boolean
  isOverlayOpen?: boolean
  activeLink?: string
  headerHandler?: (e: SyntheticEvent) => void
  hideAll?: () => void
}

export const AppContext = createContext<any>({})
