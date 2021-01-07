import { useCallback, useEffect, useState } from 'react'

import { storageKeys } from '../data'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback((token, id) => {
    setToken(token)
    setUserId(id)
    token && setIsAuth(true)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setIsAuth(false)

    sessionStorage.removeItem(storageKeys.USER_DATA)
  }, [])

  useEffect(() => {
    const userData = sessionStorage.getItem(storageKeys.USER_DATA)
    const data = userData && JSON.parse(userData)

    if (data && data.token) {
      login(data.token, data.id)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, isAuth, ready }
}
