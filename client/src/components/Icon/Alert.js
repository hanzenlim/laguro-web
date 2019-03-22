import React from 'react';

const SvgComponent = props => (
    <svg width={13} height={13} {...props}>
        <title>{'Alert'}</title>
        <g fill="none" fillRule="evenodd">
            <path
                d="M7.276.553l5.382 10.764a1 1 0 0 1-.894 1.447H1a1 1 0 0 1-.894-1.447L5.488.553a1 1 0 0 1 1.788 0z"
                fill="#FFBF00"
            />
            <text
                fontFamily="Silka-Bold, Silka"
                fontSize={9}
                fontWeight="bold"
                fill="#FFF"
            >
                <tspan x={5.151} y={11}>
                    {'!'}
                </tspan>
            </text>
        </g>
    </svg>
);

export default SvgComponent;
