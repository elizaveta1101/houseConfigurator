export const tableColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    sorter: true,
    width: 50,
  },
  {
    title: 'ФИО',
    dataIndex: 'fio',
    width: 150,
  },
  {
    title: 'Логин',
    dataIndex: 'login',
    width: 130,
  },
  {
    title: 'Пароль',
    dataIndex: 'password',
    width: 130,
  },
  {
    title: 'Корп. почта',
    dataIndex: 'email',
    width: 150,
  },
]

export const formData = [
  {
    id: '1',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'small',
        name: 'id',
        className: 'id',
        label: 'Id администратора',
      },
      {
        id: '2',
        type: 'input',
        size: 'big',
        name: 'fio',
        className: 'fio',
        label: 'ФИО',
      },
    ],
  },
  {
    id: '2',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'pre-middle',
        name: 'login',
        className: 'login',
        label: 'Логин',
      },
      {
        id: '2',
        type: 'input',
        size: 'pre-middle',
        name: 'password',
        className: 'password',
        label: 'Пароль',
      },
    ],
  },
  {
    id: '3',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'height-middle',
        name: 'email',
        className: 'email',
        label: 'Корпоративная почта',
        copyMode: true,
      },
    ],
  },
]
