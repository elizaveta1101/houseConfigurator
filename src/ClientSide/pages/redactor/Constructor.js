import React from 'react';

import { Display } from "./components/Display/Display";

import './RedactorPage.css';
import '../housepage/HouseProjectPage.css'

function Constructor() {
    return (
        <div className="display-wrapper">
            <Display/>
        </div>
    );
}

export default Constructor;