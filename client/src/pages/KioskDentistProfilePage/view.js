import React from 'react';
import PropTypes from 'prop-types';

import { Flex, Box, Button, Text } from '../../components';

const propTypes = {
    data: PropTypes.any,
    createQuery: PropTypes.string,
    onCreate: PropTypes.func,
};

const defaultProps = {
    data: { status: 'this is a test' },
    createQuery: 'query',
    onCreate: () => {},
};

const KioskDentistProfileView = ({ data, createQuery, onCreate }) => (
    <Flex height="100vh">
        <Flex
            m={20}
            flex={1}
            flexDirection="column"
            borderRight="1px solid black"
        >
            <Box flex={1}>
                <Button onClick={onCreate}>Create</Button>
                <Text fontSize={1} color="text.blue">
                    Make sure user is not a dentist yet.
                </Text>
                <Box mt={10}>
                    <pre>
                        <samp>{JSON.stringify(createQuery, null, 2)}</samp>
                    </pre>
                </Box>
            </Box>
        </Flex>
        <Box m={20} flex={1}>
            <Button disabled>Response</Button>
            <Box mt={10}>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </Box>
        </Box>
    </Flex>
);

KioskDentistProfileView.propTypes = propTypes;
KioskDentistProfileView.defaultProps = defaultProps;

export default KioskDentistProfileView;
