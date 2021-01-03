import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ActionCreator } from './actions'
import { getAllItems as getAllItemsSelector } from './selectors'

export const useStore = () => {
  const dispatch = useDispatch()
  const allItems = useSelector(getAllItemsSelector)
  
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
