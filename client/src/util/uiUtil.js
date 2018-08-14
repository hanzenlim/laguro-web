import { breakPointsInPixels } from '../legacyTheme';

export const isMobile = () => {
    return window.innerWidth < breakPointsInPixels[0];
};

export const profileImageRatio = 1 / 1;
export const officeImageRatio = 3 / 2;
