import React from 'react';
import {Link} from 'react-router-dom'

import './CentralBtn.css';


function CentralButton() {
    return (
        <>
            <Link className="central-btn-wrapper" to="/redactor_page"><div>
                <div className="central-btn">
                    <div className="central-btn-circle1-box">
                        <svg className="central-btn-circle1" width="110" height="110" viewBox="0 0 120 120" stroke-width="2.5">
                            <circle className="central-btn-circle1-preload" cx="60" cy="60" r="57.2" fill="none" stroke="#325FFF" stroke-width="7" stroke-dasharray="320 80"/>
                        </svg>
                    </div>
                    <div className="central-btn-circle2-box">
                        <svg className="central-btn-circle2" width="110" height="110" viewBox="0 0 120 120" stroke-width="2.5">
                            <circle className="central-btn-circle2-preload" cx="60" cy="60" r="57.2" fill="none" stroke="#325FFF" stroke-width="3" stroke-dasharray="300 100"/>
                        </svg>
                    </div>

                    <svg className="central-btn-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M48.0004 46.9999V9.99995C48.0004 9.53926 47.4179 8.99995 47 8.99995L10.0024 8.99997V0.749064C10.0024 0.288381 9.41994 0 9.00204 0C4.00244 2.57492e-05 0 1.99997 0 5.99995V40C0 45 3.00254 48 10.0024 48L28.8575 47.9999H47C47.4179 47.9999 48.0004 47.4606 48.0004 46.9999ZM3.00204 34C4.00244 33 6.50244 32.2617 7.0005 32.2617V3.32526C5.00244 3.32526 3.00244 3.99995 3.00244 5.99995L3.00204 34ZM45.0024 44.9999L10.0024 45C6.00244 45 3.00244 43 3.00204 40C3.00165 37.1263 5.25501 35.1597 9.00244 35C9.50244 35 10.0024 34.5 10.0024 34L10.0023 12L45.0024 11.9999V44.9999ZM23.0024 18.9999L17.5024 24.4999H19.0024C19.5547 24.4999 20.0024 24.9476 20.0024 25.4999V27.4999V32.4999H22.0024C22.5547 32.4999 23.0024 32.9476 23.0024 33.4999V34.4999C23.0024 35.0522 22.5547 35.4999 22.0024 35.4999H19.0024H18.0024C17.4501 35.4999 17.0024 35.0522 17.0024 34.4999V33.4999V27.4999H14.0024C13.4501 27.4999 13.0024 27.0522 13.0024 26.4999V25.4999C13.0024 24.4999 13.385 24.1174 14.0024 23.4999C16.5024 20.9999 23.0025 14 23.0025 14L30.2953 21.2929C30.6859 21.6834 30.6859 22.3166 30.2953 22.7071L29.2095 23.7929C28.819 24.1834 28.1859 24.1834 27.7953 23.7929L23.0024 18.9999ZM35.0024 26C34.4502 26 34.0024 26.4477 34.0024 27V32.5H28.5024C27.9502 32.5 27.5024 32.9477 27.5024 33.5V34.5C27.5024 35.0523 27.9502 35.5 28.5024 35.5H34.0024V41C34.0024 41.5523 34.4502 42 35.0024 42H36.0024C36.5547 42 37.0024 41.5523 37.0024 41V35.5H42.5024C43.0547 35.5 43.5024 35.0523 43.5024 34.5V33.5C43.5024 32.9477 43.0547 32.5 42.5024 32.5H37.0024V27C37.0024 26.4477 36.5547 26 36.0024 26H35.0024Z" fill="white"/>
                    </svg>
                </div>
            </div></Link>
        </>
    );
}

export default CentralButton;