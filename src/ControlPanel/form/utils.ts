import { IFormData } from '../../data/types'

export const updateFormData = (data: IFormData[], values: any) => {
  const resData = data.map(({ id, inputsGroup }) => {
    const resInputsGroup = inputsGroup.map((input) => {
      Object.keys(values).forEach((key: string) => {
        if (key === input.name) {
          input['value'] = values[key]
        }
      })
      return input
    })
    return { id, inputsGroup: resInputsGroup }
  })
  return resData
}
