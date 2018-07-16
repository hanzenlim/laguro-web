import { breakPointsInPixels } from '../theme';

const isMobile = () => {
    return window.innerWidth < breakPointsInPixels[0];
}

export default isMobile;
