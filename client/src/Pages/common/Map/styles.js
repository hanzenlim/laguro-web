import { Marker, Popup, NavigationControl } from 'react-map-gl';
import styled from 'styled-components';

export const StyledContainer = styled.div`
    width: 100%;
    height: 900px;
    background-color: red;

    @media screen and (min-width: 1200px) {
        width: 623px;
    }
`;

export const StyledPopup = styled(Popup)`
    z-index: ${props => props.theme.zIndex.overlay};
`;

export const StyledMarkerContainer = styled(Marker)`
    width: 0;
    height: 0;
`;

export const StyledMarkerOverlay = styled.div`
    height: 50px;
    width: 50px;
    top: -40px;
    left: -25px;
    background: transparent;
    position: absolute;
    /* TODO: Add z index list to theme file */
    z-index: 1000;
`;

export const StyledNavigationControl = styled(NavigationControl)`
    position: absolute;
    top: 10px;
    left: 10px;
`;
