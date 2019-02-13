import styled from 'styled-components';
import { Box } from '@laguro/basic-components';

export const StyledPreviousButtonContainer = styled(Box)`
    && .onboarding-previous-button {
        position: absolute;
        top: ${props => (props.top ? props.top : 70)}px;
    }
`;
