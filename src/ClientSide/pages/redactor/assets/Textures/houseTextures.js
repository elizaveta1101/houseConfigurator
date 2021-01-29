import basementTextures from './basement/basementTextures.js';
import outerWallsTextures from './outerWalls/outerWallsTextures.js';
import roofTextures from './roof/roofTextures.js';
import stages from '../../js/stagesStructure.js';


let houseTextures = {
    basement: basementTextures,
    outerWalls: outerWallsTextures,
    roof: roofTextures,
    getIndex:
        function getIndex(stageName) {
            let currentStage = stages.filter((el) => el.name === stageName)[0];
            let currentMaterialIndex = currentStage.fields.filter((el) => el.fieldId === stageName+'Material')[0].value;
            return currentMaterialIndex;
        },
    getTexture: 
        function getTexture(stageName) {
            let index = this.getIndex(stageName);
            return this[stageName][index].url;
        },
    getTextureSize:
        function getTextureSize(stageName) {
            let index = this.getIndex(stageName);
            return this[stageName][index].size;
        }
};

export default houseTextures;
