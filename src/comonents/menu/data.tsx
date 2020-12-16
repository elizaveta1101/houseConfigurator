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
import { MenuLinkPaths } from '../../data'

interface ILinksData {
  id: string
  text: string
  icon: string
  linkPath: string
}

export const linksdata: ILinksData[] = [
  {
    id: '1',
    text: 'Сквозные элементы',
    icon: throughElements,
    linkPath: MenuLinkPaths.throughElementsPath,
  },
  {
    id: '2',
    text: 'Главная страница',
    icon: homePage,
    linkPath: MenuLinkPaths.mainPagePath,
  },
  {
    id: '3',
    text: 'Готовые дома',
    icon: housesFinish,
    linkPath: MenuLinkPaths.housesFinishPath,
  },
  {
    id: '4',
    text: 'Готовые проекты',
    icon: projectFinish,
    linkPath: MenuLinkPaths.projectFinishPath,
  },
  {
    id: '5',
    text: 'Проекты инвестиций',
    icon: projectInvest,
    linkPath: MenuLinkPaths.projectInvestPath,
  },
  {
    id: '6',
    text: 'Инфо об опросе',
    icon: infoPoll,
    linkPath: MenuLinkPaths.infoPollPath,
  },
  {
    id: '7',
    text: 'Опрос',
    icon: poll,
    linkPath: MenuLinkPaths.pollPath,
  },
  {
    id: '8',
    text: 'Заказы',
    icon: orders,
    linkPath: MenuLinkPaths.ordersPath,
  },
  {
    id: '9',
    text: 'Клиентские данные',
    icon: clientData,
    linkPath: MenuLinkPaths.clientDataPath,
  },
  {
    id: '10',
    text: 'Администраторы сайта',
    icon: adminsSite,
    linkPath: MenuLinkPaths.adminsSitePath,
  },
]
