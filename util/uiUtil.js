import _get from 'lodash/get';
import { breakPointsInPixels } from '../legacyTheme';

let isMobile = () => false;
let isMobileDevice = () => false;

// TO FIX:
// if (window && typeof window !== 'undefined') {
//     isMobile = () => window.innerWidth < breakPointsInPixels[0];
//     isMobileDevice = () =>
//         'ontouchstart' in document.documentElement ||
//         _get(window, 'navigator.userAgent').includes('Touch');
// }

const profileImageRatio = 1 / 1;
const officeImageRatio = 3 / 2;

const range = length => [...Array(length).keys()];

export { isMobile, isMobileDevice, profileImageRatio, officeImageRatio, range };
