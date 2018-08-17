import React from 'react';

import { Box, Rating, Text, Image } from '../../../components';

const SearchResultsCard = props => {
    const {
        rating = 2.5,
        image = 'http://via.placeholder.com/186x186',
        address = '1308 Terrace Dr Newton, KS 67114',
        title = 'DR. Michelle Choi',
        subtitle = 'implant specialista',
    } = props;

    return (
        <Box minWidth="186px" width="100%">
            <Box size="186px" position="relative" borderRadius="4px">
                <Image borderRadius="4px" src={image} alt={title} />
                <Box
                    pb={4}
                    pl={5}
                    pr={3}
                    pt={6}
                    width="100%"
                    minHeight="56px"
                    borderRadius="4px"
                    position="absolute"
                    bottom="0"
                    bg="rgba(242, 242, 242, 0.7)"
                >
                    <Text
                        fontSize={1}
                        color="text.black"
                        lineHeight="1.29"
                        letterSpacing="-0.5px"
                    >
                        {address}
                    </Text>
                </Box>
            </Box>

            <Box mt={5}>
                <Text
                    color="text.black"
                    lineHeight="1.22"
                    fontSize={2}
                    letterSpacing="-0.8px"
                    truncate
                >
                    {title}
                </Text>

                <Text
                    is="i"
                    lineHeight="1.1"
                    fontSize={3}
                    color="text.black"
                    fontWeight="bold"
                    truncate
                >
                    {subtitle}
                </Text>

                <Box mt={3}>
                    <Rating disabled value={rating} />
                </Box>
            </Box>
        </Box>
    );
};

export default SearchResultsCard;
