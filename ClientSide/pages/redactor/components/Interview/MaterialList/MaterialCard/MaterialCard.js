import React from 'react';
import classes from './MaterialCard.module.css';

function MaterialCard (props) {
    return (
        <div className={classes.card+ ' '+(props.selectedCard ? classes.selectedCard : '') + ' cardIndex_'+props.index}
            onClick={props.onClick}
        >
            <div className={classes.card_image}>
                <div className={classes.card__image} style={{backgroundImage: 'url(' + props.data.url + ')'}}></div>
            </div>
            <hr className={classes.hr} />
            <div className={classes.card_producer}>
                <div className={classes.card__producer}>{props.data.producer}</div>
            </div>
            <div className={classes.card_title}>
                <div className={classes.card__title}>{props.data.name}</div>
            </div>
            <div className={classes.card_description}>
                <div className={classes.card__description}>{props.data.description}</div>
            </div>
        </div>
    );
}

export {MaterialCard};