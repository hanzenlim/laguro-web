import React from 'react';

const SvgComponent = props => (
    <svg width="1em" height="1em" viewBox="0 0 21 21" {...props}>
        <g fill="none" fillRule="evenodd">
            <circle cx={10.5} cy={10.5} r={10.5} fill="#FF5050" />
            <path
                d="M7 7l7.071 7.071m-7.071 0L14.071 7"
                stroke="#FFF"
                strokeLinecap="square"
                strokeWidth={1.5}
            />
        </g>
    </svg>
);

export default SvgComponent;
