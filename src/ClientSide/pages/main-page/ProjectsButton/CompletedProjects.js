import React from 'react';
import {Link} from 'react-router-dom'

import './CompletedProjects.css';
import {catalogProjects} from "../../../data/constants";


function CompletedProjects() {
    return (
        <>
            <div className="completed-circle">
                <svg className="completed-circle-1" width="110" height="110" viewBox="0 0 120 120" strokeWidth="2.5">
                    <circle className="completed-circle-1-preload" cx="60" cy="60" r="58.2" fill="none" stroke="#325FFF" opacity={0.1} strokeWidth="3" strokeDasharray="0 400"/>
                </svg>
                <svg className="completed-circle-2" width="110" height="110" viewBox="0 0 120 120" strokeWidth="2.5">
                    <circle className="completed-circle-2-preload" cx="60" cy="60" r="58.2" fill="none" stroke="#325FFF" opacity={0.1} strokeWidth="2" strokeDasharray="0 400"/>
                </svg>

                <Link to={catalogProjects}><div className="completed-btn-hover">
                    <div className="completed-btn-circle1-hover">
                        <svg className="completed-btn-circle1-preload" width="110" height="110" viewBox="0 0 120 120" strokeWidth="2.5">
                            <circle className="completed-btn-circle1-preload" cx="60" cy="60" r="57.6" fill="none" stroke="#325FFF" strokeWidth="6" strokeDasharray="0 400"/>
                        </svg>
                    </div>
                    <div className="completed-btn-circle2-hover">
                        <svg className="completed-btn-circle2" width="110" height="110" viewBox="0 0 120 120" strokeWidth="2.5">
                            <circle className="completed-btn-circle2-preload" cx="60" cy="60" r="57.6" fill="none" stroke="#325FFF" strokeWidth="3" strokeDasharray="0 400"/>
                        </svg>
                    </div>

                    <svg className="completed-btn-icon" opacity={0} width="44" height="48" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.2381 44.0002L4.7619 43.998C4.34057 43.998 4 43.6582 4 43.2394V0.761215C4 0.342456 4.34057 0.00259399 4.7619 0.00259399L38.6667 0.000244141C38.8686 0.000244141 39.0629 0.0798993 39.2053 0.221761L43.7768 4.76893C43.92 4.91155 44 5.10424 44 5.30604V43.2416C44 43.4434 43.92 43.6361 43.7768 43.778C43.6335 43.9198 43.4408 44.0002 43.2381 44.0002ZM6 42.0002H42V5.61631L38.3512 2.00024H6V42.0002Z" fill="#989898"/>
                        <path d="M0.761905 47.998L39.2381 48.0002C39.4408 48.0002 39.6335 47.9198 39.7768 47.7779C39.92 47.6361 40 47.4434 40 47.2416V44.0002H38V46.0002H2V6.00021H4V4.00024L0.761905 4.00256C0.340571 4.00256 0 4.34243 0 4.76118V47.2394C0 47.6582 0.340571 47.998 0.761905 47.998Z" fill="#989898"/>
                        <path d="M18 9.00018L12.5 14.5002H14C14.5523 14.5002 15 14.9479 15 15.5002V17.5002V22.5002H17C17.5523 22.5002 18 22.9479 18 23.5002V24.5002C18 25.0525 17.5523 25.5002 17 25.5002H14H13C12.4477 25.5002 12 25.0525 12 24.5002V23.5002V17.5002H9C8.44771 17.5002 8 17.0525 8 16.5002V15.5002C8 14.5002 8.38253 14.1177 9 13.5002C11.5 11.0002 18 4.00024 18 4.00024L25.2929 11.2932C25.6834 11.6837 25.6834 12.3168 25.2929 12.7073L24.2071 13.7932C23.8166 14.1837 23.1834 14.1837 22.7929 13.7932L18 9.00018Z" fill="#325FFF"/>
                        <path d="M37.25 17.5002H20.75C20.3353 17.5002 20 17.1642 20 16.7502C20 16.3362 20.3353 16.0002 20.75 16.0002H37.25C37.6647 16.0002 38 16.3362 38 16.7502C38 17.1642 37.6647 17.5002 37.25 17.5002Z" fill="#989898"/>
                        <path d="M37.25 21.5002H20.75C20.3353 21.5002 20 21.1642 20 20.7502C20 20.3362 20.3353 20.0002 20.75 20.0002H37.25C37.6647 20.0002 38 20.3362 38 20.7502C38 21.1642 37.6647 21.5002 37.25 21.5002Z" fill="#989898"/>
                        <path d="M37.25 25.5002H20.75C20.3353 25.5002 20 25.1642 20 24.7502C20 24.3362 20.3353 24.0002 20.75 24.0002H37.25C37.6647 24.0002 38 24.3362 38 24.7502C38 25.1642 37.6647 25.5002 37.25 25.5002Z" fill="#989898"/>
                        <path d="M22.3188 32.5002H8.75C8.33525 32.5002 8 32.1642 8 31.7502C8 31.3362 8.33525 31.0002 8.75 31.0002H22.3188C22.7336 31.0002 23.0688 31.3362 23.0688 31.7502C23.0688 32.1642 22.7336 32.5002 22.3188 32.5002Z" fill="#989898"/>
                        <path d="M22.3188 36.5002H8.75C8.33525 36.5002 8 36.1642 8 35.7502C8 35.3362 8.33525 35.0002 8.75 35.0002H22.3188C22.7336 35.0002 23.0688 35.3362 23.0688 35.7502C23.0688 36.1642 22.7336 36.5002 22.3188 36.5002Z" fill="#989898"/>
                        <path d="M29.9779 37.8076C29.8539 37.9313 29.6845 38.0002 29.5087 38.0002C29.3328 38.0002 29.1635 37.9313 29.0394 37.8076L25.2917 34.0943C24.9028 33.709 24.9028 33.0842 25.2917 32.6997L25.761 32.2346C26.15 31.8494 26.78 31.8494 27.1689 32.2346L29.5087 34.5527L35.8311 28.2892C36.2202 27.9039 36.8507 27.9039 37.239 28.2892L37.7083 28.7542C38.0972 29.1395 38.0972 29.7642 37.7083 30.1489L29.9779 37.8076Z" fill="#325FFF"/>
                    </svg>

                    <div className="completed-btn-text">
                        <p>Готовые</p>
                        <h1>Проекты</h1>
                    </div>
                </div></Link>

                <svg className="completed-line-1" width="230" height="140">
                    <rect className="completed-line-1-preload" x="5" y="5" width="0" height="1" fill="#989898" opacity={0.5}/>
                </svg>
                <svg className="completed-line-2" width="230" height="140">
                    <rect className="completed-line-2-preload" x="5" y="5" width="0" height="1" fill="#989898" opacity={0.5}/>
                </svg>
            </div>
        </>
    );
}

export default CompletedProjects;
