import styled from 'styled-components';
import { Box } from '../../components';

export const StyledPreviousButtonContainer = styled(Box)`
    && .onboarding-previous-button {
        position: absolute;
        top: ${props => (props.top ? props.top : 142)}px;
    }
`;
