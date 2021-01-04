interface IData {
  [key: string]: {
    title: string
    leftButtonText: string
    rightButtonText: string
  }
}

export const data: IData = {
  logout: {
    title: 'Выйти из системы?',
    leftButtonText: 'Остаться',
    rightButtonText: 'Выйти',
  },
  createProject: {
    title: 'Отменить создание проекта?',
    leftButtonText: 'Продолжить',
    rightButtonText: 'Отменить',
  },
  saveData: {
    title: 'Сохранить данные?',
    leftButtonText: 'Отменить',
    rightButtonText: 'Сохранить',
  },
  deleteHome: {
    title: 'Удалить дом?',
    leftButtonText: 'Не удалять',
    rightButtonText: 'Удалить',
  },
  deletePtoject: {
    title: 'Удалить проект?',
    leftButtonText: 'Не удалять',
    rightButtonText: 'Удалить',
  },
  deleteFile: {
    title: 'Удалить файл?',
    leftButtonText: 'Не удалять',
    rightButtonText: 'Удалить',
  },
  rights: {
    title: 'Доступ',
    leftButtonText: 'Отменить',
    rightButtonText: 'Сохранить',
  },
  addition: {
    title: 'Новый администратор',
    leftButtonText: 'Отменить',
    rightButtonText: 'Добавить',
  },
  confirm: {
    title: 'Введите пароль для подтверждения действия',
    leftButtonText: 'Отменить',
    rightButtonText: 'Подтвердить',
  },
}
