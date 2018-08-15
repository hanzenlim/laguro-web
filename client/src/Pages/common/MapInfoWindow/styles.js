import styled from 'styled-components';
import { Popup } from 'react-map-gl';
import { Image } from '../../../components';

export const StyledPopup = styled(Popup)`
    z-index: ${props => props.theme.zIndex.overlay};
    && .mapboxgl-popup-content {
        padding: ${props => props.theme.space[8]};
    }
`;

export const StyledImage = styled(Image)`
    border-radius: 50%;
`;
