import React from 'react';
import {
    Box,
    Text,
    Flex,
    Button,
    Counter,
    RangePicker,
} from '../../../components';
import SelectHours from '../SelectHours';
import SelectEquipment from '../SelectEquipment';

const ReserveOffice = () => (
    <Box width="513px">
        <Box
            boxShadow="1px 1px 7px 0 rgba(0, 0, 0, 0.15)"
            border="1px solid"
            borderColor="#dbdbdb"
            pt={16}
            pr={32}
            pl={32}
            pb={32}
        >
            <Text
                mb={26}
                lineHeight="30px"
                fontWeight="bold"
                color="text.black"
                fontSize={3}
            >
                Make a reservation
            </Text>
            <Text mb={50} lineHeight="40px" color="text.black">
                <Text is="span" fontSize={5} fontWeight="bold">
                    $84.17{' '}
                </Text>
                <Text is="span" fontSize={2} fontWeight="500">
                    per day
                </Text>
            </Text>

            <Text mb={6} lineHeight="22px" fontSize={2} color="text.black">
                dates
            </Text>
            <Box mb={28} width="100%">
                <RangePicker />
            </Box>

            <Box mb={30}>
                <Box mb={26}>
                    <SelectHours />
                </Box>
                <Box mb={26}>
                    <SelectHours />
                </Box>
            </Box>

            <Flex mb={20}>
                <Flex flexDirection="column" mr={14}>
                    <Text fontSize={2} fontWeight="bold" color="text.black">
                        Chairs needed
                    </Text>
                    <Text fontSize={1} color="text.black">
                        $50 / chair / hr
                    </Text>
                </Flex>
                <Counter />
            </Flex>

            <SelectEquipment />

            <Box mt={60}>
                <Flex
                    borderBottom="1px solid"
                    borderColor="divider.darkGray"
                    mb={10}
                    pb={10}
                    justifyContent="space-between"
                >
                    <Text fontSize={2} color="text.black">
                        $84.17 x 3 days
                    </Text>
                    <Text fontSize={2} color="text.black">
                        $252.51
                    </Text>
                </Flex>
                <Flex
                    borderBottom="1px solid"
                    borderColor="divider.darkGray"
                    mb={10}
                    pb={10}
                    justifyContent="space-between"
                >
                    <Text fontSize={2} color="text.black">
                        Mobile Cabinets
                    </Text>
                    <Text fontSize={2} color="text.black">
                        $20.00
                    </Text>
                </Flex>
                <Flex
                    borderBottom="1px solid"
                    borderColor="divider.darkGray"
                    mb={10}
                    pb={10}
                    justifyContent="space-between"
                >
                    <Text fontSize={2} color="text.black">
                        Service fee
                    </Text>
                    <Text fontSize={2} color="text.black">
                        $30.00
                    </Text>
                </Flex>
                <Flex justifyContent="space-between">
                    <Text fontSize={2} color="text.black" fontWeight="bold">
                        Total
                    </Text>
                    <Text fontSize={2} color="text.black" fontWeight="bold">
                        $302.51
                    </Text>
                </Flex>
            </Box>
            <Button mt={36} width="100%" fontSize={3} height="70px">
                Make a reservation
            </Button>
        </Box>
    </Box>
);

export default ReserveOffice;
