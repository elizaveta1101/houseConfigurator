import throughElements from '../../assets/icons/menu/through-elements.svg'
import homePage from '../../assets/icons/menu/home-page.svg'
import housesFinish from '../../assets/icons/menu/houses-finish.svg'
import projectFinish from '../../assets/icons/menu/project-finish.svg'
import projectInvest from '../../assets/icons/menu/project-invest.svg'
import infoPoll from '../../assets/icons/menu/info-poll.svg'
import poll from '../../assets/icons/menu/poll.svg'
import orders from '../../assets/icons/menu/orders.svg'
import clientData from '../../assets/icons/menu/client-data.svg'
import adminsSite from '../../assets/icons/menu/admins-site.svg'

interface IData {
  id: string
  text: string
  icon: string
  link: string
}

export const data: IData[] = [
  {
    id: '1',
    text: 'Сквозные элементы',
    icon: throughElements,
    link: '/through-elements',
  },
  {
    id: '2',
    text: 'Главная страница',
    icon: homePage,
    link: '/main-page',
  },
  {
    id: '3',
    text: 'Готовые дома',
    icon: housesFinish,
    link: '/houses-finish',
  },
  {
    id: '4',
    text: 'Готовые проекты',
    icon: projectFinish,
    link: '/project-finish',
  },
  {
    id: '5',
    text: 'Проекты инвестиций',
    icon: projectInvest,
    link: '/project-invest',
  },
  {
    id: '6',
    text: 'Инфо об опросе',
    icon: infoPoll,
    link: '/info-poll',
  },
  {
    id: '7',
    text: 'Опрос',
    icon: poll,
    link: '/poll',
  },
  {
    id: '8',
    text: 'Заказы',
    icon: orders,
    link: '/orders',
  },
  {
    id: '9',
    text: 'Клиентские данные',
    icon: clientData,
    link: '/client-data',
  },
  {
    id: '10',
    text: 'Администраторы сайта',
    icon: adminsSite,
    link: '/admins-site',
  },
]
