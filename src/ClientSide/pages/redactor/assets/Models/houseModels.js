import windowModels from './window/windowModels.js';
import doorModels from './door/doorModels.js';
import stairsModels from './stairs/stairsModels.js';

let houseModels = {
    window: windowModels,
    door: doorModels,
    stairs: stairsModels,

    // getIndex:
    //     function getIndex(stageName) {
    //         let currentStage = stages.filter((el) => el.name === stageName)[0];
    //         let currentMaterialIndex = currentStage.fields.filter((el) => el.fieldId === stageName+'Material')[0].value;
    //         return currentMaterialIndex;
    //     },
    // getTexture: 
    //     function getTexture(stageName) {
    //         let index = this.getIndex(stageName);
    //         return this[stageName][index].url;
    //     },
    // getTextureSize:
    //     function getTextureSize(stageName) {
    //         let index = this.getIndex(stageName);
    //         return this[stageName][index].size;
    //     }
};

export default houseModels;
