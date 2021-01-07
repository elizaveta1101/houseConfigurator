import { Checkbox } from './data'

export const updateData = (code: number, data: Checkbox[], checkbox?: string) => {
  if (checkbox)
    return data.map((item) =>
      checkbox === item.value ? { ...item, ['checked']: !item.checked } : item
    )
  else {
    const binCode = code.toString(2)
    return data.map((item, index) => {
      return { ...item, ['checked']: Boolean(+binCode[index]) }
    })
  }
}

export const getRightsCode = (data: Checkbox[]) => {
  const res = data.map(({ checked }) => {
    if (checked) return '1'
    else return '0'
  })
  const code = res.join('')
  return parseInt(code, 2)
}
