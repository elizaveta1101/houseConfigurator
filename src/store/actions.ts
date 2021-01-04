import {ActionTypes} from './action-types'

export interface IPayloads {
  code: string
  value: any
}

export const ActionCreator = {
  setItem: ({ code, value }: IPayloads) => ({
    type: ActionTypes.SET_ITEM,
    payload: { code, value },
  }),
}
