import React from 'react';
import { OnboardSuccess } from '@laguro/the-bright-side-components';
import { Flex, Loading } from '@laguro/basic-components';
import { withApollo } from 'react-apollo';
import { onKioskLogout } from '../../util/authUtils';
import { Query } from 'react-apollo';
import { ACTIVE_USER } from './queries';
import _get from 'lodash/get';
import { adopt } from 'react-adopt';
import GeneralErrorPage from '../../pages/GeneralErrorPage';

const Composed = adopt({
    activeUser: ({ render }) => {
        return <Query query={ACTIVE_USER}>{render}</Query>;
    },
});

const getValues = data => {
    const firstName = _get(data, 'firstName');
    const lastName = _get(data, 'lastName');

    return {
        name: `${firstName} ${lastName}`,
    };
};

const KioskConfirmationPage = props => {
    return (
        <Composed>
            {({ activeUser }) => {
                if (_get(activeUser, 'loading')) {
                    return <Loading />;
                }

                if (!_get(activeUser, 'data.activeUser')) {
                    return <GeneralErrorPage />;
                }

                const values = getValues(_get(activeUser, 'data.activeUser'));

                return (
                    <Flex justifyContent="center" mt="100px">
                        <OnboardSuccess
                            name={values.name}
                            onNext={() => {
                                onKioskLogout(props.client);
                            }}
                        />
                    </Flex>
                );
            }}
        </Composed>
    );
};

export default withApollo(KioskConfirmationPage);
