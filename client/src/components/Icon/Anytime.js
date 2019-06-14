import React from 'react';

const Anytime = props => (
    <svg width="1em" height="1em" viewBox="0 0 17 17" {...props}>
        <title>{'anytime'}</title>
        <g
            transform="translate(1 1)"
            stroke="#B2B2B2"
            strokeWidth={1.5}
            fill="none"
            fillRule="evenodd"
        >
            <circle cx={7.5} cy={7.5} r={7.5} />
            <path d="M3 7.5a4.5 4.5 0 0 0 9 0" />
        </g>
    </svg>
);

export default Anytime;
