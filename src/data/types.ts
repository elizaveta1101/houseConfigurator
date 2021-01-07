export interface IAdmin {
  admin: boolean
  email: string
  fio?: string
  id: number
  key?: number
  login: string
  name?: string
  otchestvo?: string
  password: string
  phone: number
  rights: number
  socials?: {
    id: number
    link: string
    profile_id: number
    text: string
    type: string
  }[]
  surname?: string
  token?: string
}

export interface IFormData {
  id: string
  inputsGroup: {
    id: string
    type: string
    size: string
    name: string
    className: string
    label: string
    value?: string
    copyMode?: boolean
    required?: boolean
  }[]
}

export type FormValues = { name: string[]; value: string }
