import Modernizr from 'modernizr';
import { breakPointsInPixels } from '../legacyTheme';

export const isMobile = () => window.innerWidth < breakPointsInPixels[0];

// from https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
// if the current device is a mobile device (phones, tablets), most likely window.orientation will not be undefined. however, there is another boolean to see if current device is IEMobile because this is an edge case
export const isMobileDevice = () =>
    Modernizr.testProp('pointerEvent') || Modernizr.testAllProps('touchevents');

export const profileImageRatio = 1 / 1;
export const officeImageRatio = 3 / 2;
