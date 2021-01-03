import ActionType from './action-type'

export interface IPayloads {
  code: string
  value: any
}

const ActionCreator = {
  setItem: ({ code, value }: IPayloads) => ({
    type: ActionType.SET_ITEM,
    payload: { code, value },
  }),
}

export { ActionCreator }
