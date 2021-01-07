import { FormValues, IFormData } from '../../data/types'

export const getFromValues = (data: IFormData[]) => {
  return data.reduce((prev: FormValues[], { inputsGroup }) => {
    inputsGroup.forEach(({ name, value }) => prev.push({ name: [name], value: value! }))
    return prev
  }, [])
}
