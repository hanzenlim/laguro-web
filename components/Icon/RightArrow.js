import React from 'react';
import theme from '../theme';

const RightArrow = props => (
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
                id="path-2"
                points="1520 1136.67568 1525.67568 1131 1550 1155.32432 1525.67568 1179.64865 1520 1173.97297 1538.64865 1155.32432"
            />
            <filter
                x="-23.3%"
                y="-10.3%"
                width="146.7%"
                height="128.8%"
                filterUnits="objectBoundingBox"
                id="filter-3"
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
            <g transform="translate(-1516.000000, -1129.000000)">
                <g id="Shape">
                    <use
                        fill="black"
                        fillOpacity="1"
                        filter="url(#filter-3)"
                        xlinkHref="#path-2"
                    />
                    <use
                        fill="currentColor"
                        fillRule="evenodd"
                        xlinkHref="#path-2"
                    />
                </g>
            </g>
        </g>
    </svg>
);

export default RightArrow;
