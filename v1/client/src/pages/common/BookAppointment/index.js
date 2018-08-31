import React from 'react';
import { Box, Text, Flex } from '../../../components';
import FindAppointmentForm from '../Forms/FindAppointmentForm';
import SelectAppointment from '../SelectAppointment';

const BookAppointment = () => (
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
                mb={20}
                lineHeight="30px"
                fontWeight="bold"
                color="text.black"
                fontSize={3}
            >
                Make an appointment
            </Text>
            <FindAppointmentForm />
            <SelectAppointment />
            <Text
                mb={16}
                lineHeight="30px"
                fontWeight="bold"
                color="text.black"
                fontSize={3}
            >
                Payment Summary
            </Text>
            <Text mb={40} fontSize={1} letterSpacing="0.4px" color="text.black">
                * This is just a reservation fee. You will be refunded after
                your appointment.
            </Text>
            <Flex mb={10} justifyContent="space-between">
                <Text fontSize={1} color="text.black">
                    Service fee
                </Text>
                <Text fontSize={1} color="text.black">
                    $20.00
                </Text>
            </Flex>
            <Box
                borderBottom="1px solid"
                borderColor="divider.darkGray"
                mb={10}
            />
            <Flex justifyContent="space-between">
                <Text fontSize={2} color="text.green">
                    Total
                </Text>
                <Text fontSize={2} color="text.green">
                    $20.00
                </Text>
            </Flex>
        </Box>
    </Box>
);

export default BookAppointment;
