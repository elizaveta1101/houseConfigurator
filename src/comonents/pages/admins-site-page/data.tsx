export const tableColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
    width: 50,
  },
  {
    title: 'ФИО',
    dataIndex: 'fio',
    sorter: (a: any, b: any) => {
      if (a.fio < b.fio) return -1
      if (a.fio > b.fio) return +1
      else return 0
    },
    width: 150,
  },
  {
    title: 'Логин',
    dataIndex: 'login',
    sorter: (a: any, b: any) => {
      if (a.login < b.login) return -1
      if (a.login > b.login) return +1
      else return 0
    },
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

export const adminAddForm = [
  {
    id: '1',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'big',
        name: 'name',
        className: 'name',
        label: 'Имя',
        required: true,
      },
    ],
  },
  {
    id: '2',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'big',
        name: 'surname',
        className: 'surname',
        label: 'Фамилия',
        required: true,
      },
    ],
  },
  {
    id: '3',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'big',
        name: 'otchestvo',
        className: 'otchestvo',
        label: 'Отчество',
        required: true,
      },
    ],
  },
  {
    id: '4',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'big',
        name: 'login',
        className: 'login',
        label: 'Логин',
        required: true,
      },
    ],
  },
  {
    id: '5',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'big',
        name: 'email',
        className: 'email',
        label: 'Корпоративная почта',
        required: true,
      },
    ],
  },
  {
    id: '6',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'big',
        name: 'password',
        className: 'password',
        label: 'Пароль',
        required: true,
      },
    ],
  },
]
