import React from 'react';

import { Box, Rating, Text, Image } from '../../../components';

import {
    StyledCard,
    StyledImageWrapper,
    StyledImageOverlay,
    StyledDentistAddress,
} from './styles';

const DentistCard = () => (
    <StyledCard>
        <StyledImageWrapper>
            <Image
                borderRadius="4px"
                src="http://via.placeholder.com/186x186"
                alt="dentist name"
            />
            <StyledImageOverlay pb={4} pl={5} pr={3} pt={6}>
                <Text
                    fontSize={1}
                    color="black"
                    lineHeight="1.29"
                    letterSpacing="-0.5px"
                >
                    1308 Terrace Dr Newton, KS 67114
                </Text>
            </StyledImageOverlay>
        </StyledImageWrapper>

        <Box mt={5}>
            <Text lineHeight="1.22" fontSize={2} letterSpacing="-0.8px">
                DR. Michelle Choi
            </Text>

            <Text lineHeight="1.1" fontSize={3} color="black" bold italic>
                implant specialista
            </Text>

            <Box mt={3}>
                <Rating disabled defaultValue={2.5} />
            </Box>
        </Box>
    </StyledCard>
);

export default DentistCard;
