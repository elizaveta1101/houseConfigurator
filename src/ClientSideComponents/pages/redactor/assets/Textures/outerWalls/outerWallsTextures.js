import _1 from './1.png';
import _2 from './2.jpg';
import _3 from './3.png';
import _4 from './4.png';
import _5 from './5.png';

// let outerWallsTextures = {
//     url: [],
//     name: [],
//     size: [],
// };
// outerWallsTextures.url.push(_1, _2, _3, _4, _5);
// outerWallsTextures.name.push('1', '2', '3', '4', '5');
// outerWallsTextures.size.push([0.1, 0.165], [0.133, 0.1], [0.1, 0.165], [0.1, 0.165], [0.1, 0.165]);

let outerWallsTextures = [];
outerWallsTextures.push(
    {
        name: 'материал1',
        url: _1,
        size: [0.2, 0.33],
        producer: 'производитель1',
        description: 'описание, описание, описание, описание, описание, описание, описание, описание',
        price: '10 руб/м',
    },
    {
        name: 'материал2',
        url: _2,
        size: [0.4, 0.3],
        producer: 'производитель2',
        description: 'описание, описание, описание, описание, описание, описание, описание, описание',
        price: '10 руб/м',
    },
    {
        name: 'материал3',
        url: _3,
        size: [0.2, 0.33],
        producer: 'производитель3',
        description: 'описание, описание, описание, описание, описание, описание, описание, описание',
        price: '10 руб/м',
    },
    {
        name: 'материал4',
        url: _4,
        size: [0.2, 0.33],
        producer: 'производитель4',
        description: 'описание, описание, описание, описание, описание, описание, описание, описание',
        price: '10 руб/м',
    },
    {
        name: 'материал5',
        url: _5,
        size: [0.2, 0.33],
        producer: 'производитель5',
        description: 'описание, описание, описание, описание, описание, описание, описание, описание',
        price: '10 руб/м',
    }
);

export default outerWallsTextures;