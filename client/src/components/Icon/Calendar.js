import React from 'react';

const Calendar = props => (
    <svg viewBox="0 0 23 25" width="1em" {...props}>
        <path
            fill="#3481F8"
            fillRule="evenodd"
            d="M17.889 11.25H5.11v2.5h12.78v-2.5zm2.555-8.75h-1.277V0H16.61v2.5H6.39V0H3.833v2.5H2.556C1.137 2.5.013 3.625.013 5L0 22.5C0 23.875 1.137 25 2.556 25h17.888C21.85 25 23 23.875 23 22.5V5c0-1.375-1.15-2.5-2.556-2.5zm0 20H2.556V8.75h17.888V22.5zm-6.388-6.25H5.11v2.5h8.945v-2.5z"
        />
    </svg>
);

export default Calendar;
