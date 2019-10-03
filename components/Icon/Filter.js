import React from 'react';

const SvgComponent = props => (
    <svg width={17} height={14} {...props}>
        <g
            fill="none"
            fillRule="evenodd"
            stroke="#3481F8"
            transform="translate(1)"
        >
            <path strokeLinecap="square" d="M1.5.5v13" />
            <circle cx={1.5} cy={3.5} r={1.5} fill="#FFF" />
            <path strokeLinecap="square" d="M7.5.5v13m6-13v13" />
            <circle cx={13.5} cy={3.5} r={1.5} fill="#FFF" />
            <circle cx={7.5} cy={10.5} r={1.5} fill="#FFF" />
        </g>
    </svg>
);

export default SvgComponent;
