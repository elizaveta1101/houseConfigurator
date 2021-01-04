import {ActionTypes} from './action-types'
import { IPayloads } from './actions'

interface IReducerData {
  type: string
  payload: IPayloads
}

const initialState = {}

export const reducer = (state = initialState, { type, payload }: IReducerData) => {
  switch (type) {
    case ActionTypes.SET_ITEM:
      return {
        ...state,
        [payload.code]: payload.value,
      }

    default:
      return state
  }
}
