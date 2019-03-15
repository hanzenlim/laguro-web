import { breakPointsInPixels } from '../legacyTheme';

export const isMobile = () => window.innerWidth < breakPointsInPixels[0];

export const isMobileDevice = () =>
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1;

export const profileImageRatio = 1 / 1;
export const officeImageRatio = 3 / 2;
