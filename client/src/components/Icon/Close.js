import React from 'react';

const SvgComponent = props => (
    <svg
        viewBox="0 0 20 21"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="1em"
        height="1em"
        {...props}
    >
        <title>Close</title>
        <defs>
            <path
                id="b"
                d="M216.107 640.678h-6.429v6.429h-2.143v-6.429h-6.428v-2.143h6.428v-6.428h2.143v6.428h6.429z"
            />
            <filter
                x="-26.7%"
                y="-40%"
                width="206.7%"
                height="206.7%"
                filterUnits="objectBoundingBox"
                id="a"
            >
                <feOffset
                    dx={4}
                    dy={2}
                    in="SourceAlpha"
                    result="shadowOffsetOuter1"
                />
                <feGaussianBlur
                    stdDeviation={2}
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                />
                <feColorMatrix
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                    in="shadowBlurOuter1"
                />
            </filter>
        </defs>
        <g transform="rotate(45 872.705 81.685)" fill="none" fillRule="evenodd">
            <use fill="#000" filter="url(#a)" xlinkHref="#b" />
            <use fill="#FFF" xlinkHref="#b" />
        </g>
    </svg>
);

export default SvgComponent;
