import { useCallback, useEffect, useState } from 'react'

import { storageKeys } from '../data'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback((token, id, isAdmin) => {
    setToken(token)
    setUserId(id)
    setIsAdmin(isAdmin)
    token && setIsAuth(true)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)

    sessionStorage.removeItem(storageKeys.USER_DATA)
  }, [])

  useEffect(() => {
    const userData = sessionStorage.getItem(storageKeys.USER_DATA)
    const data = userData && JSON.parse(userData)

    if (data && data.token) {
      login(data.token, data.id, data.isAdmin)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, isAdmin, isAuth, ready }
}
