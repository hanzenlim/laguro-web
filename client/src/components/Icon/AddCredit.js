import React from 'react';

const AddCredit = props => (
    <svg width="1em" height="1em" viewBox="0 0 16 16" {...props}>
        <g fill="none" fillRule="evenodd">
            <circle
                cx={8}
                cy={8}
                r={8}
                fill="#3481F8"
                fillRule="nonzero"
                opacity={0.3}
            />
            <path stroke="#FFF" d="M8.421 4.21v7.58M4.21 8h8.422" />
        </g>
    </svg>
);

export default AddCredit;
