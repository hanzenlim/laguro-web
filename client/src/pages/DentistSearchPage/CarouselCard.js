import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text, Flex } from '../../components';

const CarouselCard = ({
    name,
    group,
    price,
    proceduresDetail,
    coverage,
    outOfPocket,
}) => (
    <Box width="100%" height="100%" px={[6, '', 10]} mb={12}>
        <Text
            px={18}
            mx="auto"
            mb={-16}
            color="text.white"
            lineHeight="30px"
            bg="background.blue"
            borderRadius={15}
            position="relative"
            width="fit-content"
            fontSize={[0, '', 1]}
        >
            {name}
        </Text>
        <Box
            bg="background.white"
            borderRadius={9}
            px={22}
            pt={30}
            pb={[15, '', 22]}
            boxShadow="1px 1px 12px 0 rgba(0, 0, 0, 0.06), -1px -1px 12px 0 rgba(0, 0, 0, 0.06)"
            height="calc(100% - 30px)"
        >
            <Flex
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
            >
                <Box>
                    <Flex justifyContent="space-between" mb={8}>
                        <Text fontWeight="medium" fontSize={[0, '', 1]}>
                            Estimated price for {group}
                        </Text>
                        <Text fontWeight="medium" fontSize={[0, '', 1]}>
                            {price}
                        </Text>
                    </Flex>
                    <Box mb={14} pl={20} is="ul">
                        {proceduresDetail.map(item => (
                            <Text
                                key={item.code}
                                fontSize={[0, '', 1]}
                                color="text.gray"
                                mb={4}
                                is="li"
                            >
                                {item.name}
                            </Text>
                        ))}
                    </Box>
                </Box>

                <Box>
                    <Flex justifyContent="space-between" mb={6}>
                        <Text fontWeight="medium" fontSize={[0, '', 1]}>
                            Insurance coverage
                        </Text>
                        <Text
                            fontWeight="medium"
                            fontSize={[0, '', 1]}
                            color="#b11f29"
                        >
                            {coverage}
                        </Text>
                    </Flex>
                    <Box
                        borderTop="2px solid"
                        borderColor="divider.gray"
                        mb={10}
                    />

                    <Box textAlign="right">
                        <Text
                            fontWeight="medium"
                            fontSize={[0, '', 2]}
                            is="span"
                        >
                            Out-of-pocket cost* :
                        </Text>
                        <Text
                            fontWeight="medium"
                            fontSize={[0, '', 2]}
                            color="text.blue"
                            ml={10}
                            is="span"
                        >
                            {outOfPocket}
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Box>
    </Box>
);

CarouselCard.propTypes = {
    name: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    proceduresDetail: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            code: PropTypes.string,
        })
    ).isRequired,
    coverage: PropTypes.string.isRequired,
    outOfPocket: PropTypes.string.isRequired,
};

export default CarouselCard;
