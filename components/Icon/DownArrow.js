import React from 'react';

const DownArrow = props => (
    <svg width={12} height={7} {...props}>
        <path
            fillOpacity={0.7}
            fillRule="evenodd"
            d="M10.59 0L6 4.327 1.41 0 0 1.332 6 7l6-5.668z"
        />
    </svg>
);

export default DownArrow;
