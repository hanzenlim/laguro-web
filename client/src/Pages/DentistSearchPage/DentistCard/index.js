import React from 'react';

import { Box, Rating, Text, Image } from '../../../components';

const DentistCard = () => (
    <Box minWidth="186px" width="100%">
        <Box size="186px" position="relative" borderRadius="4px">
            <Image
                borderRadius="4px"
                src="http://via.placeholder.com/186x186"
                alt="dentist name"
            />
            <Box
                pb={4}
                pl={5}
                pr={3}
                pt={6}
                width="100%"
                borderRadius="4px"
                position="absolute"
                bottom="0"
                bg="rgba(242, 242, 242, 0.7)"
            >
                <Text
                    fontSize={1}
                    color="black"
                    lineHeight="1.29"
                    letterSpacing="-0.5px"
                >
                    1308 Terrace Dr Newton, KS 67114
                </Text>
            </Box>
        </Box>

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
    </Box>
);

export default DentistCard;
