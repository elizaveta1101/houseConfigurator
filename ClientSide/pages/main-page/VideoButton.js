import React from 'react';

import './VideoButton.css';


function VideoButton() {
    return (
        <>
            <div className="video-btn-circle">
                <svg className="video-btn-circle-1" width="110" height="110" viewBox="0 0 120 120" stroke-width="2.5">
                    <circle className="video-btn-circle-1-preload" cx="60" cy="60" r="58.2" fill="none" stroke="#325FFF" opacity={0.1} stroke-width="3" stroke-dasharray="0 400"/>
                </svg>
                <svg className="video-btn-circle-2" width="110" height="110" viewBox="0 0 120 120" stroke-width="2.5">
                    <circle className="video-btn-circle-2-preload" cx="60" cy="60" r="58.2" fill="none" stroke="#325FFF" opacity={0.1} stroke-width="2" stroke-dasharray="0 400"/>
                </svg>

                <div className="play-btn-hover">
                    <div className="btn-circle1-hover">
                        <svg className="btn-circle1" width="110" height="110" viewBox="0 0 120 120" stroke-width="2.5">
                            <circle className="btn-circle1-preload" cx="60" cy="60" r="57.2" fill="none" stroke="#325FFF" stroke-width="6" stroke-dasharray="0 400"/>
                        </svg>
                    </div>

                    <div className="btn-circle2-hover">
                        <svg className="btn-circle2" width="110" height="110" viewBox="0 0 120 120" stroke-width="2.5">
                            <circle className="btn-circle2-preload" cx="60" cy="60" r="57.2" fill="none" stroke="#325FFF" stroke-width="3" stroke-dasharray="0 400"/>
                        </svg>
                    </div>

                    <svg className="pre-play-btn-1" width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0" d="M19.2132 8.78679C14.3739 3.94753 8.02554 0.908325 1.22136 0.173454L0.581444 6.09839C6.034 6.68728 11.1213 9.12276 14.9993 13.0007L19.2132 8.78679Z" fill="#325FFF"/>
                    </svg>
                    <svg className="pre-play-btn-2" width="9" height="21" viewBox="0 0 9 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0" d="M7.97797 20.7646C9.74926 14.1541 9.20709 7.13658 6.44142 0.876553L0.990319 3.28484C3.2066 8.30134 3.64107 13.9248 2.22164 19.2222L7.97797 20.7646Z" fill="#325FFF"/>
                    </svg>
                    <svg className="pre-play-btn-3" width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0" d="M1.76477 14.9778C8.37532 13.2065 14.1816 9.22825 18.2201 3.7031L13.4089 0.18645C10.1726 4.61406 5.51976 7.80206 0.222363 9.22149L1.76477 14.9778Z" fill="#325FFF"/>
                    </svg>

                    <div className="play-btn-text">
                        <p>Видео-презентация</p>
                        <h1>Нашей компании</h1>
                    </div>

                </div>
                <svg className="play-btn" opacity={0} width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 13.2679C25.3333 14.0378 25.3333 15.9622 24 16.732L3 28.8564C1.66666 29.6262 -1.38408e-06 28.664 -1.31678e-06 27.1244L-2.56832e-07 2.87564C-1.89534e-07 1.33604 1.66667 0.373792 3 1.14359L24 13.2679Z" fill="#325FFF"/>
                </svg>
                <div className="pre-h2-circle" />

                <div className="more-about">
                    <h2>Узнайте больше о нас</h2>
                </div>

                <svg className="play-line-1" width="230" height="140">
                    <rect className="play-line-1-preload" x="5" y="5" width="0" height="1" fill="#989898" opacity={0.5}/>
                </svg>
                <svg className="play-line-2" width="230" height="140">
                    <rect className="play-line-2-preload" x="5" y="5" width="0" height="1" fill="#989898" opacity={0.5}/>
                </svg>
            </div>
        </>
    );
}

export default VideoButton;