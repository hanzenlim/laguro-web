import React, { Fragment } from 'react';
import get from 'lodash/get';
import { Flex, Box, Text, Rating, Truncate } from '../../../components';

import Map from '../../common/Map';

const OfficeDetailsView = props => {
    const { data } = props;

    return (
        <Fragment>
            <Box width="732px" mt={20} mr={34}>
                <Flex alignItems="center" mb={40} flexDirection="column">
                    <Text
                        color="text.black"
                        fontSize={5}
                        lineHeight="34px"
                        letterSpacing="-0.8px"
                    >
                        {data.name}
                    </Text>
                    <Text fontSize={4} lineHeight="34px" letterSpacing="-0.8px">
                        {data.address.name}
                    </Text>
                    <Flex mt={10} alignItems="center">
                        <Rating size="18px" value="3" disabled />
                        <Text
                            ml={10}
                            lineHeight="16px"
                            color="text.black"
                            fontSize={1}
                        >
                            {data.numReviews} reviews
                        </Text>
                    </Flex>
                </Flex>
                {data.description && (
                    // Added fixed width to fix bug in rendering truncated text
                    <Box pb={42} width="732px">
                        <Text fontSize={4} lineHeight="1.3">
                            description room
                        </Text>
                        <Text fontSize={1} lineHeight="1.86">
                            <Truncate
                                lines={3}
                                toggle={
                                    <Text
                                        is="span"
                                        color="text.green"
                                        fontWeight="bold"
                                    >
                                        show more
                                    </Text>
                                }
                            >
                                {data.description}
                            </Truncate>
                        </Text>
                    </Box>
                )}

                <Box pt={40} borderTop="1px solid" borderColor="divider.gray">
                    <Text
                        color="text.black"
                        fontSize={4}
                        lineHeight="1.5"
                        letterSpacing="1.5"
                    >
                        address information{' '}
                        <Text is="span" fontWeight="bold">
                            - {data.address.name}
                        </Text>
                    </Text>

                    <Box width="100%" height="440px" mt={20}>
                        <Map
                            height={440}
                            width={732}
                            zoom={13}
                            data={[
                                {
                                    address: data.address.name,
                                    latitude: get(data, 'address.geoPoint.lat'),
                                    longitude: get(
                                        data,
                                        'address.geoPoint.lon'
                                    ),
                                },
                            ]}
                        />
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
};

export default OfficeDetailsView;
