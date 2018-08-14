import React, { Component } from 'react';
import NumChairsAvail from './icons/NumChairsAvail';

class Icon extends Component {
    render() {
        switch (this.props.icon) {
        case 'numChairsAvail':
            return (
                <NumChairsAvail
                    className={this.props.className}
                    width={this.props.width}
                />
            );
        case 'BackToSearch':
            return (
                <svg
                    className={this.props.className}
                    width={this.props.width}
                    onClick={this.props.onClick}
                    viewBox="0 0 35 35"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <title>x-circle</title>
                    <desc>Created with Sketch.</desc>
                    <defs />
                    <g
                        id="UI-Screens"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <g
                            id="Desktop---Selected-Office"
                            transform="translate(-30.000000, -537.000000)"
                            strokeWidth="2"
                        >
                            <g
                                id="Group-8"
                                transform="translate(31.000000, 538.000000)"
                            >
                                <g id="x-circle">
                                    <circle
                                        id="Oval"
                                        stroke="#B3B1B1"
                                        fill="#B3B1B1"
                                        cx="16.5"
                                        cy="16.5"
                                        r="16.5"
                                    />
                                    <g
                                        id="Group-7"
                                        transform="translate(14.000000, 12.000000)"
                                        stroke="#FFFFFF"
                                    >
                                        <path
                                            d="M5,0 L0,4.83642578"
                                            id="Shape"
                                        />
                                        <path
                                            d="M0,5.015625 L5,10"
                                            id="Shape"
                                        />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case 'carouselButtonLeft':
            return (
                <svg
                    className={this.props.className}
                    width={this.props.width}
                    onClick={this.props.onClick}
                    viewBox="0 0 35 35"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <desc>Created with Sketch.</desc>
                    <defs />
                    <g
                        id="UI-Screens"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        opacity="0.799999952"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <g
                            id="Tablet---Selected-Office"
                            transform="translate(-47.000000, -254.000000)"
                            strokeWidth="2"
                        >
                            <g
                                id="x-circle"
                                transform="translate(48.000000, 255.000000)"
                            >
                                <circle
                                    id="Oval"
                                    stroke="#FFFFFF"
                                    fill="#FFFFFF"
                                    cx="16.5"
                                    cy="16.5"
                                    r="16.5"
                                />
                                <g
                                    id="Group-7"
                                    transform="translate(14.000000, 12.000000)"
                                    stroke="#484E51"
                                >
                                    <path
                                        d="M5,0 L0,4.83642578"
                                        id="Shape"
                                    />
                                    <path
                                        d="M0,5.015625 L5,10"
                                        id="Shape"
                                    />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case 'carouselButtonRight':
            return (
                <svg
                    className={this.props.className}
                    width={this.props.width}
                    onClick={this.props.onClick}
                    viewBox="0 0 35 35"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <desc>Created with Sketch.</desc>
                    <defs />
                    <g
                        id="UI-Screens"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        opacity="0.799999952"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <g
                            id="Tablet---Selected-Office"
                            transform="translate(-713.000000, -254.000000)"
                            strokeWidth="2"
                        >
                            <g
                                id="x-circle"
                                transform="translate(730.500000, 271.500000) scale(-1, 1) translate(-730.500000, -271.500000) translate(714.000000, 255.000000)"
                            >
                                <circle
                                    id="Oval"
                                    stroke="#FFFFFF"
                                    fill="#FFFFFF"
                                    cx="16.5"
                                    cy="16.5"
                                    r="16.5"
                                />
                                <g
                                    id="Group-7"
                                    transform="translate(14.000000, 12.000000)"
                                    stroke="#484E51"
                                >
                                    <path
                                        d="M5,0 L0,4.83642578"
                                        id="Shape"
                                    />
                                    <path
                                        d="M0,5.015625 L5,10"
                                        id="Shape"
                                    />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case 'map-pin':
            return (
                <svg
                    className={this.props.className}
                    width={this.props.width}
                    viewBox="0 0 12 14"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>map-pin</title>
                    <desc>Created with Sketch.</desc>
                    <defs />
                    <g
                        id="UI-Mockups"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <g
                            id="Desktop---Home"
                            transform="translate(-208.000000, -443.000000)"
                            stroke="#484E51"
                        >
                            <g
                                id="map-pin"
                                transform="translate(209.000000, 444.000000)"
                            >
                                <path
                                    d="M10,4.99999993 C10,8.88888881 5,12.2222221 5,12.2222221 C5,12.2222221 0,8.88888881 0,4.99999993 C4.11484205e-08,2.23857621 2.23857628,-1.23358114e-16 5,0 C7.76142372,1.23358114e-16 9.99999996,2.23857621 10,4.99999993 Z"
                                    id="Shape"
                                />
                                <circle
                                    id="Oval"
                                    cx="5"
                                    cy="5"
                                    r="1.66666667"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case 'downArrow':
            return (
                <svg
                    className={this.props.className}
                    width={this.props.width}
                    viewBox="0 0 15 8"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <desc>Created with Sketch.</desc>
                    <defs />
                    <g
                        id="UI-Screens"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                    >
                        <g
                            id="Tablet---Selected-Office"
                            transform="translate(-387.000000, -1525.000000)"
                            stroke="#979797"
                        >
                            <g
                                id="Group-15"
                                transform="translate(184.000000, 782.000000)"
                            >
                                <g
                                    id="Group-17"
                                    transform="translate(0.000000, 428.000000)"
                                >
                                    <g id="Group-2">
                                        <g id="Group-13">
                                            <g
                                                id="Group-11"
                                                transform="translate(1.000000, 0.000000)"
                                            >
                                                <polyline
                                                    id="Path-10"
                                                    points="202.585938 315.908203 209.338816 322.661082 216.415635 315.584262"
                                                />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case 'star':
            return (
                <svg
                    className={this.props.className}
                    width={this.props.width}
                    viewBox="0 0 13 13"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <desc>Created with Sketch.</desc>
                    <defs />
                    <g
                        id="UI-Screens"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <g
                            id="Tablet---Selected-Office"
                            transform="translate(-508.000000, -1224.000000)"
                            fill="#FFD800"
                            stroke="#FFD800"
                        >
                            <g
                                id="Group-15"
                                transform="translate(184.000000, 782.000000)"
                            >
                                <g
                                    id="Group-17"
                                    transform="translate(0.000000, 428.000000)"
                                >
                                    <g id="Group-2">
                                        <g id="Group-13">
                                            <polygon
                                                id="Shape"
                                                points="332.338151 17.9875342 336.739726 18.6308904 333.554795 21.7330137 334.306438 26.1154795 330.369863 24.045274 326.433288 26.1154795 327.184932 21.7330137 324 18.6308904 328.401575 17.9875342 330.369863 14"
                                            />
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case 'logo':
            return (
                <svg
                    className={this.props.className}
                    width={this.props.width}
                    viewBox="0 0 152 152"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <title>logo</title>
                    <desc>Created with Sketch.</desc>
                    <defs>
                        <circle id="path-1" cx="70" cy="70" r="70" />
                        <filter
                            x="-6.4%"
                            y="-6.4%"
                            width="112.9%"
                            height="112.9%"
                            filterUnits="objectBoundingBox"
                            id="filter-2"
                        >
                            <feOffset
                                dx="0"
                                dy="0"
                                in="SourceAlpha"
                                result="shadowOffsetOuter1"
                            />
                            <feGaussianBlur
                                stdDeviation="3"
                                in="shadowOffsetOuter1"
                                result="shadowBlurOuter1"
                            />
                            <feColorMatrix
                                values="0 0 0 0 0.784313725   0 0 0 0 0.780392157   0 0 0 0 0.780392157  0 0 0 0.69 0"
                                type="matrix"
                                in="shadowBlurOuter1"
                            />
                        </filter>
                    </defs>
                    <g
                        id="UI-Screens"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                    >
                        <g
                            id="Green-Logo"
                            transform="translate(-4.000000, -4.000000)"
                        >
                            <g
                                id="Group"
                                transform="translate(10.000000, 10.000000)"
                            >
                                <g id="Oval">
                                    <use
                                        fill="black"
                                        fillOpacity="1"
                                        filter="url(#filter-2)"
                                        xlinkHref="#path-1"
                                    />
                                    <use
                                        fill="#FFFFFF"
                                        fillRule="evenodd"
                                        xlinkHref="#path-1"
                                    />
                                </g>
                                <path
                                    d="M83.4736182,99.2857143 L55,99.2857143 C53.8954305,99.2857143 53,98.3902838 53,97.2857143 L53,35 L53,35 C60.5307223,35 66.6355789,41.1048566 66.6355789,48.6355789 L66.6355789,84.7593325 L98,84.7593325 L98,84.7593325 C98,92.7820316 91.4963173,99.2857143 83.4736182,99.2857143 Z"
                                    id="L-🌈cubic-bezier(0.55,-0.06,-0.37,-0.55);lrgb;15"
                                    fill="#0AD5B1"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case 'sideNavX':
            return (
                <svg
                    className={this.props.className}
                    width="35px"
                    viewBox="0 0 35 35"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <title>x-circle</title>
                    <desc>Created with Sketch.</desc>
                    <defs />
                    <g
                        id="UI-Screens"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <g
                            id="Mobile---Expanded"
                            transform="translate(-270.000000, -28.000000)"
                            strokeWidth="2"
                        >
                            <g
                                id="x-circle"
                                transform="translate(271.000000, 29.000000)"
                            >
                                <circle
                                    id="Oval"
                                    stroke="#B3B1B1"
                                    fill="#B3B1B1"
                                    cx="16.5"
                                    cy="16.5"
                                    r="16.5"
                                />
                                <path
                                    d="M22,12 L12,22"
                                    id="Shape"
                                    stroke="#FFFFFF"
                                />
                                <path
                                    d="M12,12 L22,22"
                                    id="Shape"
                                    stroke="#FFFFFF"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            );

        case 'contactUs':
            return (
                <svg
                    className={this.props.className}
                    width={this.props.width}
                    viewBox="0 0 92 92"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <desc>Created with Sketch.</desc>
                    <defs>
                        <rect
                            id="path-1"
                            x="0"
                            y="0"
                            width="80"
                            height="80"
                            rx="40"
                        />
                        <filter
                            x="-11.9%"
                            y="-10.6%"
                            width="123.8%"
                            height="123.8%"
                            filterUnits="objectBoundingBox"
                            id="filter-2"
                        >
                            <feOffset
                                dx="0"
                                dy="1"
                                in="SourceAlpha"
                                result="shadowOffsetOuter1"
                            />
                            <feGaussianBlur
                                stdDeviation="3"
                                in="shadowOffsetOuter1"
                                result="shadowBlurOuter1"
                            />
                            <feColorMatrix
                                values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.09 0"
                                type="matrix"
                                in="shadowBlurOuter1"
                            />
                        </filter>
                    </defs>
                    <g
                        id="UI-Screens"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                    >
                        <g
                            id="Tablet---Home"
                            transform="translate(-621.000000, -2645.000000)"
                        >
                            <g
                                id="Footer"
                                transform="translate(0.000000, 2577.000000)"
                            >
                                <g id="Group-11">
                                    <g
                                        id="Intercom-bubble-chat"
                                        transform="translate(627.000000, 73.000000)"
                                    >
                                        <g id="Background">
                                            <use
                                                fill="black"
                                                fillOpacity="1"
                                                filter="url(#filter-2)"
                                                xlinkHref="#path-1"
                                            />
                                            <use
                                                fill="#0AD5B1"
                                                fillRule="evenodd"
                                                xlinkHref="#path-1"
                                            />
                                        </g>
                                        <path
                                            d="M53.9895651,48.7975739 L53.9817781,56.1474548 L45.5417544,52.5 L29.9968389,52.5 C27.7894457,52.5 26,50.7171974 26,48.5071882 L26,27.9928118 C26,25.7876427 27.7941203,24 29.9968389,24 L50.0031611,24 C52.2105543,24 54,25.7828026 54,27.9928118 L54,48.5071882 C54,48.6048419 53.9964816,48.7016768 53.9895651,48.7975739 Z M30.0447603,44.1840635 C29.8028871,44.492059 29.8118545,45.040465 30.0297106,45.450174 C30.2475668,45.8598829 34.6588464,48.4838871 40.1475906,48.4838874 C45.6363348,48.4838876 49.7120694,45.9143685 50.0547766,45.450174 C50.3974837,44.9859795 50.5130716,44.651493 50.0547758,44.2272705 C49.5964799,43.8030479 49.4168752,43.9768322 48.8226483,44.2450711 C48.2284214,44.51331 44.3329479,46.8308885 40.0629567,46.7915326 C35.7929655,46.7521767 32.2078608,44.7578911 31.4759312,44.0851891 C30.7440016,43.412487 30.2866334,43.876068 30.0447603,44.1840635 Z"
                                            id="Icon"
                                            fill="#FFFFFF"
                                        />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            );
        default:
            return null;
        }
    }
}

export default Icon;
