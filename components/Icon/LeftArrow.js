import React from 'react';
import theme from '../theme';

const LeftArrow = props => (
    <svg
        viewBox="0 0 38 56"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
        color={!props.isButton && theme.colors.icon.white}
    >
        <defs>
            <polygon
                id="path-1"
                points="270 1136.67568 275.675676 1131 300 1155.32432 275.675676 1179.64865 270 1173.97297 288.648649 1155.32432"
            />
            <filter
                x="-23.3%"
                y="-10.3%"
                width="146.7%"
                height="128.8%"
                filterUnits="objectBoundingBox"
                id="filter-2"
            >
                <feOffset
                    dx="0"
                    dy="2"
                    in="SourceAlpha"
                    result="shadowOffsetOuter1"
                />
                <feGaussianBlur
                    stdDeviation="2"
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                />
                <feColorMatrix
                    values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
                    type="matrix"
                    in="shadowBlurOuter1"
                />
            </filter>
        </defs>
        <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g transform="translate(-266.000000, -1129.000000)">
                <g
                    id="Shape"
                    transform="translate(285.000000, 1155.324324) scale(-1, 1) translate(-285.000000, -1155.324324) "
                >
                    <use
                        fill="black"
                        fillOpacity="1"
                        filter="url(#filter-2)"
                        xlinkHref="#path-1"
                    />
                    <use
                        fill="currentColor"
                        fillRule="evenodd"
                        xlinkHref="#path-1"
                    />
                </g>
            </g>
        </g>
    </svg>
);

export default LeftArrow;
