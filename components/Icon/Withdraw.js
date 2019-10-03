import React from 'react';

const Withdraw = props => (
    <svg width="1em" height="1em" viewBox="0 0 20 17" {...props}>
        <g
            fill="none"
            fillRule="evenodd"
            opacity={0.4}
            transform="translate(1 1)"
        >
            <rect
                width={15.96}
                height={12.19}
                x={0.38}
                stroke="#FF7B2A"
                rx={2}
            />
            <rect
                width={6.84}
                height={1}
                x={2.28}
                y={6.476}
                fill="#FF7B2A"
                fillRule="nonzero"
                rx={0.5}
            />
            <rect
                width={5.32}
                height={1}
                x={2.28}
                y={8}
                fill="#FF7B2A"
                fillRule="nonzero"
                rx={0.5}
            />
            <path
                fill="#FF7B2A"
                fillRule="nonzero"
                d="M0 1.905h16.72v2.286H0z"
            />
            <ellipse
                cx={14.44}
                cy={11.048}
                fill="#FF7B2A"
                fillRule="nonzero"
                rx={4.56}
                ry={4.571}
            />
            <path stroke="#FFF" d="M12.16 11.048h4.18" />
            <path
                fill="#FFF"
                fillRule="nonzero"
                d="M17.1 11.048l-1.52 1.142V9.905z"
            />
        </g>
    </svg>
);

export default Withdraw;
