import React from 'react';

const SvgComponent = props => (
    <svg height="1em" viewBox="0 0 18 17" {...props}>
        <title>{'Shape'}</title>
        <path
            d="M12.864 10.692h-.813l-.288-.263c1.009-1.108 1.616-2.546 1.616-4.111C13.38 2.828 10.384 0 6.69 0 2.996 0 0 2.828 0 6.318c0 3.49 2.995 6.318 6.69 6.318 1.656 0 3.18-.574 4.353-1.526l.278.272v.768L16.467 17 18 15.552l-5.136-4.86zM6.5 11C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);

export default SvgComponent;
