import { createContext } from 'react'

interface IAppContext {
  isAuth: boolean
  isNavMenuOpen: boolean
  isAuthMenuOpen: boolean
  isOverlayOpen: boolean
  authHandler: () => void
  navMenuHandler: () => void
  allHideHandler: () => void
}

const noop = () => console.log('tslint, я пустая функция!')

export const AppContext = createContext<IAppContext>({
  isAuth: false,
  isNavMenuOpen: false,
  isAuthMenuOpen: false,
  isOverlayOpen: false,
  authHandler: noop,
  navMenuHandler: noop,
  allHideHandler: noop,
})
