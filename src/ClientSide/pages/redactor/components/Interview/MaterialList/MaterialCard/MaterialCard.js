import React from 'react';
import classes from './MaterialCard.module.css';

function MaterialCard (props) {
    return (
        <div className={classes.card+ ' '+(props.selectedCard ? classes.selectedCard : '') + ' cardIndex_'+props.index}
            onClick={props.onClick}
        >
            <div className={classes.card__image__wrapper}>
                <div className={classes.card__image} style={{backgroundImage: 'url(' + props.data.url + ')'}}></div>
            </div>
            <div className={classes.card__producer}>{props.data.producer}</div>
            <div className={classes.card__title}>{props.data.name}</div>
            <div className={classes.card__price}>Цена – 280 р/м2</div>
            <div className={classes.card__description}>{props.data.description}описание описание
                описание описание описание описание описание описание описание описание описание описание</div>
        </div>
    );
}

export {MaterialCard};