import React from 'react';

const SvgComponent = props => (
    <svg width={26} height={26} {...props}>
        <title>{'instagram'}</title>
        <g fill="none" fillRule="evenodd">
            <circle fill="#FFF" cx={13} cy={13} r={13} />
            <image
                x={6}
                y={6}
                width={14}
                height={14}
                xlinkHref="data:image/png;base64,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"
            />
        </g>
    </svg>
);

export default SvgComponent;
