import styled from 'styled-components';
import { Box } from '../../../components';

export const StyledCard = styled.div`
    min-width: 186px;
    width: 100%;
`;

export const StyledImageWrapper = styled.div`
    position: relative;
    width: 186px;
    height: 186px;
    border-radius: 4px;
`;

export const StyledImageOverlay = styled(Box)`
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 4px;
    background-color: rgba(242, 242, 242, 0.7);
`;
