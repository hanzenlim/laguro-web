import React, { Component } from 'react';

class Icon extends Component {

    render() {

        switch (this.props.icon) {
        case "logo":
            return (
                <svg className={this.props.className} width={this.props.width} viewBox="0 0 19 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>logo</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="UI-Mockups" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Desktop---Home" transform="translate(-12.000000, -6.000000)">
                            <g id="logo" transform="translate(11.000000, 6.000000)">
                                <path d="M10.0365631,0 C5.06159311,0 1.02864107,3.9833638 1.02864107,8.89740859 C1.02864107,15.979436 10.0365631,24.5886654 10.0365631,24.5886654 C10.0365631,24.5886654 19.0444851,15.979436 19.0444851,8.89740859 C19.0444851,3.9833638 15.011533,0 10.0365631,0 Z" id="Shape" fill={this.props.background} fillRule="nonzero"></path>
                                <path d="M14.816607,9.82253656 C14.1203004,12.555075 12.7284341,15.4218675 12.7284341,15.4218675 C12.7284341,15.4218675 12.4548406,16.086745 11.763513,16.086745 C10.5070741,16.086745 11.0711895,14.4764333 10.0363141,14.4764333 C8.98749765,14.4764333 9.57999307,16.086745 8.30563002,16.086745 C7.60758079,16.086745 7.34444312,15.4218675 7.34444312,15.4218675 C7.34444312,15.4218675 5.95257677,12.5548291 5.25651912,9.82253656 C4.56046147,7.09024406 7.30087728,6.95574406 7.30087728,6.95574406 L12.7719999,6.95574406 C12.7719999,6.95574406 15.5124157,7.09024406 14.816607,9.82253656 Z" id="Path" fill={this.props.tooth}></path>
                                <path d="M10.0574747,9.06938574 C11.1359159,9.06938574 12.1040734,8.98627605 12.7662741,8.70522761 C12.3283752,9.20044333 11.2750777,9.54960238 10.0442804,9.54960238 C8.79854638,9.54960238 7.73479304,9.19183729 7.30685202,8.68703199 C7.96979963,8.97865356 8.95613024,9.06938574 10.0574747,9.06938574 Z" id="Path" fill={this.props.background}></path>
                            </g>
                        </g>
                    </g>
                </svg>
            );
        case "sideNavX":
            return (
                <svg className={this.props.className} width="35px" viewBox="0 0 35 35" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>x-circle</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="UI-Screens" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                        <g id="Mobile---Expanded" transform="translate(-270.000000, -28.000000)" strokeWidth="2">
                            <g id="x-circle" transform="translate(271.000000, 29.000000)">
                                <circle id="Oval" stroke="#B3B1B1" fill="#B3B1B1" cx="16.5" cy="16.5" r="16.5"></circle>
                                <path d="M22,12 L12,22" id="Shape" stroke="#FFFFFF"></path>
                                <path d="M12,12 L22,22" id="Shape" stroke="#FFFFFF"></path>
                            </g>
                        </g>
                    </g>
                </svg>
            );

        case "contactUs":
            return (
                <svg className={this.props.className} width={this.props.width} viewBox="0 0 92 92" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <desc>Created with Sketch.</desc>
                    <defs>
                        <rect id="path-1" x="0" y="0" width="80" height="80" rx="40"></rect>
                        <filter x="-11.9%" y="-10.6%" width="123.8%" height="123.8%" filterUnits="objectBoundingBox" id="filter-2">
                            <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                            <feGaussianBlur stdDeviation="3" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.09 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                        </filter>
                    </defs>
                    <g id="UI-Screens" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Tablet---Home" transform="translate(-621.000000, -2645.000000)">
                            <g id="Footer" transform="translate(0.000000, 2577.000000)">
                                <g id="Group-11">
                                    <g id="Intercom-bubble-chat" transform="translate(627.000000, 73.000000)">
                                        <g id="Background">
                                            <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                                            <use fill="#0AD5B1" fillRule="evenodd" xlinkHref="#path-1"></use>
                                        </g>
                                        <path d="M53.9895651,48.7975739 L53.9817781,56.1474548 L45.5417544,52.5 L29.9968389,52.5 C27.7894457,52.5 26,50.7171974 26,48.5071882 L26,27.9928118 C26,25.7876427 27.7941203,24 29.9968389,24 L50.0031611,24 C52.2105543,24 54,25.7828026 54,27.9928118 L54,48.5071882 C54,48.6048419 53.9964816,48.7016768 53.9895651,48.7975739 Z M30.0447603,44.1840635 C29.8028871,44.492059 29.8118545,45.040465 30.0297106,45.450174 C30.2475668,45.8598829 34.6588464,48.4838871 40.1475906,48.4838874 C45.6363348,48.4838876 49.7120694,45.9143685 50.0547766,45.450174 C50.3974837,44.9859795 50.5130716,44.651493 50.0547758,44.2272705 C49.5964799,43.8030479 49.4168752,43.9768322 48.8226483,44.2450711 C48.2284214,44.51331 44.3329479,46.8308885 40.0629567,46.7915326 C35.7929655,46.7521767 32.2078608,44.7578911 31.4759312,44.0851891 C30.7440016,43.412487 30.2866334,43.876068 30.0447603,44.1840635 Z" id="Icon" fill="#FFFFFF"></path>
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
