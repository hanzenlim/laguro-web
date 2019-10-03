import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, message } from 'antd';
import { Mutation } from 'react-apollo';

import { Text, Button } from '~/components';
import { REMOVE_DWOLLA_FUNDING_SOURCE } from '../mutations';
import { GET_DWOLLA_FUNDING_SOURCES } from '../queries';
import { execute } from '~/util/gqlUtils';
import { getUser } from '~/util/authUtils';

const DeleteFundingSource = ({ fundingSourceUrl }) => {
    const [visible, setVisibility] = useState(false);

    return (
        <Mutation
            mutation={REMOVE_DWOLLA_FUNDING_SOURCE}
            variables={{ input: { fundingSourceUrl } }}
            context={{ clientName: 'wallet' }}
            update={cache => {
                const { id: userId } = getUser();
                const queryToUpdate = {
                    query: GET_DWOLLA_FUNDING_SOURCES,
                    variables: { input: { userId } },
                };

                const { getDwollaFundingSources } = cache.readQuery(
                    queryToUpdate
                );

                cache.writeQuery({
                    ...queryToUpdate,
                    data: {
                        getDwollaFundingSources: getDwollaFundingSources.filter(
                            source =>
                                source.fundingSourceUrl !== fundingSourceUrl
                        ),
                    },
                });

                setVisibility(false);
                message.success('Successfully removed funding source.');
            }}
        >
            {(removeDwollaFundingSource, { loading }) => (
                <Fragment>
                    <Button
                        type="ghost"
                        height="auto"
                        ml={10}
                        onClick={() => setVisibility(true)}
                    >
                        <Text fontSize={10} fontWeight="medium">
                            Delete
                        </Text>
                    </Button>
                    <Modal
                        title="Delete Funding Source"
                        visible={visible}
                        destroyOnClose
                        onCancel={() => setVisibility(false)}
                        centered
                        okButtonProps={{ loading, disabled: loading }}
                        cancelButtonProps={{ loading, disabled: loading }}
                        onOk={async () => {
                            await execute({
                                action: async () => {
                                    await removeDwollaFundingSource();
                                },
                            });
                        }}
                    >
                        <Text textAlign="center">
                            Are you sure you want to remove bank account?
                        </Text>
                    </Modal>
                </Fragment>
            )}
        </Mutation>
    );
};

DeleteFundingSource.propTypes = {
    fundingSourceUrl: PropTypes.string.isRequired,
};

export default DeleteFundingSource;
