import React from 'react';
import { HealthHistoryFormConfirmation } from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';
import { withApollo } from 'react-apollo';
import { onKioskLogout } from '../../../util/authUtils';

const KioskMedicalHistoryFormConfirmationPage = props => {
    return (
        <Flex justifyContent="center" mt="100px">
            <HealthHistoryFormConfirmation
                onNext={() => onKioskLogout(props.client)}
            />
        </Flex>
    );
};

export default withApollo(KioskMedicalHistoryFormConfirmationPage);
