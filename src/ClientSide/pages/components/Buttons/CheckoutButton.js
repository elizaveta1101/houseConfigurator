import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'class-names'

import './CheckoutButton.css'

const CheckoutButton = ({children, onClick, className, disabled, active}) => {
    const classes = classNames(
        'btn',
        className,
        {active},
    )

    return(
        <button className={classes} disabled={disabled} onClick={onClick}>{children}</button>
    );
};

CheckoutButton.propTypes ={
    children: PropTypes.node,
    onClick: PropTypes.func,
    classNames: PropTypes.string,
    disabled: PropTypes.bool,
}

CheckoutButton.defaultProps ={
    children: 'Default Button',
    onClick: () => {},
    className: '',
    disabled: false,
    active: false,
}

export default CheckoutButton;