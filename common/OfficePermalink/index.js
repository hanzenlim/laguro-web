import React, { Fragment, useState } from 'react';
import { useMutation } from 'react-apollo';
import { message } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

import { Flex, Text, Button, Box, Link } from '~/components';
import { Onboarding } from '~/common/the-bright-side-components';
import { UPDATE_OFFICE } from './queries';

function OfficePermalink({ permalink, officeId, onCancel }) {
    const [localPermalink, setLocalPermalink] = useState(permalink);
    const [newPermalink, setNewPermalink] = useState(false);
    const [updateOffice, { loading }] = useMutation(UPDATE_OFFICE);

    const onUpdateOffice = async () => {
        try {
            const response = await updateOffice({
                variables: {
                    input: {
                        id: officeId,
                        permalink: localPermalink,
                    },
                },
            });

            setNewPermalink(_get(response, 'data.updateOffice.permalink'));
        } catch (error) {
            if (!_isEmpty(error.graphQLErrors)) {
                message.error(error.graphQLErrors[0].message);
            } else {
                message.error('Internal server error');
            }
        }
    };

    return (
        <Box py={['', '27px', '']} px={['', '75px', '']}>
            {newPermalink ? (
                <Box textAlign="center">
                    <Text fontSize={2} mb={20}>
                        Successfully updated unique profile link
                    </Text>

                    <Link
                        to={`/office/${newPermalink}`}
                        type="ghost"
                        target="_blank"
                        isExternal
                    >
                        <Button
                            height="50px"
                            width="100%"
                            fontWeight="bold"
                            fontSize={3}
                        >
                            View Office
                        </Button>
                    </Link>
                </Box>
            ) : (
                <Fragment>
                    <Text fontSize={2} mb={10}>
                        Set your unique profile link
                    </Text>
                    <Flex justifyContent="center" width="100%">
                        <Onboarding.Input
                            type="text"
                            name="permalink"
                            value={localPermalink}
                            onChange={e => setLocalPermalink(e.target.value)}
                            height="50px"
                        />
                    </Flex>

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
                </Fragment>
            )}
        </Box>
    );
}

export default OfficePermalink;
