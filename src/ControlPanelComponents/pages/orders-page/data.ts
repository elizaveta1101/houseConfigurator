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

export const formClientData = [
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

export const formOrderData = [
  {
    id: '1',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'small',
        name: 'orderNumber',
        className: 'orderNumber',
        label: 'Номер заказа',
      },
      {
        id: '2',
        type: 'input',
        size: 'small',
        name: 'coast',
        className: 'coast',
        label: 'Стоимость',
      },
    ],
  },
  {
    id: '2',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'small',
        name: 'clientId',
        className: 'clientId',
        label: 'Id клиента',
      },
      {
        id: '2',
        type: 'input',
        size: 'big',
        name: 'date',
        className: 'date',
        label: 'Дата',
      },
    ],
  },
  {
    id: '3',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'small',
        name: 'status',
        className: 'status',
        label: 'Статус',
      },
      {
        id: '2',
        type: 'button',
        size: 'big',
        name: 'changeStatus',
        className: 'changeStatus',
        label: 'Сменить статус',
      },
    ],
  },
  {
    id: '4',
    inputsGroup: [
      {
        id: '1',
        type: 'textarea',
        size: 'big',
        name: 'info',
        className: 'info',
        label: 'Доп. информация',
      },
    ],
  },
]
