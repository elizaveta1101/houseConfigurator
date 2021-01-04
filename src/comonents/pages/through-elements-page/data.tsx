import vk from '../../../assets/icons/socials/vk.svg'
import fb from '../../../assets/icons/socials/fb.svg'
import inst from '../../../assets/icons/socials/inst.svg'
import tw from '../../../assets/icons/socials/tw.svg'

interface ISocialInputsData {
  id: string
  name: string
  icon: string
}

export const socialInputsData: ISocialInputsData[] = [
  {
    id: '1',
    name: 'fb',
    icon: fb,
  },
  {
    id: '2',
    name: 'inst',
    icon: inst,
  },
  {
    id: '3',
    name: 'vk',
    icon: vk,
  },
  {
    id: '4',
    name: 'tw',
    icon: tw,
  },
]
