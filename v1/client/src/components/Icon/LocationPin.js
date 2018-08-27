import React from 'react';
import { StyledPath } from '../utils';

StyledPath.defaultProps = {
    stroke: 'icon.black',
};

const LocationPin = props => (
    <svg
        viewBox="0 0 32 39"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
        <desc>Created with Sketch.</desc>
        <defs />
        <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g id="1-index-1" transform="translate(-509.000000, -456.000000)">
                <g id="conteudo" transform="translate(490.000000, 256.000000)">
                    <g id="search" transform="translate(0.000000, 180.000000)">
                        <g id="pin" transform="translate(15.000000, 19.000000)">
                            <rect
                                id="Path"
                                x="0"
                                y="0"
                                width="40"
                                height="40"
                            />
                            <StyledPath
                                d="M25.4295587,25.135425 C24.1241041,26.9141323 22.3050132,27.8021323 19.9677405,27.8021323 C17.6313769,27.8021323 15.8113769,26.9141323 14.5068314,25.135425 C13.2022859,23.3576201 12.5504678,20.9417908 12.5504678,17.8870347 C12.5504678,14.871986 13.2022859,12.4850347 14.5068314,10.7261811 C15.8113769,8.96822987 17.6313769,8.08744938 19.9677405,8.08744938 C22.3050132,8.08744938 24.1241041,8.96822987 25.4295587,10.7261811 C26.7341041,12.4850347 27.3859223,14.871986 27.3859223,17.8870347 C27.3859223,20.9417908 26.7341041,23.3576201 25.4295587,25.135425 Z M19.6650132,2.00320547 C11.3977405,2.17286401 4.83410413,8.96191279 5.00319504,17.1695957 C5.24319504,28.7271323 20.4186496,38.3290835 20.4186496,38.3290835 C20.4186496,38.3290835 35.183195,28.1161811 34.9441041,16.5577421 C34.773195,8.35005913 27.933195,1.83444938 19.6650132,2.00320547 Z"
                                stroke={props.color}
                                stroke-width="2"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

export default LocationPin;
