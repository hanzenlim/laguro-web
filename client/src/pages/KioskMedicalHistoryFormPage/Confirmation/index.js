import React from 'react';
import { HealthHistoryFormConfirmation } from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';
import { withApollo } from 'react-apollo';
import cookies from 'browser-cookies';

const KioskMedicalHistoryFormConfirmationPage = props => {
    return (
        <Flex justifyContent="center" mt="100px">
            <HealthHistoryFormConfirmation
                onNext={async () => {
                    props.client.writeData({
                        data: { activeUser: null },
                    });

                    cookies.erase('user');

                    props.history.push('/kiosk/registration');
                }}
            />
        </Flex>
    );
};

export default withApollo(KioskMedicalHistoryFormConfirmationPage);
