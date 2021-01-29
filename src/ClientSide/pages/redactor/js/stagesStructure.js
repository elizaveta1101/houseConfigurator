import houseTextures from '../assets/Textures/houseTextures.js';
import houseModels from '../assets/Models/houseModels.js';
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
                type: 'select',
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
        description: 'Выберите количество этажей в доме',
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
        name: 'roof',
        heading: 'Крыша',
        description: 'Выберите тип крыши и материалы для отделки',
        fields: [
            {
                label: 'Форма крыши',
                type: 'select',
                fieldId: 'roofShape',
                options: ['1', '2'],
                value: '1',
                show: true,
                depended: {}
            },
            {
                label: 'Материал',
                type: 'select',
                fieldId: 'roofMaterial',
                options: houseTextures.roof, 
                value: 0, 
                show: true,
                depended: {}
            },
        ],
        condition: null,
    },
    {
        //подвал
        id: 4,
        name: 'cellar',
        heading: 'Подвал',
        description: 'Задайте параметры для подвала или пропустите стадию',
        fields: [
            {
                label: '',
                type: 'checkbox',
                fieldId: 'cellarExistence',
                options: ['Добавить подвал в доме'],
                value: '-1',
                show: true,
                depended: {}
            },
            {
                label: 'Высота потолков',
                type: 'text',
                fieldId: 'cellarHeight',
                options: [],
                value: '',
                show: false,
                depended: {
                    fieldId: 'cellarExistence',
                    value: 'Добавить подвал в доме'
                }
            },
            {
                label: '',
                type: 'checkbox',
                fieldId: 'cellarIsolation',
                options: ['Изолированный?'],
                value: '-1',
                show: false,
                depended: {
                    fieldId: 'cellarExistence',
                    value: 'Добавить подвал в доме'
                }
            },
        ],
        condition: null,
    },
    {
        //мансарда
        id: 5,
        name: 'mansard',
        heading: 'Мансарда',
        description: 'Задайте параметры для мансарды или пропустите стадию',
        fields: [
            {
                label: '',
                type: 'checkbox',
                fieldId: 'mansardExistence',
                options: ['Добавить мансарду в доме'],
                value: '-1',
                show: true,
                depended: {}
            },
            // {
            //     label: '',
            //     type: 'checkbox',
            //     fieldId: 'mansardLiving',
            //     options: ['Жилая?'],
            //     value: '-1',
            //     show: false,
            //     depended: {
            //         fieldId: 'mansardExistence',
            //         value: 'Добавить мансарду в доме'
            //     }
            // },
        ],
        condition: null,
    },  
    {
        id: 6,
        name: 'innerWalls',
        heading: 'Межкомнатные стены',
        description: 'Укажите положение межкомнатных стен. Выберите этаж, для которого хотите сделать планировку, и перейдите в режим редактирования. Управление в режиме редактирования: кликните по нужной точке и перетащите ее в нужную позицию. Управление в режиме добавления: чтобы добавить точку - кликните левой кнопкой мыши, чтобы закончить добавление стены - кликните по последней добавленной точке. Сменить режим: клик правой кнопки мыши.',
        fields: [
            {
                label: 'Редактируемый этаж',
                type: 'select',
                fieldId: 'editableFloor',
                options: ['1'], 
                value: '1', 
                show: true,
                depended: {}
            },
        ],
        condition: true,
    },
    {
        //веранда
        id: 7,
        name: 'verandaBasement',
        heading: 'Веранда',
        description: 'Задайте параметры для веранды или пропустите стадию',
        fields: [
            {
                label: '',
                type: 'checkbox',
                fieldId: 'verandaExistence',
                options: ['Добавить веранду в доме'],
                value: '-1',
                show: true,
                depended: {}
            },           
        ],
        condition: {
            fieldId: 'verandaExistence',
            value: 'Добавить веранду в доме',
        }
    },
    {
        id: 8,
        name: 'interior',
        heading: 'Окна',
        description: 'Выберите понравившуюся модель окна, двери или лестницы и добавьте ее на план. Для перемещения модели перейдите в 2D.',
        fields: [
            {
                label: 'Редактируемый этаж',
                type: 'select',
                fieldId: 'editableFloor',
                options: ['1'], 
                value: '1', 
                show: true,
                depended: {}
            },
            {
                label: 'Окно',
                type: 'select',
                fieldId: 'windowModel',
                options: houseModels.window, 
                value: 0, 
                show: true,
                depended: {}
            }, 
            {
                label: 'Дверь',
                type: 'select',
                fieldId: 'doorModel',
                options: houseModels.door, 
                value: 0, 
                show: true,
                depended: {}
            }, 
            {
                label: 'Лестница',
                type: 'select',
                fieldId: 'stairsModel',
                options: houseModels.stairs, 
                value: 0, 
                show: true,
                depended: {}
            }, 
            // {
            //     label: 'Дверь',
            //     type: 'select',
            //     fieldId: 'doorModel',
            //     options: houseModels.door, 
            //     value: 0, 
            //     show: true,
            //     depended: {}
            // },
            // {
            //     label: 'Лестница',
            //     type: 'select',
            //     fieldId: 'stairsModel',
            //     options: houseModels.stairs, 
            //     value: 0, 
            //     show: true,
            //     depended: {}
            // },
        ],
        condition: null,
    },
];

export default stages;