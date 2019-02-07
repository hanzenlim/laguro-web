import React from 'react';
import { OnboardSuccess } from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';
import { withApollo } from 'react-apollo';
import cookies from 'browser-cookies';

const KioskCheckInPage = props => {
    return (
        <Flex justifyContent="center" mt="100px">
            <OnboardSuccess
                onNext={async () => {
                    props.client.writeData({
                        data: { activeUser: null },
                    });

                    cookies.set('user', '');

                    props.history.push('/kiosk/registration');
                }}
            />
        </Flex>
    );
};

export default withApollo(KioskCheckInPage);
