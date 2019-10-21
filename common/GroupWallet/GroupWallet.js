import React, { useState } from 'react';
import _get from 'lodash/get';
import { Select, Text, Flex } from '~/components';
import WalletDashboard from '~/common/WalletDashboard';
import { getUser } from '~/util/authUtils';

const GroupWallet = props => {
    const { dentalGroups = [] } = props;
    const userId = _get(getUser(), 'id', null);
    const dentalGroupsUserIsAdminOf = dentalGroups.filter(
        d => d.adminUserId === userId
    );
    const defaultWalletId = _get(dentalGroupsUserIsAdminOf, '[0].id', null);
    const [walletId, setWalletId] = useState(defaultWalletId);

    if (!walletId) {
        return (
            <Flex justifyContent="center">
                <Text>Sorry, you don't have access to this page</Text>
            </Flex>
        );
    }

    return (
        <div>
            <Flex mb="10px" justifyContent="flex-end">
                <Select value={walletId} onChange={setWalletId}>
                    {dentalGroupsUserIsAdminOf.map(item => (
                        <Select.Option key={item.id}>{item.name}</Select.Option>
                    ))}
                </Select>
            </Flex>
            <WalletDashboard walletId={walletId} />
        </div>
    );
};

export default GroupWallet;
