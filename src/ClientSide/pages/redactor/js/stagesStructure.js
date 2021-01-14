import houseTextures from '../assets/Textures/houseTextures.js';
const stages = [
    {
        id: 0,
        name: 'basement',
        heading: 'Фундамент',
        description: 'Выберите форму фундамента из списка или задайте свою, а затем укажите высоту фундамента.',
        fields: [
            {
                label: 'Тип фундамента',
                type: 'select',
                fieldId: 'basementType',
                options: [ 'Ленточный', 'Свайный', 'Плита'],
                value: 'Ленточный',
                show: true,
                depended: {}
            },
            {
                label: 'Форма фундамента',
                type: 'select',
                fieldId: 'basementShape',
                options: ['1', '2', '3', '4', 'Задать свою'],
                value: '1',
                show: true,
                depended: {}
            },
            {
                label: 'Высота фундамента',
                type: 'text',
                fieldId: 'basementHeight',
                options: [],
                value: '0.5',
                show: true,
                depended: {}
            },
            {
                label: 'Внешняя отделка фундамента',
                type: 'select',
                fieldId: 'basementMaterial',
                options: houseTextures.basement, 
                value: 0, 
                show: true,
                depended: {}
            },
            // {
            //     label: 'Подвал',
            //     type: 'checkbox',
            //     fieldId: 'basementCellar',
            //     options: ['Добавить подвал в доме'],
            //     value: '-1',
            //     show: true,
            //     depended: {}
            // },
            // {
            //     label: 'Высота потолков',
            //     type: 'text',
            //     fieldId: 'basementCellarHeight',
            //     options: [],
            //     value: '',
            //     show: false,
            //     depended: {
            //         fieldId: 'basementCellar',
            //         value: 'Добавить подвал в доме'
            //     }
            // },
            // {
            //     label: '',
            //     type: 'checkbox',
            //     fieldId: 'basementCellarIsolated',
            //     options: ['Изолированный?'],
            //     value: '-1',
            //     show: false,
            //     depended: {
            //         fieldId: 'basementCellar',
            //         value: 'Добавить подвал в доме'
            //     }
            // },
            // {
            //     label: 'Гараж',
            //     type: 'checkbox',
            //     fieldId: 'basementGarage',
            //     options: ['Добавить гараж в доме'],
            //     value: '-1',
            //     show: true,
            //     depended: {}
            // },
            // {
            //     label: 'Расположение',
            //     type: 'select',
            //     fieldId: 'basementGaragePosition',
            //     options: ['На первом этаже', 'В подвале'],
            //     value: 'На первом этаже',
            //     show: false,
            //     depended: {
            //         fieldId: 'basementGarage',
            //         value: 'Добавить гараж в доме'
            //     }
            // },
        ],
        // возможные варианты:
        //     null - нередактируемая стадия,
        //     true - редактируемая стадия, кнопки видны сразу и постоянно
        //     {
            // fieldId - идентификатор поля, на которое накладывается условие
            // value - значение поля, при котором должны появиться кнопки
        //     } 
        // if (condition) - стадия редактируемая
        condition: {
            fieldId: 'basementShape',
            value: 'Задать свою',
        } 
    },
    {
        id: 1,
        name: 'outerWalls',
        heading: 'Внешние стены',
        description: 'Укажите высоту стен.',
        fields: [
            {
                label: 'Высота стен',
                type: 'text',
                fieldId: 'wallHeight',
                options: [],
                value: '3',
                show: true,
                depended: {}
            },
            {
                label: 'Внешняя отделка стен',
                type: 'radio',
                fieldId: 'outerWallsMaterial',
                options: houseTextures.outerWalls, 
                value: 0, 
                show: true,
                depended: {}
            },
        ]
    },
    {
        id: 2,
        name: 'floors',
        heading: 'Этажи',
        description: 'Выберете количество этажей в доме',
        fields: [
            {
                label: null,
                type: 'select',
                fieldId: 'floors',
                options: ['1', '2', '3', '4', '5'],
                value: '1',
                show: true,
                depended: {}
            },
            {
                label: 'Основа перекрытия',
                type: 'select',
                fieldId: 'ceiling',
                options: ['Деревянные балки', 'Металл', 'Железобетонные балки'],
                value: 'Деревянные балки',
                show: true,
                depended: {}
            }
        ],
        condition: null,
    },
    {
        id: 3,
        name: 'innerWalls',
        heading: 'Межкомнатные стены',
        description: 'Укажите положение межкомнатных стен. !!!!Пока не работали над логикой для построения межкомнатных стен.',
        fields: [],
        condition: true,
    },
    
];

export default stages;