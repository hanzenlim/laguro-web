import React from 'react';
import theme from '../theme';

const Plus = props => (
    <svg viewBox="0 0 30 30" width="1em" height="1em" {...props}>
        <g
            transform="translate(1 1)"
            stroke={theme.colors.icon.blue}
            fill="none"
            fillRule="evenodd"
        >
            <path
                d="M13.5 14.5V10h1v4.5H19v1h-4.5V20h-1v-4.5H9v-1h4.5z"
                strokeLinecap="square"
            />
            <circle strokeWidth={2} cx={14} cy={14} r={14} />
        </g>
    </svg>
);

export default Plus;
