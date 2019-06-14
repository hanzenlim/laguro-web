import React from 'react';

const SvgComponent = props => (
    <svg width={19} height={19} {...props}>
        <title>{'insurance'}</title>
        <image
            x={1.75}
            y={2.875}
            width={17.5}
            height={17.25}
            xlinkHref="data:image/png;base64,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"
            transform="translate(-1 -2)"
            fill="none"
            fillRule="evenodd"
            opacity={0.41}
        />
    </svg>
);

export default SvgComponent;
