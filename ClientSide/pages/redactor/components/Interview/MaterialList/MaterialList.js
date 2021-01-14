import React from 'react';
import classes from './MaterialList.module.css';
import {NextMaterial,PrevMaterial} from './MaterialArrow/MaterialArrow.js';
import {MaterialCard} from './MaterialCard/MaterialCard';


function MaterialList(props) {
    return (
        <div className = {classes.matlist}>
            <div className = {classes.list}
            style = {{display: props.visibility ? "grid" : "none"}}
            >
                <PrevMaterial
                    onClick={props.prevMaterial}
                    disabled={props.shownIndex===0 ? true : false}
                />
                {props.cards[0] && props.cards[0]!=={} ?
                    <MaterialCard
                        index={props.shownIndex}
                        data={props.cards[0]}
                        selectedCard={props.shownIndex===props.selectedIndex ? true : false}
                        onClick={props.chooseCard}
                    />
                    : null
                }
                {props.cards[1] && props.cards[1]!=={} ?
                    <MaterialCard
                        index={props.shownIndex+1}
                        data={props.cards[1]}
                        selectedCard={props.shownIndex+1===props.selectedIndex ? true : false}
                        onClick={props.chooseCard}
                    />
                    : null
                }
                {props.cards[2] && props.cards[2]!=={} ?
                    <MaterialCard
                        index={props.shownIndex+2}
                        data={props.cards[2]}
                        selectedCard={props.shownIndex+2===props.selectedIndex ? true : false}
                        onClick={props.chooseCard}
                    />
                    : null
                }
                <NextMaterial
                    onClick={props.nextMaterial}
                    disabled={props.shownIndex+2>=props.materialCount-1 ? true : false}
                />
            </div>
        </div>
    );
}

export {
    MaterialList
};