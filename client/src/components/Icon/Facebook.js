import React from 'react';

const SvgComponent = props => (
    <svg width={26} height={26} {...props}>
        <title>{'facebook'}</title>
        <g fill="none" fillRule="evenodd">
            <circle fill="#FFF" cx={13} cy={13} r={13} />
            <path
                d="M10.834 13.23H9v-2.563h1.834l.164-2.026c0-1.378 1.33-2.626 2.002-2.626 1.092 0 3.726-.034 4 0V8.5h-1.581c-1.48 0-1.48.658-1.48 2.167l2.771-.136v2.699H13.94V20h-3.084l-.021-6.77z"
                fill="#091426"
            />
        </g>
    </svg>
);

export default SvgComponent;
