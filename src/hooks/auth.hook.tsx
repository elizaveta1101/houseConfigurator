import { useCallback, useEffect, useState } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback((token, id) => {
    setToken(token)
    setUserId(id)

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: token,
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const userData = localStorage.getItem(storageName)
    const data = userData && JSON.parse(userData)

    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, ready }
}
