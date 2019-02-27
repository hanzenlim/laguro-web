import React from 'react';
import { HealthHistoryFormConfirmation } from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';
import { withApollo } from 'react-apollo';
import { onKioskLogout } from '../../../util/authUtils';

const KioskMedicalHistoryFormConfirmationPage = props => (
    <Flex justifyContent="center" mt="100px" width="100%">
        <HealthHistoryFormConfirmation
            onNext={() => onKioskLogout(props.client)}
        />
    </Flex>
);

export default withApollo(KioskMedicalHistoryFormConfirmationPage);
