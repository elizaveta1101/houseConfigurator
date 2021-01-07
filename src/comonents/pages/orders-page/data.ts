export const tableColumns = [
  {
    title: 'Номер заказа',
    dataIndex: 'orderNumber',
  },
  {
    title: 'Id клиента',
    dataIndex: 'clientId',
  },
  {
    title: 'Статус',
    dataIndex: 'status',
  },
  {
    title: 'Стоимость',
    dataIndex: 'coast',
  },
  {
    title: 'Дата',
    dataIndex: 'date',
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
        name: 'clientId',
        className: 'id',
        label: 'Id клиента',
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
        name: 'phone',
        className: 'phone',
        label: 'Номер телефона',
      },
      {
        id: '2',
        type: 'input',
        size: 'big',
        name: 'email',
        className: 'email',
        label: 'Электронная почта',
        copyMode: true,
      },
    ],
  },
]
