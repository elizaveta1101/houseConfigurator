import _1 from './1.jpg'; 
import _2 from './2.jpg'; 
import _3 from './3.jpg'; 
import _4 from './4.jpg'; 
import _5 from './5.jpg'; 
import _6 from './6.jpg'; 

// let basementTextures = {
//     url: [],
//     name: [],
//     size: [],
// };
// basementTextures.url.push(_1, _2, _3, _4, _5, _6);
// basementTextures.name.push('1', '2', '3', '4', '5', '6');
// basementTextures.size.push([0.5, 0.25], [0.3, 0.3], [0.5, 0.25], [0.5, 0.25], [0.5, 0.25], [0.5, 0.25]);
let basementTextures = [];
basementTextures.push(
    {
        name: 'материал1',
        url: _1,
        size: [1, 0.5],
        producer: 'производитель1',
        description: 'описание, описание, описание, описание, описание, описание, описание, описание',
        price: '10 руб/м',
    },
    {
        name: 'материал2',
        url: _2,
        size: [0.5, 0.5],
        producer: 'производитель2',
        description: 'описание, описание, описание, описание, описание, описание, описание, описание',
        price: '10 руб/м',
    },
    {
        name: 'материал3',
        url: _3,
        size: [0.5, 0.5],
        producer: 'производитель3',
        description: 'описание, описание, описание, описание, описание, описание, описание, описание',
        price: '10 руб/м',
    },
    {
        name: 'материал4',
        url: _4,
        size: [1, 0.5],
        producer: 'производитель4',
        description: 'описание, описание, описание, описание, описание, описание, описание, описание',
        price: '10 руб/м',
    },
    {
        name: 'материал5',
        url: _5,
        size: [1, 0.5],
        producer: 'производитель5',
        description: 'описание, описание, описание, описание, описание, описание, описание, описание',
        price: '10 руб/м',
    },
    {
        name: 'материал6',
        url: _6,
        size: [1, 0.5],
        producer: 'производитель6',
        description: 'описание, описание, описание, описание, описание, описание, описание, описание',
        price: '10 руб/м',
    },
);


export  default basementTextures;