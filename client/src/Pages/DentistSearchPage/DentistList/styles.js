import styled from 'styled-components';
import { Text, Box, Flex } from '../../../components';

export const StyledContainer = styled.div`
    width: 100%;

    @media screen and (min-width: 1200px) {
        width: 623px;
    }
`;

export const StyledSectionTitle = styled(Text)`
    line-height: 40px;
    letter-spacing: -0.8px;
`;

export const StyledGridItem = styled(Box)`
    margin-bottom: 22px;
    margin-right: 32px;

    @media screen and (min-width: 1200px) {
        max-width: 186px;
    }
`;

export const StyledDentistList = styled(Flex)`
    width: 100%;
    flex-wrap: wrap;

    ${StyledGridItem}:nth-child(3n) {
        @media screen and (min-width: 1200px) {
            margin-right: 0;
        }
    }
`;
