import React from 'react';

const SvgComponent = props => (
    <svg width={9} height={14} {...props}>
        <path
            fill="none"
            fillRule="evenodd"
            stroke="#3481F8"
            strokeWidth={2}
            d="M1 1l6 6-6 6"
        />
    </svg>
);

export default SvgComponent;
