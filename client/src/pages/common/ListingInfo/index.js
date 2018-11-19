import React from 'react';
import { Grid, Flex, Text } from '../../../components';

const ListingInfo = ({ availableChairs, pricePerChair, cleaningFee }) => (
    <Grid gridTemplateColumns="1fr 1fr 1fr">
        <Flex
            borderRight="solid 1px rgba(0, 0, 0, 0.08)"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            pt={10}
            pb={3}
        >
            <Text
                fontWeight="light"
                fontSize={[0, '', 2]}
                lineHeight="18px"
                letterSpacing="-0.4px"
                color="text.black"
                mb={2}
            >
                Available chairs
            </Text>
            <Text
                fontWeight="medium"
                fontSize={[1, '', 2]}
                lineHeight="18px"
                letterSpacing="-0.4px"
                color="text.blue"
            >
                {availableChairs || '0'}
            </Text>
        </Flex>

        <Flex
            textAlign="center"
            borderRight="solid 1px rgba(0, 0, 0, 0.08)"
            flexDirection="column"
            justifyContent="center"
        >
            <Text
                fontWeight="light"
                fontSize={[0, '', 2]}
                lineHeight="18px"
                letterSpacing="-0.4px"
                color="text.black"
                mb={2}
            >
                Price per chair
            </Text>
            <Text
                fontWeight="medium"
                fontSize={[1, '', 2]}
                lineHeight="18px"
                letterSpacing="-0.4px"
                color="text.blue"
            >
                {pricePerChair || '$0'}
            </Text>
        </Flex>
        <Flex textAlign="center" flexDirection="column" justifyContent="center">
            <Text
                fontWeight="light"
                fontSize={[0, '', 2]}
                lineHeight="18px"
                letterSpacing="-0.4px"
                color="text.black"
                mb={2}
            >
                Cleaning fee
            </Text>
            <Text
                fontWeight="medium"
                fontSize={[1, '', 2]}
                lineHeight="18px"
                letterSpacing="-0.4px"
                color="text.blue"
            >
                {cleaningFee || '$0'}
            </Text>
        </Flex>
    </Grid>
);

export default ListingInfo;
