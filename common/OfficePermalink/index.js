import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { message } from 'antd';
import _isEmpty from 'lodash/isEmpty';

import { Flex, Text, Button, Box } from '~/components';
import { Onboarding } from '~/common/the-bright-side-components';
import { UPDATE_OFFICE } from './query';

function OfficePermalink({ permalink, officeId, onCancel }) {
    const [localPermalink, setLocalPermalink] = useState(permalink);
    const [updateOffice, { loading }] = useMutation(UPDATE_OFFICE);

    const onUpdateOffice = async () => {
        try {
            await updateOffice({
                variables: {
                    input: {
                        id: officeId,
                        permalink: localPermalink,
                    },
                },
            });

            message.success('Successfully updated permalink');
            onCancel();
        } catch (error) {
            if (!_isEmpty(error.graphQLErrors)) {
                message.error(error.graphQLErrors[0].message);
            } else {
                message.error('Interal server error');
            }
        }
    };

    return (
        <Box py={27} px={75} textAlign="center">
            <Flex justifyContent="center" width="100%">
                <Onboarding.Input
                    type="text"
                    name="permalink"
                    value={localPermalink}
                    onChange={e => setLocalPermalink(e.target.value)}
                    height="50px"
                />
            </Flex>

            <Text fontSize={3} mb={20}>
                Set office unique permalink
            </Text>

            <Flex justifyContent="flex-end" alignItems="center">
                <Button
                    type="ghost"
                    height="50px"
                    width={164}
                    onClick={onCancel}
                    mr={20}
                >
                    <Text
                        fontWeight="bold"
                        fontSize={3}
                        color="text.blue"
                        border="2px solid"
                        borderColor="divider.blue"
                        borderRadius="4px"
                        lineHeight="45px"
                    >
                        Cancel
                    </Text>
                </Button>
                <Button
                    loading={loading}
                    height="50px"
                    width={164}
                    onClick={onUpdateOffice}
                    fontWeight="bold"
                    fontSize={3}
                >
                    Save
                </Button>
            </Flex>
        </Box>
    );
}

export default OfficePermalink;
