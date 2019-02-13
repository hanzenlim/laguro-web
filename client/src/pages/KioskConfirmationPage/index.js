import React from 'react';
import { OnboardSuccess } from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';
import { withApollo } from 'react-apollo';
import { onKioskLogout } from '../../util/authUtils';

const KioskCheckInPage = props => {
    return (
        <Flex justifyContent="center" mt="100px">
            <OnboardSuccess
                onNext={() => {
                    onKioskLogout(props.client);
                }}
            />
        </Flex>
    );
};

export default withApollo(KioskCheckInPage);
