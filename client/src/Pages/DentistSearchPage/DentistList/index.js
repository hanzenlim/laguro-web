import React from 'react';

import DentistCard from '../DentistCard';
import { Pagination, Flex } from '../../../components';
import {
    StyledContainer,
    StyledSectionTitle,
    StyledDentistList,
    StyledGridItem,
} from './styles';

const DentistList = () => (
    <StyledContainer>
        <StyledSectionTitle fontSize={4} color="black" mb={10}>
            find our highlights
        </StyledSectionTitle>
        <StyledDentistList>
            <StyledGridItem>
                <DentistCard />
            </StyledGridItem>
            <StyledGridItem>
                <DentistCard />
            </StyledGridItem>
            <StyledGridItem>
                <DentistCard />
            </StyledGridItem>
            <StyledGridItem>
                <DentistCard />
            </StyledGridItem>
            <StyledGridItem>
                <DentistCard />
            </StyledGridItem>
        </StyledDentistList>
        <Flex justifyContent="flex-end">
            <Pagination />
        </Flex>
    </StyledContainer>
);

export default DentistList;
