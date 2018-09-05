import React from 'react';

import { Box, Flex, Image, Rating, Text, Truncate } from '../../../components';

const LinkCard = props => {
    const {
        rating,
        image = 'http://via.placeholder.com/186x186',
        address,
        title,
        subtitle,
        size,
        type,
    } = props;

    return (
        <Box minWidth="186px" width="100%">
            <Box size="186px" position="relative" borderRadius="4px">
                <Box
                    pb={type === 'rectangle' ? '75%' : '100%'}
                    position="relative"
                >
                    <Image
                        position="absolute"
                        borderRadius="4px"
                        src={image}
                        height={props.height}
                        alt={title}
                    />
                </Box>
                {address && (
                    <Flex
                        pb={4}
                        pl={10}
                        pr={3}
                        pt={6}
                        width="100%"
                        minHeight="56px"
                        borderRadius="4px"
                        position="absolute"
                        bottom="0"
                        bg="rgba(242, 242, 242, 0.7)"
                        alignItems="center"
                    >
                        <Text
                            fontSize={size === 'big' ? 3 : 1}
                            color="text.black"
                            lineHeight="1.29"
                            letterSpacing="-0.5px"
                        >
                            {address}
                        </Text>
                    </Flex>
                )}
            </Box>

            <Box mt={5}>
                <Text
                    color="text.black"
                    lineHeight="1.22"
                    fontSize={size === 'big' ? 3 : 2}
                    letterSpacing="-0.8px"
                >
                    <Truncate lines={1}>{title}</Truncate>
                </Text>

                <Text
                    fontStyle="italic"
                    lineHeight="1.1"
                    fontSize={4}
                    color="text.black"
                    fontWeight="bold"
                >
                    <Truncate lines={1}>{subtitle}</Truncate>
                </Text>

                <Box mt={3}>{rating && <Rating disabled value={rating} />}</Box>
            </Box>
        </Box>
    );
};

export default LinkCard;