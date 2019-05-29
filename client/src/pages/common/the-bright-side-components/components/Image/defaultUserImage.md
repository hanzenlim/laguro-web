import * as React from 'react';

const DefaultUserImage = props => (
    <svg width={props.width} height={props.width} viewBox="0 0 70 70">
        <defs>
            <circle id="prefix__a" cx={39} cy={39} r={35} />
        </defs>
        <g transform="translate(-4 -4)" fill="none" fillRule="evenodd">
            <use fill="#3481F8" xlinkHref="#prefix__a" />
            <g transform="translate(26 24)" stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                <path d="M27 30v-3.333C27 22.985 23.978 20 20.25 20H6.75C3.022 20 0 22.985 0 26.667V30" />
                <ellipse cx={13.5} cy={6.667} rx={6.75} ry={6.667} />
            </g>
        </g>
    </svg>
);

export default DefaultUserImage;
