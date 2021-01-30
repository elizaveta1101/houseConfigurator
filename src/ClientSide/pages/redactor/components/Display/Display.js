import React from 'react';
import { Interview } from '../Interview/interview.js';
import { Interactive } from '../Interactive/interactive.js';
import {TotalData} from '../TotalData/TotalData.js';
import {MaterialList} from '../Interview/MaterialList/MaterialList.js';
import stages from './../../js/stagesStructure.js';
import appState from './../../js/appState.js';
import classes from './Display.module.css';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stageId: 0,
            viewMode: '3D', //'3D'
            drawBtnVisibility: false,
            materialListVisiblity: false,
            materialList: {},
            materialListProps: {
                selectedIndex: 0,
                shownIndex: 0,
                cards: [],
            },
            editBtn: {
                clicked: false,
                disabled: false
            },
            clearBtn: {
                disabled: false
            },
            viewBtnsDisable: false,
        }
        this.setPrevStage = this.setPrevStage.bind(this);
        this.setNextStage = this.setNextStage.bind(this);
        this.fieldOnChange = this.fieldOnChange.bind(this);
        this.checkDrawBtnVisibility = this.checkDrawBtnVisibility.bind(this);
        this.set2d = this.set2d.bind(this);
        this.set3d = this.set3d.bind(this);
        this.clearScene = this.clearScene.bind(this);
        this.editObject = this.editObject.bind(this);
        this.endAddVertices = this.endAddVertices.bind(this);
        this.showMaterialList = this.showMaterialList.bind(this);
        this.chooseCard=this.chooseCard.bind(this);
        this.showPrevMaterial=this.showPrevMaterial.bind(this);
        this.showNextMaterial=this.showNextMaterial.bind(this);
    }

    componentDidMount() {
    }

    setNextStage() {
        let newStageId = this.state.stageId + 1;
        this.setState({
            stageId: newStageId,
            drawBtnVisibility: false,
            materialListVisiblity: false
        });
        const stageName = stages[newStageId].name;
        let value = null;
        if (stageName === 'innerWalls' || stageName === 'interior') {
            appState.changeState( 'stageSwitched', {newStageId, stageName} );
            value = stages[newStageId].fields[0].value;
            appState.changeState( 'floorVisibility', {value, stageName});
        }
        if (!value) {
            appState.changeState( 'stageSwitched', {newStageId, stageName} );
        } 
        this.checkDrawBtnVisibility(newStageId);
    }

    setPrevStage() {
        let newStageId = this.state.stageId - 1;
        this.setState({
            stageId: newStageId,
            drawBtnVisibility: false,
            materialListVisiblity: false
        });
        const stageName = stages[newStageId].name;
        let value = null;
        if (stageName === 'innerWalls' || stageName === 'interior') {
            appState.changeState( 'stageSwitched', {newStageId, stageName} );
            value = stages[newStageId].fields[0].value;
            appState.changeState( 'floorVisibility', {value});
        }
        if (!value) {
            appState.changeState( 'stageSwitched', {newStageId, stageName} );
        } 
        this.checkDrawBtnVisibility(newStageId);
    }

    fieldOnChange(event) {
        let House = appState.house;
        let value = event.target.value;
        let name = event.target.name;
        let index = this.state.stageId;
        let num;
        //изменение значения по умолчанию в stages
        for (let i = 0; i < stages[index].fields.length; i++) {
            if (stages[index].fields[i].fieldId === name) {
                num=i;
                break;
            }
        }
        
        // для корректной работы checkbox (чтобы галочка снималась при повторном нажатии)
        if ((stages[index].fields[num].value === value) && (stages[index].fields[num].type === 'checkbox')) {
            stages[index].fields[num].value = -1;
            this.setState({});
        }
        else {
            stages[index].fields[num].value = value;

            this.setState({});
        }

        this.checkOptionFieldsVisibility(index, num);        //проверка зависимых полей

        //отслеживание добавления подвала
        if (name === 'cellarExistence') {
            House.cellarExistence = stages[index].fields[num].value === value ? true : false;
        }
        //отслеживание добавления мансарды 
        if (name === 'mansardExistence') {
            House.mansardExistence = stages[index].fields[num].value === value ? true : false;
        }
        //жилая ли мансарда
        if (name === 'mansardLiving') {
            House.mansardLiving = stages[index].fields[num].value === value ? true : false;
        }
        //отслеживание добавления веранды 
        if (name === 'verandaExistence') {
            House.verandaExistence = stages[index].fields[num].value === value ? true : false;
        }

        this.changeFloorList(name, value);

        if (stages[index].condition) {
            this.checkDrawBtnVisibility(index);
        }

        const currentStage = this.state.stageId;
        const stageName = stages[index].name;
        let viewMode = this.state.viewMode;
        if (name.indexOf('Material')>-1) {
            appState.changeState( 'materialChanged', stageName);
        } else if (name.indexOf('Height')>-1) {
            appState.changeState( 'heightChanged', {stageName, height: Number(value)});
        }  else if (name==='editableFloor') {
            //меняем значения одновременно для 2 стадий, поскольку там одинаковые поля для выбора этажа
            if (stageName === 'innerWalls') {
                let floorSelect = stages.filter((el) => el.name === 'interior')[0].fields
                                        .filter((el) => el.fieldId === 'editableFloor')[0];
                floorSelect.value = value;                    
            } else if (stageName === 'interior') {
                let floorSelect = stages.filter((el) => el.name === 'innerWalls')[0].fields
                                        .filter((el) => el.fieldId === 'editableFloor')[0];
                floorSelect.value = value; 
            }
            appState.changeState( 'floorVisibility', {value});
        } else {
            appState.changeState( 'stageChanged', {currentStage, stageName, name, value, viewMode} );
            if (name === 'floors') {
                appState.house.setFloorPlanParametrs();
            }
            if (name === 'verandaExistence' && appState.house.verandaBasement.vertices.length < 4) {
                this.clearScene();
            }
        }

        // выключение режима редактирования при любых изменениях полей опроса (кроме галочки веранды)
        if (appState.editMode !== 'N' && (name != 'verandaExistence' || (name === 'verandaExistence' && appState.house.verandaBasement.vertices.length > 3))) {
            appState.editMode = 'N';
            appState.changeState('planEditMode', {mode: 'N', stageName : stageName} );
            this.setState({
                editBtn: {
                    clicked: false,
                    disabled: false
                },
                clearBtn: {
                    disabled: false
                },
                viewBtnsDisable: false,
            });
        }        
    }

    checkDrawBtnVisibility(index) {
        if (stages[index].condition) {
            let conditionFieldId = stages[index].condition.fieldId;
            if (conditionFieldId) {
                let conditionValue = stages[index].condition.value;
                let value = stages[index].fields
                    .filter(el => el.fieldId === conditionFieldId)[0].value;
                if (value === conditionValue) {
                    this.setState({
                        drawBtnVisibility: true
                    });
                } else {
                    this.setState({
                        drawBtnVisibility: false
                    });
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    checkOptionFieldsVisibility(index, num) {
        let conditionFieldId = stages[index].fields[num].fieldId;
        let fieldsNum = [];
        let conditions = [];
        for (let i = 0; i < stages[index].fields.length; i++) {
            if (stages[index].fields[i].depended.fieldId === conditionFieldId) {
                fieldsNum.push(i);
                conditions.push(stages[index].fields[i].depended.value);
            }
        }
        if (fieldsNum) {
            for (let i = 0; i < fieldsNum.length; i++) {
                if (conditions[i] === stages[index].fields[num].value) {
                    stages[index].fields[fieldsNum[i]].show = true;
                }
                else {
                    stages[index].fields[fieldsNum[i]].show = false;
                }
            }
        }
        else { return null; }
    }

    changeFloorList(name, value) {
        let House = appState.house;
        let editableFloorSelect = stages.filter((el) => el.name === 'innerWalls')[0].fields
                                        .filter((el) => el.fieldId === 'editableFloor')[0];
        if (name === 'floors' ) {
            //обновление списка
            let optionsCount = editableFloorSelect.options.length;
            if (House.mansardLiving) {
                optionsCount--;
                editableFloorSelect.options.pop();
            }
            if (editableFloorSelect.options[optionsCount-1] > value) {
                while (editableFloorSelect.options[optionsCount-1] > value) {
                    editableFloorSelect.options.pop();
                    optionsCount--;
                }
            } else {
                let dif;
                if (House.cellarExistence) {
                    dif=0;
                } else {
                    dif=1;
                }
                while (editableFloorSelect.options[optionsCount-1] < value) {
                    editableFloorSelect.options.push(String(optionsCount+dif));
                    optionsCount++;
                }
            }
            if (House.mansardLiving) {
                editableFloorSelect.options.push('Мансарда');
            }
        }
        if (name === 'cellarExistence') {
            if (House.cellarExistence) {
                editableFloorSelect.options.unshift('Подвал');
            } else {
                editableFloorSelect.options.shift();
            }
        }
        if (name === 'mansardLiving') {
            if (House.mansardLiving) {
                editableFloorSelect.options.push('Мансарда');
            } else {
                editableFloorSelect.options.pop();
            }
        }
        let floorSelect = stages.filter((el) => el.name === 'interior')[0].fields
                                        .filter((el) => el.fieldId === 'editableFloor')[0];
        floorSelect.options = editableFloorSelect.options;
        
    }

    set2d() {
        appState.changeState('changeView', '2D');

        this.setState({
            viewMode: '2D',
        });
    }

    set3d() {
        appState.changeState('changeView', '3D');

        this.setState({
            viewMode: '3D',
        });
    }

    clearScene() {
        appState.editMode = 'add';        
        let stageName = stages[this.state.stageId].name;
        appState.changeState('clearScene', stageName);
        appState.changeState('changeView', '2D');
        this.setState({
            editBtn: {
                clicked: true,
                disabled: this.state.editBtn.disabled
            },
            clearBtn: {
                disabled: true
            },
            viewMode: '2D',
            viewBtnsDisable: true,
        });
    }

    editObject() {
        if (stages[this.state.stageId].name === 'basement') {
            let linePointsCoords = appState.house.basement.vertices.slice();
            if (!this.state.editBtn.clicked) {
                if ((linePointsCoords[0] === 0) && (linePointsCoords[1] === 0) && (linePointsCoords[2] === 0) && (linePointsCoords.length < 4)) {
                    appState.editMode = 'add';
                    this.setState({
                        editBtn: {
                            clicked: !this.state.editBtn.clicked,
                            disabled: this.state.editBtn.disabled
                        },
                        clearBtn: {
                            disabled: true
                        },
                        viewBtnsDisable: true,
                    });
                }
                else {
                    appState.editMode = 'edit';
                    this.setState({
                        editBtn: {
                            clicked: !this.state.editBtn.clicked,
                            disabled: this.state.editBtn.disabled
                        },
                        viewBtnsDisable: true,
                    });
                }
                appState.changeState('planEditMode', {mode: 'T', stageName : 'basement'}  );
                this.set2d();
            }
            else {
                if (appState.editMode === 'add') {
                    if (linePointsCoords.length < 9) {
                        alert('Недостаточно вершин для построения. Начертите минимум 3 вершины');
                        return;
                    } else {appState.changeState('endAddVertices');}
                } else if (appState.editMode === 'edit') {
                    appState.changeState('shapeChangeEnd');
                }
                appState.editMode = 'N';
                this.setState({
                    editBtn: {
                        clicked: !this.state.editBtn.clicked,
                        disabled: this.state.editBtn.disabled
                    },
                    clearBtn: {
                        disabled: false
                    },
                    viewBtnsDisable: false,
                });
                appState.changeState('planEditMode',  {mode: 'N', stageName : 'basement'}  );
                this.set3d();
            }
        } else if (stages[this.state.stageId].name === 'innerWalls') {
            //получить вершины для первого этажа
            let activeFloor = appState.house.activeFloor;
            let linePointsCoords = appState.house.innerWalls[activeFloor].wallsVertices;
            if (!this.state.editBtn.clicked) {
                if (linePointsCoords.length === 0) {
                    appState.editMode = 'add';
                    this.setState({
                        editBtn: {
                            clicked: !this.state.editBtn.clicked,
                            disabled: this.state.editBtn.disabled
                        },
                        clearBtn: {
                            disabled: true
                        },
                        viewBtnsDisable: true,
                    });
                }
                else {
                    appState.editMode = 'edit';
                    this.setState({
                        editBtn: {
                            clicked: !this.state.editBtn.clicked,
                            disabled: this.state.editBtn.disabled
                        },
                        viewBtnsDisable: true,
                    });
                }
                appState.changeState('planEditMode', {mode: 'T', stageName : 'innerWalls'} );
                this.set2d();
            }
            else {
                appState.editMode = 'N';
                appState.changeState('endInnerWalls', { });
                this.setState({
                    editBtn: {
                        clicked: !this.state.editBtn.clicked,
                        disabled: this.state.editBtn.disabled
                    },
                    clearBtn: {
                        disabled: false
                    },
                    viewBtnsDisable: false,
                });
                appState.changeState('planEditMode', {mode: 'N', stageName : 'innerWalls'}  );
                this.set3d();
            }
            console.log('редактируем межкомнатные стены');
        } else if (stages[this.state.stageId].name === 'veranda') {
            let linePointsCoords = appState.house.verandaBasement.vertices.slice();
            if (!this.state.editBtn.clicked) {
                if ((linePointsCoords[0] === 0) && (linePointsCoords[1] === 0) && (linePointsCoords[2] === 0) && (linePointsCoords.length < 4)) {
                    appState.editMode = 'add';
                    this.setState({
                        editBtn: {
                            clicked: !this.state.editBtn.clicked,
                            disabled: this.state.editBtn.disabled
                        },
                        clearBtn: {
                            disabled: true
                        },
                        viewBtnsDisable: true,
                    });
                }
                else {
                    appState.editMode = 'edit';
                    this.setState({
                        editBtn: {
                            clicked: !this.state.editBtn.clicked,
                            disabled: this.state.editBtn.disabled
                        },
                        viewBtnsDisable: true,
                    });
                }
                appState.changeState('planEditMode', {mode: 'veranda', stageName : stages[this.state.stageId].name} );
                this.set2d();
            }
            else {
                // if (linePointsCoords.length < 9) {
                //     alert('Недостаточно вершин для построения. Начертите минимум 3 вершины');
                //     return;
                // } else {appState.changeState('endAddVertices', {stageName: stages[this.state.stageId].name});}
                appState.editMode = 'N';
                appState.changeState('stageChanged', {stageName: stages[this.state.stageId].name});
                this.setState({
                    editBtn: {
                        clicked: !this.state.editBtn.clicked,
                        disabled: this.state.editBtn.disabled
                    },
                    clearBtn: {
                        disabled: false
                    },
                    viewBtnsDisable: false,
                });
                appState.changeState('planEditMode', {mode: 'N', stageName : stages[this.state.stageId].name} );
                this.set3d();
            }
        }
    }

    endAddVertices() {
        appState.editMode = 'edit';
        this.setState({
            clearBtn: {
                disabled: false
            },
            viewBtnsDisable: true,
        });

    }

    //-------------------функции для работы списка материалов-----------------//
    showMaterialList() {
        let newState = !this.state.materialListVisiblity;

        let index = this.state.stageId;
        let materialField = stages[index].fields.filter((el) => (el.fieldId.indexOf('Material') > -1))[0];
        const selectedMaterial = materialField.value,
            materialArray = materialField.options;

        let shownMaterial = setShownIndex(selectedMaterial, materialArray);
        let cardsArray = setCards(shownMaterial, materialArray);

        this.setState({
            materialListVisiblity: newState,
            materialListProps: {
                selectedIndex: selectedMaterial,
                shownIndex: shownMaterial,
                cards: cardsArray,
            },
            materialList: materialArray,
        });
    }    

    chooseCard(event) {
        let classList = event.currentTarget.classList;
        let newSelectedIndex=-1;
        classList.forEach(element => {
            if (element.indexOf('cardIndex_')>-1) {
                newSelectedIndex = Number(element.split('_')[1]);
            }
        });
        let materialField = stages[this.state.stageId].fields.filter((el) => (el.fieldId.indexOf('Material') > -1))[0];
        materialField.value = newSelectedIndex;      

        appState.changeState( 'materialChanged', stages[this.state.stageId  ].name);
        this.setState({
            materialListProps: {
                selectedIndex: newSelectedIndex,
                shownIndex: this.state.materialListProps.shownIndex,
                cards: this.state.materialListProps.cards,
            },
        });
    }

    showPrevMaterial(){
        let currentShownIndex = this.state.materialListProps.shownIndex;
        let newShownIndex = currentShownIndex-1;
        let newCards = setCards(newShownIndex, this.state.materialList);
        this.setState({
            materialListProps: {
                selectedIndex: this.state.materialListProps.selectedIndex,
                shownIndex: newShownIndex,
                cards: newCards,
            },
        });
    }
    showNextMaterial(){
        let currentShownIndex = this.state.materialListProps.shownIndex;
        let newShownIndex = currentShownIndex+1;
        let newCards = setCards(newShownIndex, this.state.materialList);
        this.setState({
            materialListProps: {
                selectedIndex: this.state.materialListProps.selectedIndex,
                shownIndex: newShownIndex,
                cards: newCards,
            },
        });
    }

    //------------конец функций для работы со списокм материалов--------------------//
    render() {
        return (
            <div className={classes.display_box}>
            <div className={classes.content}>
                <Interview
                    stageInfo={stages[this.state.stageId]}
                    onchange={this.fieldOnChange}
                    drawBtnVisibility={this.state.drawBtnVisibility}
                    prevDisabled={this.state.stageId === 0}
                    prevOnClick={this.setPrevStage}
                    nextDisabled={this.state.stageId === stages.length - 1}
                    nextOnClick={this.setNextStage}
                    clearBtnClicked={this.clearScene}
                    editBtnClicked={this.editObject}
                    editBtn={this.state.editBtn}
                    clearBtn={this.state.clearBtn}
                    showList={this.showMaterialList}
                    materialListVisiblity={this.state.materialListVisiblity}
                />
                <Interactive
                    className={classes.interactive}
                    stageId={this.state.stageId}
                    viewMode={this.state.viewMode}
                    // editMode={this.state.editMode}
                    handleClick2d={this.set2d}
                    handleClick3d={this.set3d}
                    endAddVertices={this.endAddVertices}
                    viewBtnsDisable={this.state.viewBtnsDisable}
                />
                <TotalData />
                <MaterialList 
                    visibility={this.state.materialListVisiblity}
                    selectedIndex={this.state.materialListProps.selectedIndex}
                    shownIndex={this.state.materialListProps.shownIndex}
                    cards={this.state.materialListProps.cards}
                    materialCount={this.state.materialList.length}
                    nextMaterial={this.showNextMaterial}
                    prevMaterial={this.showPrevMaterial}
                    chooseCard={this.chooseCard}
                />
            </div>
            </div>
        );
    }
}

function setShownIndex(index, materials) {
    let shownMaterial;
    if (index + 2 <= materials.length) {
        shownMaterial=index;
    } else if (index + 1 < materials.length && index-2>=0) {
        shownMaterial=index-1;    
    } else if (index < materials.length && index-2>=0) {
        shownMaterial=index-2;
    }
    return shownMaterial;
} 
function setCards(index, materials) {
    let card1 = materials[index],
        card2 = materials.length>1 ? materials[index+1] : {},
        card3 = materials.length>2 ? materials[index+2] : {};
    return [card1, card2, card3];
}

export { Display };