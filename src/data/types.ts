export interface IAdmin {
  otchestvo?: string
  password: string
  admin: boolean
  rights: number
  email: string
  login: string
  name?: string
  phone: number
  fio?: string
  key?: number
  id: number
  socials?: {
    profile_id: number
    link: string
    text: string
    type: string
    id: number
  }[]
  surname?: string
  token?: string
}

export type InputType = {
  copyMode?: boolean
  required?: boolean
  className: string
  value?: string
  label: string
  type: string
  size: string
  name: string
  id: string
}
export interface IFormData {
  id: string
  inputsGroup: InputType[]
}
