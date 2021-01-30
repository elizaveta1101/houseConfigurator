import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { setFilterSquare } from "../../../redux/actions/houses";

import '../CostSlider/CostSlider.css'

const useStyles = makeStyles({
    root: {
        width: 185,
    },
});

function valuetext(value) {
    return `${value}°C`;
}

const PrettoSlider = withStyles({
    root: {
        color: '#325FFF',
    },
    thumb: {
        height: 10,
        width: 8,
        backgroundColor: '#325FFF',
        border: '1px solid #fff',
        marginTop: -4,
        marginLeft: -4,
        marginRight: 0,
        borderRadius: 3,
        '&:focus, &:hover, &$active': {
            boxShadow: 'none',
        },
    },
    active: {},

})(Slider)

function AirbnbThumbComponent(props) {
    return (
        <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
    );
}

let initial_square = 0

export default function SquareSlider() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const square = useSelector(({houses}) => houses.squareArr)

    let first_value = 0
    let second_value = square

    if (typeof square === "number"){
        initial_square = square
    }
    if (typeof square === "string"){
        first_value = Number(square.split('-')[0])
        second_value = Number(square.split('-')[1])
    }

    const [value, setValue] = React.useState([first_value, second_value]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let stringed = value.join('-')
    dispatch(setFilterSquare(stringed))

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Площадь дома
            </Typography>
            <div className="slider-input">{value[0]} -<span>{value[1]} <p>кв м</p></span></div>
            <PrettoSlider className="cost-slider"
                          value={value}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                          getAriaValueText={valuetext}
                          max={initial_square}
                          min={0}
                          disabled={false}
                          ThumbComponent={AirbnbThumbComponent}
            />
        </div>
    );
}
