import React from 'react';

import { Box, Text, Flex } from '../../../components';

const ResultCard = () => (
    <Box
        maxWidth={[324, '', 377]}
        width="100%"
        mx="auto"
        px={[6, '', 17]}
        position="relative"
    >
        <Text
            px={18}
            py={6}
            mx="auto"
            mb={-16}
            color="text.white"
            bg="#9e84ff"
            borderRadius={15}
            position="relative"
            width="fit-content"
            className="title-tag"
        >
            Cast metal denture per arch
        </Text>

        <Box className="inactive-box-text" textAlign="center">
            <Text fontSize="11px" mb={12}>
                Click to see price breakdown for:
            </Text>
            <Text
                px={18}
                py={6}
                mx="auto"
                mb={-16}
                color="text.white"
                bg="#9e84ff"
                borderRadius={15}
                position="relative"
                width="fit-content"
            >
                Cast metal denture per arch
            </Text>
        </Box>

        <Box
            bg="background.white"
            borderRadius={9}
            p={22}
            className="white-box"
        >
            <Flex justifyContent="space-between" mb={8}>
                <Text fontSize={0} fontWeight="medium">
                    Estimated price for Braces
                </Text>
                <Text fontSize={0} fontWeight="medium">
                    $500
                </Text>
            </Flex>
            <Box mb={8} pl={10}>
                <Text color="text.gray" fontSize="10px" mb={4}>
                    X-ray X-ray X-ray X-ray X-ray X-ray X-ray X-ray X-ray X-ray
                </Text>
                <Text color="text.gray" fontSize="10px" mb={4}>
                    Braces Braces Braces Braces Braces Braces
                </Text>
                <Text color="text.gray" fontSize="10px" mb={4}>
                    Equipments
                </Text>
            </Box>
            <Flex justifyContent="space-between" mb={8}>
                <Text fontSize={0} fontWeight="medium">
                    Insurance coverage
                </Text>
                <Text fontSize={0} fontWeight="medium" color="#b11f29">
                    -$100.22
                </Text>
            </Flex>
            <Box mb={8} pl={10}>
                <Flex justifyContent="space-between" mb={4}>
                    <Text color="text.gray" fontSize="10px">
                        Deductable
                    </Text>
                    <Text color="text.gray" fontSize="10px">
                        -$50 (Up to $50)
                    </Text>
                </Flex>
                <Flex justifyContent="space-between" mb={4}>
                    <Text color="text.gray" fontSize="10px">
                        -$50 (Up to $50)
                    </Text>
                    <Text color="text.gray" fontSize="10px">
                        -$233.23
                    </Text>
                </Flex>
            </Box>
            <Box borderTop="2px solid" borderColor="divider.gray" mb={5} />

            <Box textAlign="right" mb={20}>
                <Text fontWeight="medium" fontSize={2} is="span">
                    Out-of-pocket cost* :
                </Text>
                <Text
                    fontWeight="medium"
                    fontSize={2}
                    color="text.blue"
                    ml={10}
                    is="span"
                >
                    $234.23
                </Text>
            </Box>

            <Text fontSize="10px" fontWeight="light">
                *This is an estimation based on the insurance input. Actual
                coverage pricing may differ.
            </Text>
        </Box>
    </Box>
);

export default ResultCard;
