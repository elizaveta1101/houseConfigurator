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

export interface IHouse {
  infrastructure: string
  short_info: string
  conditions: string
  bathrooms: number
  long_info: string
  materials: string
  bedrooms: number
  codename: string
  style_id: number
  address: string
  author_id: null
  square: number
  floors: number
  cords: string
  cost: number
  name: string
  size: string
  time:string
  type: null
  id: number
}

export type InputType = {
  copyMode?: boolean
  required?: boolean
  className: string
  value?: string | string[]
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
