import { IFormData } from '../../../data/types'

export const updateData = (data: IFormData[], admin: any) => {
  const resData = data.map(({ id, inputsGroup }) => {
    const resInputsGroup = inputsGroup.map((input) => {
      Object.keys(admin).forEach((key) => {
        if (input.name === key) input['value'] = admin[key]
        if (input.name === 'fio')
          input['value'] = `${admin.name} ${admin.surname} ${admin.otchestvo}`
      })
      return input
    })
    return { id, inputsGroup: resInputsGroup }
  })
  return resData
}
