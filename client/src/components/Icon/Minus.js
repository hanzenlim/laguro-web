import React from 'react';
import theme from '../theme';

const Minus = props => (
    <svg viewBox="0 0 30 30" width="1em" height="1em" {...props}>
        <g
            transform="translate(1 1)"
            stroke={theme.colors.icon.blue}
            strokeWidth={2}
            fill="none"
            fillRule="evenodd"
        >
            <path d="M9.5 14.5h9" strokeLinecap="square" />
            <circle cx={14} cy={14} r={14} />
        </g>
    </svg>
);

export default Minus;
