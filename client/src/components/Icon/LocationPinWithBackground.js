import React from 'react';

const LocationPinWithBackground = props => (
    <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={50}
        height={50}
        style={{
            transform: 'translate(-26px, -36px)',
        }}
        {...props}
    >
        <defs>
            <circle id="b" cx={15} cy={15} r={15} />
            <filter
                id="a"
                width="213.3%"
                height="213.3%"
                x="-56.7%"
                y="-43.3%"
                filterUnits="objectBoundingBox"
            >
                <feOffset dy={4} in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                    stdDeviation={5}
                />
                <feColorMatrix
                    in="shadowBlurOuter1"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
                />
            </filter>
        </defs>
        <g fill="none" fillRule="evenodd">
            <g transform="translate(10 6)">
                <use fill="#000" filter="url(#a)" xlinkHref="#b" />
                <use fill="#FF2D55" xlinkHref="#b" />
            </g>
            <path d="M15 11h20v19.355H15z" />
            <path
                fill="#FFF"
                d="M27.881 24.13c-.652.86-1.562 1.29-2.73 1.29-1.169 0-2.079-.43-2.73-1.29-.653-.86-.98-2.03-.98-3.507 0-1.46.327-2.614.98-3.465.651-.85 1.561-1.277 2.73-1.277 1.168 0 2.078.426 2.73 1.277.653.85.979 2.006.979 3.465 0 1.478-.326 2.647-.979 3.507zM25 12.937c-4.133.082-7.415 3.367-7.33 7.339.12 5.592 7.707 10.238 7.707 10.238s7.382-4.942 7.263-10.534c-.086-3.972-3.506-7.125-7.64-7.043z"
            />
        </g>
    </svg>
);

export default LocationPinWithBackground;
