export const formData = [
  {
    id: '1',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'small',
        name: 'codename',
        className: 'codename',
        placeholder: 'id',
        label: 'Id дома',
      },
      {
        id: '2',
        type: 'input',
        size: 'small',
        name: 'cost',
        className: 'cost',
        placeholder: 'Укажите цену',
        label: 'Стоимость',
      },
      {
        id: '3',
        type: 'select',
        size: 'middle',
        name: 'style',
        className: 'style',
        placeholder: 'Стиль',
        label: 'Стиль дома',
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
        name: 'name',
        className: 'name',
        placeholder: 'Название дома',
        label: 'Название',
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
        name: 'square',
        className: 'square',
        placeholder: 'Площадь кв м',
        label: 'Площадь дома',
      },
      {
        id: '2',
        type: 'input',
        size: 'small',
        name: 'size',
        className: 'size',
        placeholder: 'ШхД',
        label: 'Габариты(ШхД)',
      },
      {
        id: '3',
        type: 'input',
        size: 'small',
        name: 'floors',
        className: 'floors',
        placeholder: 'Кол-во этажей',
        label: 'Кол-во этажей',
      },
    ],
  },
  {
    id: '4',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'small',
        name: 'bedrooms',
        className: 'bedrooms',
        placeholder: 'Кол-во спален',
        label: 'Кол-во спален',
      },
      {
        id: '2',
        type: 'input',
        size: 'small',
        name: 'bathrooms',
        className: 'bathrooms',
        placeholder: 'Число',
        label: 'Кол-во санузлов',
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
        name: 'address',
        className: 'address',
        placeholder: 'Адрес в формате город, улица, дом',
        label: 'Местоположение',
      },
    ],
  },
  {
    id: '6',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'middle',
        name: 'cords',
        className: 'cords',
        placeholder: 'Формат хх.хххххх, хх.хххххх',
        label: 'Координаты на карте(через запятую)',
      },
    ],
  },
  {
    id: '7',
    inputsGroup: [
      {
        id: '1',
        type: 'input',
        size: 'big',
        name: 'materials',
        className: 'materials',
        placeholder: 'Материалы через запятую',
        label: 'Материалы',
      },
    ],
  },
  {
    id: '8',
    inputsGroup: [
      {
        id: '1',
        type: 'textarea',
        size: 'big',
        name: 'infrastructure',
        className: 'infrastructure',
        placeholder: 'Описание инфраструктуры',
        label: 'Инфраструктура',
      },
    ],
  },
  {
    id: '9',
    inputsGroup: [
      {
        id: '1',
        type: 'textarea',
        size: 'big',
        name: 'long_info',
        className: 'long_info',
        placeholder: 'Описание проекта',
        label: 'Описание дома',
      },
    ],
  },
]
