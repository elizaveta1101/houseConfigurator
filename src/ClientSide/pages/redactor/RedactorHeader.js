import React from 'react';
import { Link } from "react-router-dom";

import './RedactorHeader.css';

function RedactorHeader() {
    return (
        <div className="redactor-header-wrapper">
            <div className="redactor-header__left-box">
                <svg className="redactor-header-logo" width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M48.8891 10.8341L48.8714 10.8234L48.8308 10.7963C48.791 10.7698 48.7333 10.7319 48.6595 10.684C48.5118 10.5884 48.2991 10.4533 48.0337 10.2917C47.5039 9.96912 46.7599 9.53852 45.9029 9.10689C44.2347 8.26666 41.9687 7.33333 40 7.33333C38.0313 7.33333 35.7653 8.26666 34.0971 9.10689C33.2401 9.53852 32.4961 9.96912 31.9663 10.2917C31.7009 10.4533 31.4882 10.5884 31.3405 10.684C31.2667 10.7319 31.209 10.7698 31.1692 10.7963L31.1286 10.8234L31.1109 10.8341L30.9974 10.9027L30.5596 11.1677C30.1784 11.3984 29.6247 11.7339 28.9343 12.1529C27.5534 12.991 25.6254 14.1634 23.4369 15.5009C19.0611 18.175 13.6387 21.5118 9.46495 24.1552C8.26031 24.9181 7.32122 26.1319 6.68704 27.366C6.05434 28.5973 5.66667 29.9627 5.66667 31.1111L5.66667 36.3889L5.66667 68.0556C5.66667 69.856 5.99741 71.438 7.3668 72.7389C8.73258 74.0364 10.603 74.3333 12.2222 74.3333H67.7778C69.5673 74.3333 71.1349 74.1623 72.6332 72.7389C74.1573 71.291 74.3333 69.4406 74.3333 68.0556V36.3889V31.1111C74.3333 29.9769 73.945 28.6116 73.3136 27.3788C72.6806 26.1428 71.7418 24.9195 70.535 24.1552C66.3613 21.5118 60.9389 18.175 56.5631 15.5009C54.3746 14.1634 52.4466 12.991 51.0657 12.1529C50.3753 11.7339 49.8216 11.3984 49.4404 11.1677L49.0026 10.9027L48.8891 10.8341ZM49.4974 4.19794L49.4974 4.19798L49.5332 4.21947L49.6743 4.30426C49.7985 4.37896 49.9821 4.48946 50.2195 4.6325C50.6941 4.91858 51.3835 5.33483 52.2421 5.8552C53.9594 6.89598 56.3533 8.35311 59.0592 10.0183C64.4743 13.3507 71.128 17.5094 76.112 20.8321C78.1782 22.2096 79 24.5368 79 26.6667V33.3333V70C79 70.2571 78.9215 70.6712 78.7363 71.2205C78.5565 71.7537 78.2972 72.3528 77.9884 72.958C77.3614 74.1865 76.5842 75.3349 75.9596 75.9596C75.3164 76.6027 74.2502 77.3804 73.0906 77.9958C71.9073 78.6238 70.781 79 70 79H10C9.70032 79 9.25584 78.9123 8.69156 78.7171C8.14106 78.5268 7.53447 78.2547 6.93031 77.9366C5.70352 77.2908 4.59318 76.5123 4.04044 75.9596C3.47448 75.3936 2.69534 74.34 2.05808 73.1619C1.40709 71.9584 1 70.7992 1 70V33.3333V26.6667C1 24.5008 1.82004 22.2107 3.88803 20.8321C8.87202 17.5094 15.5257 13.3507 20.9408 10.0183C23.6467 8.35311 26.0406 6.89598 27.7579 5.8552C28.6165 5.33483 29.3059 4.91858 29.7805 4.6325C30.0179 4.48946 30.2015 4.37896 30.3257 4.30426L30.4668 4.21947L30.5026 4.19798L30.5026 4.19797L30.5058 4.19619L30.5514 4.17077C30.5925 4.14801 30.6546 4.11394 30.7357 4.07016C30.898 3.98258 31.1364 3.85632 31.4361 3.70428C32.0362 3.39979 32.878 2.99393 33.8433 2.58874C35.8109 1.76291 38.1541 1 40 1C41.8459 1 44.1891 1.76291 46.1567 2.58874C47.122 2.99393 47.9638 3.39979 48.5639 3.70428C48.8636 3.85632 49.102 3.98258 49.2643 4.07016C49.3454 4.11394 49.4075 4.14801 49.4486 4.17076L49.4942 4.19619L49.4974 4.19794Z" fill="#444444" stroke="#444444" strokeWidth="2"/>
                    <path d="M24.2929 54.0402L24.2929 54.0402L24.2929 54.0402L24.2929 54.0402L24.2946 54.0419C25.1521 54.8994 26.5045 56.2518 28.9612 57.3685C31.4084 58.4809 34.8883 59.3332 40 59.3332C45.1117 59.3332 48.5917 58.4809 51.0389 57.3685C53.4957 56.2518 54.848 54.8995 55.7055 54.042L55.7071 54.0404C56.1307 53.6168 56.8485 53.5253 57.6105 53.9825C58.35 54.4262 59 55.3501 59 56.6665C59 57.9821 58.4431 58.9517 57.4271 59.725C56.3674 60.5315 54.8074 61.1171 52.882 61.5212C49.0331 62.3289 44.1456 62.3332 40 62.3332H39.9998C35.8542 62.3332 30.9668 62.3289 27.1179 61.5212C25.1926 61.1171 23.6326 60.5315 22.5728 59.725C21.5569 58.9517 21 57.9821 21 56.6665C21 55.35 21.65 54.426 22.3895 53.9823C23.1515 53.5251 23.8693 53.6166 24.2929 54.0402Z" fill="#444444" stroke="#444444" strokeWidth="2"/>
                    <path d="M22.333 36.6665L22.333 36.6665C22.333 37.2026 22.3303 37.6352 22.3081 37.9823C22.2186 37.469 21.9845 36.8445 21.3238 36.3702C20.6421 35.8807 19.6587 35.6666 18.3331 35.6666C17.0075 35.6666 16.0241 35.8807 15.3424 36.3702C14.7236 36.8145 14.479 37.3906 14.377 37.8836C14.3347 37.4594 14.3332 37.0126 14.3332 36.6666C14.3332 36.007 14.495 35.596 14.6908 35.325C14.891 35.0477 15.1857 34.8359 15.5796 34.6784C16.4129 34.345 17.4659 34.3332 18.3331 34.3332C19.2004 34.3332 20.2534 34.345 21.0867 34.6784C21.4806 34.8359 21.7752 35.0477 21.9755 35.3249C22.1712 35.5959 22.333 36.007 22.333 36.6665Z" fill="#325FFF" stroke="#325FFF" strokeWidth="2"/>
                </svg>

                <div className="back-to-site">
                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.72659 1.83686V0.478068C8.72659 0.360294 8.59124 0.295255 8.49983 0.367325L0.575611 6.55658C0.508284 6.60894 0.453805 6.67599 0.41633 6.7526C0.378856 6.82922 0.359375 6.91338 0.359375 6.99867C0.359375 7.08396 0.378856 7.16813 0.41633 7.24474C0.453805 7.32136 0.508284 7.3884 0.575611 7.44076L8.49983 13.63C8.59299 13.7021 8.72659 13.6371 8.72659 13.5193V12.1605C8.72659 12.0744 8.68616 11.9917 8.61936 11.939L2.29124 6.99955L8.61936 2.05834C8.68616 2.00561 8.72659 1.92299 8.72659 1.83686Z" fill="#444444"/>
                    </svg>
                    <Link to="/"><p>Вернуться на сайт</p></Link>
                </div>
            </div>

            <div className="redactor-header__right-box">
                <div className="calc-cost">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.625 2.625H3.375C2.96016 2.625 2.625 2.96016 2.625 3.375V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V3.375C21.375 2.96016 21.0398 2.625 20.625 2.625ZM19.6875 19.6875H4.3125V4.3125H19.6875V19.6875Z" fill="#325FFF"/>
                        <path d="M4.3125 19.6875H19.6875V4.3125H4.3125V19.6875ZM10.3172 17.9297H9.12656C9.075 17.9297 9.02109 17.9039 8.98828 17.8617L8.15625 16.8422L7.32422 17.8617C7.30799 17.883 7.28706 17.9002 7.26306 17.912C7.23907 17.9237 7.21267 17.9298 7.18594 17.9297H5.99531C5.84063 17.9297 5.75625 17.7445 5.85938 17.6227L7.32891 15.8227L5.89453 14.0672C5.79375 13.9453 5.87812 13.7602 6.03281 13.7602H7.22578C7.27734 13.7602 7.33125 13.7859 7.36406 13.8281L8.16094 14.8031L8.95781 13.8281C8.99297 13.7836 9.04219 13.7602 9.09609 13.7602H10.2867C10.4414 13.7602 10.5258 13.9453 10.425 14.0672L8.98828 15.8203L10.4578 17.6203C10.5563 17.7445 10.4719 17.9297 10.3172 17.9297ZM13.5 7.85156C13.5 7.8 13.5328 7.75781 13.575 7.75781H18.1102C18.1547 7.75781 18.1875 7.8 18.1875 7.85156V8.97656C18.1875 9.02812 18.1547 9.07031 18.1125 9.07031H13.575C13.5328 9.07031 13.5 9.02812 13.5 8.97656V7.85156ZM13.5 14.0625C13.5 14.0109 13.5328 13.9688 13.575 13.9688H18.1102C18.1547 13.9688 18.1875 14.0109 18.1875 14.0625V15.1875C18.1875 15.2391 18.1547 15.2812 18.1125 15.2812H13.575C13.5328 15.2812 13.5 15.2391 13.5 15.1875V14.0625ZM13.5 16.5C13.5 16.4484 13.5328 16.4062 13.575 16.4062H18.1102C18.1547 16.4062 18.1875 16.4484 18.1875 16.5V17.625C18.1875 17.6766 18.1547 17.7188 18.1125 17.7188H13.575C13.5328 17.7188 13.5 17.6766 13.5 17.625V16.5ZM5.8125 7.85156C5.8125 7.8 5.84531 7.75781 5.8875 7.75781H7.5V6.14531C7.5 6.10313 7.54219 6.07031 7.59375 6.07031H8.71875C8.77031 6.07031 8.8125 6.10313 8.8125 6.14531V7.75781H10.4227C10.4672 7.75781 10.5 7.8 10.5 7.85156V8.97656C10.5 9.02812 10.4672 9.07031 10.425 9.07031H8.8125V10.6805C8.8125 10.725 8.77031 10.7578 8.71875 10.7578H7.59375C7.54219 10.7578 7.5 10.725 7.5 10.6828V9.07031H5.8875C5.84531 9.07031 5.8125 9.02812 5.8125 8.97656V7.85156Z" fill="#E6F7FF"/>
                        <path d="M8.98828 15.8203L10.425 14.0672C10.5258 13.9453 10.4414 13.7602 10.2867 13.7602H9.09609C9.04219 13.7602 8.99297 13.7836 8.95781 13.8281L8.16094 14.8031L7.36406 13.8281C7.34747 13.8073 7.32646 13.7904 7.30255 13.7786C7.27864 13.7669 7.25242 13.7606 7.22578 13.7602H6.03281C5.87812 13.7602 5.79375 13.9453 5.89453 14.0672L7.32891 15.8227L5.85938 17.6227C5.75625 17.7445 5.84063 17.9297 5.99531 17.9297H7.18594C7.23984 17.9297 7.28906 17.9062 7.32422 17.8617L8.15625 16.8422L8.98828 17.8617C9.02109 17.9039 9.075 17.9297 9.12656 17.9297H10.3172C10.4719 17.9297 10.5563 17.7445 10.4578 17.6203L8.98828 15.8203ZM5.8875 9.07031H7.5V10.6828C7.5 10.725 7.54219 10.7578 7.59375 10.7578H8.71875C8.77031 10.7578 8.8125 10.725 8.8125 10.6805V9.07031H10.425C10.4672 9.07031 10.5 9.02813 10.5 8.97656V7.85156C10.5 7.8 10.4672 7.75781 10.4227 7.75781H8.8125V6.14531C8.8125 6.10313 8.77031 6.07031 8.71875 6.07031H7.59375C7.54219 6.07031 7.5 6.10313 7.5 6.14531V7.75781H5.8875C5.84531 7.75781 5.8125 7.8 5.8125 7.85156V8.97656C5.8125 9.02813 5.84531 9.07031 5.8875 9.07031ZM13.575 17.7188H18.1125C18.1547 17.7188 18.1875 17.6766 18.1875 17.625V16.5C18.1875 16.4484 18.1547 16.4062 18.1102 16.4062H13.575C13.5328 16.4062 13.5 16.4484 13.5 16.5V17.625C13.5 17.6766 13.5328 17.7188 13.575 17.7188ZM13.575 15.2812H18.1125C18.1547 15.2812 18.1875 15.2391 18.1875 15.1875V14.0625C18.1875 14.0109 18.1547 13.9688 18.1102 13.9688H13.575C13.5328 13.9688 13.5 14.0109 13.5 14.0625V15.1875C13.5 15.2391 13.5328 15.2812 13.575 15.2812ZM13.575 9.07031H18.1125C18.1547 9.07031 18.1875 9.02813 18.1875 8.97656V7.85156C18.1875 7.8 18.1547 7.75781 18.1102 7.75781H13.575C13.5328 7.75781 13.5 7.8 13.5 7.85156V8.97656C13.5 9.02813 13.5328 9.07031 13.575 9.07031Z" fill="#325FFF"/>
                    </svg>
                    <p>Расчет стоимости</p>
                </div>

                <div className="save-projects-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 5C11 5.27656 10.7766 5.5 10.5 5.5H5.5C5.22344 5.5 5 5.27656 5 5V2.875H2.875V13.125H13.125V5.34062L11 3.21563V5ZM8 11.4062C6.75781 11.4062 5.75 10.3984 5.75 9.15625C5.75 7.91406 6.75781 6.90625 8 6.90625C9.24219 6.90625 10.25 7.91406 10.25 9.15625C10.25 10.3984 9.24219 11.4062 8 11.4062Z" fill="white"/>
                        <path d="M8 6.90625C6.75781 6.90625 5.75 7.91406 5.75 9.15625C5.75 10.3984 6.75781 11.4062 8 11.4062C9.24219 11.4062 10.25 10.3984 10.25 9.15625C10.25 7.91406 9.24219 6.90625 8 6.90625ZM8 10.4062C7.30938 10.4062 6.75 9.84687 6.75 9.15625C6.75 8.46563 7.30938 7.90625 8 7.90625C8.69062 7.90625 9.25 8.46563 9.25 9.15625C9.25 9.84687 8.69062 10.4062 8 10.4062Z" fill="#325FFF"/>
                        <path d="M13.9578 4.58281L11.4172 2.04219C11.4062 2.03125 11.3953 2.02187 11.3844 2.01094C11.3828 2.00937 11.3797 2.00781 11.3781 2.00625C11.3672 1.99531 11.3547 1.98594 11.3438 1.97656C11.2423 1.89369 11.1255 1.83158 11 1.79375V1.75H2.25C1.97344 1.75 1.75 1.97344 1.75 2.25V13.75C1.75 14.0266 1.97344 14.25 2.25 14.25H13.75C14.0266 14.25 14.25 14.0266 14.25 13.75V5.28906C14.25 5.02344 14.1453 4.77031 13.9578 4.58281ZM6 2.875H10V4.5H6V2.875ZM13.125 13.125H2.875V2.875H5V5C5 5.27656 5.22344 5.5 5.5 5.5H10.5C10.7766 5.5 11 5.27656 11 5V3.21563L13.125 5.34062V13.125Z" fill="#325FFF"/>
                    </svg>
                    <p>Сохранить</p>
                </div>

                <div className="info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM12 20.7188C7.18594 20.7188 3.28125 16.8141 3.28125 12C3.28125 7.18594 7.18594 3.28125 12 3.28125C16.8141 3.28125 20.7188 7.18594 20.7188 12C20.7188 16.8141 16.8141 20.7188 12 20.7188Z" fill="#444444"/>
                        <path d="M10.875 7.875C10.875 8.17337 10.9935 8.45952 11.2045 8.6705C11.4155 8.88147 11.7016 9 12 9C12.2984 9 12.5845 8.88147 12.7955 8.6705C13.0065 8.45952 13.125 8.17337 13.125 7.875C13.125 7.57663 13.0065 7.29048 12.7955 7.0795C12.5845 6.86853 12.2984 6.75 12 6.75C11.7016 6.75 11.4155 6.86853 11.2045 7.0795C10.9935 7.29048 10.875 7.57663 10.875 7.875ZM12.5625 10.5H11.4375C11.3344 10.5 11.25 10.5844 11.25 10.6875V17.0625C11.25 17.1656 11.3344 17.25 11.4375 17.25H12.5625C12.6656 17.25 12.75 17.1656 12.75 17.0625V10.6875C12.75 10.5844 12.6656 10.5 12.5625 10.5Z" fill="#444444"/>
                    </svg>
                </div>

                <div className="menu-redactor-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21" stroke="#444444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 6H21" stroke="#444444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 18L21 18" stroke="#444444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default RedactorHeader;