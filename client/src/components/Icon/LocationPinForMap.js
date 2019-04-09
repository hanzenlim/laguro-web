import React from 'react';

const LocationPinForMap = props => (
    <svg
        width={30}
        height={30}
        viewBox="0 0 30 30"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
            transform: 'translate(-20px, -36px)',
        }}
        {...props}
    >
        <title>Artboard Copy 6</title>
        <desc>Created with Sketch.</desc>
        <defs>
            <path
                d="M11,27 C18.3333333,20.2961914 22,14.9347608 22,10.9157081 C22,4.88712896 17.0751322,0 11,0 C4.92486775,0 0,4.88712896 0,10.9157081 C0,14.9347608 3.66666667,20.2961914 11,27 Z"
                id="path-1"
            />
        </defs>
        <g
            id="Artboard-Copy-6"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g id="Rectangle-Copy" transform="translate(4.000000, 1.000000)">
                <ellipse
                    id="Oval"
                    fill="#BEBEBE"
                    cx="11"
                    cy="26.5"
                    rx="8"
                    ry="1.5"
                />
                <mask id="mask-2" fill="white">
                    <use xlinkHref="#path-1" />
                </mask>
                <use id="Mask" fill="#3581F7" xlinkHref="#path-1" />
                <rect
                    id="Rectangle"
                    fill="#205FC0"
                    mask="url(#mask-2)"
                    x="11"
                    y="-1"
                    width="15"
                    height="31"
                />
                <path
                    d="M5,11 C5,14.3137085 7.6862915,17 11,17 L11,17 C14.3137085,17 17,14.3137085 17,11"
                    id="Path"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    mask="url(#mask-2)"
                />
            </g>
        </g>
    </svg>
);

export default LocationPinForMap;
