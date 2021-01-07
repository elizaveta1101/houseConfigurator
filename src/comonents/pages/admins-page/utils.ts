export const updateFormData = (data: any, admin: any) => {
  const resData = data.map(({ id, inputsGroup }: any) => {
    const resInputsGroup = inputsGroup.map((input: any) => {
      Object.keys(admin).forEach((key: string) => {
        if (key === input.name) {
          input['value'] = admin[key]
        }
      })
      return input
    })
    return { id, inputsGroup: resInputsGroup }
  })
  return resData
}
