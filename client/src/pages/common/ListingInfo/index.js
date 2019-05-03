import React from 'react';
import { Flex, Text, Grid } from '../../../components';

const ListingInfo = ({ availableChairs, category }) => (
    <Grid gridTemplateColumns="1fr 1fr">
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
                Available chair{availableChairs > 1 ? 's' : ''}
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
        <Flex textAlign="center" flexDirection="column" justifyContent="center">
            <Text
                fontWeight="light"
                fontSize={[0, '', 2]}
                lineHeight="18px"
                letterSpacing="-0.4px"
                color="text.black"
                mb={2}
            >
                Plan
            </Text>
            <Text
                fontWeight="medium"
                fontSize={[1, '', 2]}
                lineHeight="18px"
                letterSpacing="-0.4px"
                color="text.blue"
            >
                Option {category}
            </Text>
        </Flex>
    </Grid>
);

export default ListingInfo;
