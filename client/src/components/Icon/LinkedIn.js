import React from 'react';

const SvgComponent = props => (
    <svg width={26} height={26} {...props}>
        <title>{'linkedin'}</title>
        <g fill="none" fillRule="evenodd">
            <circle fill="#FFF" cx={13} cy={13} r={13} />
            <path
                d="M20 14.518V19h-2.948v-4.182c0-1.05-.426-1.767-1.493-1.767-.815 0-1.3.483-1.513.95-.077.167-.097.4-.097.634V19H11s.04-7.083 0-7.816h2.948v1.108l-.019.025h.02v-.025C14.34 11.76 15.038 11 16.605 11 18.546 11 20 12.117 20 14.518zM8.51 7C7.596 7 7 7.648 7 8.5c0 .833.58 1.5 1.474 1.5h.018C9.422 10 10 9.333 10 8.5 9.982 7.647 9.422 7 8.51 7zM7 19h3v-8H7v8z"
                fill="#091426"
                fillRule="nonzero"
            />
        </g>
    </svg>
);

export default SvgComponent;
