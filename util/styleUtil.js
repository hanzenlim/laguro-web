import _isEmpty from 'lodash/isEmpty';

export function truncate(width) {
    return `
        width: ${width};
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overlow: ellipsis;
    `;
}

export function fade(length) {
    return `
        -webkit-animation: fadein ${length}s; /* Safari, Chrome and Opera > 12.1 */
           -moz-animation: fadein ${length}s; /* Firefox < 16 */
            -ms-animation: fadein ${length}s; /* Internet Explorer */
             -o-animation: fadein ${length}s; /* Opera < 12.1 */
                animation: fadein ${length}s;

        @keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }

        /* Firefox < 16 */
        @-moz-keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }

        /* Safari, Chrome and Opera > 12.1 */
        @-webkit-keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }

        /* Internet Explorer */
        @-ms-keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }

        /* Opera < 12.1 */
        @-o-keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
                }

    `;
}

export const formatAddress = (addressString, addressDetail) => {
    if (_isEmpty(addressString)) {
        return '';
    }
    const addressElements = addressString
        .replace(/ [\d]{5}, United States/, '')
        .split(',');

    return `${addressElements[0]}, ${
        addressDetail ? `${addressDetail}, ` : ''
    }${addressElements.slice(1)}`;
};

export const trimAddress = (address = '') => {
    const formattedAddress = address
        .split(', ')
        .slice(1, 3)
        .join(', ')
        .replace(/[0-9]/g, '');
    return formattedAddress;
};
