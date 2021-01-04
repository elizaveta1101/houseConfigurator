import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ActionCreator } from '../store/actions'

export const useStore = () => {
  const dispatch = useDispatch()
  const allItems = useSelector((state: any) => state.state)
  
  const setItem = useCallback((code, value) => dispatch(ActionCreator.setItem({ code, value })), [
    dispatch,
  ])

  const getItem = useCallback((code: string) => allItems[code], [allItems])

  return {
    setItem,
    getItem,
    allItems,
  }
}
