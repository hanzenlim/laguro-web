import React from 'react';
import { OnboardSuccess } from '@laguro/the-bright-side-components';
import { Flex, Loading } from '@laguro/basic-components';
import { withApollo } from 'react-apollo';
import { onKioskLogout } from '../../util/authUtils';
import { Query } from 'react-apollo';
import { GET_USER } from './queries';
import _get from 'lodash/get';
import { adopt } from 'react-adopt';
import GeneralErrorPage from '../../pages/GeneralErrorPage';

const Composed = adopt({
    getUser: ({ render, patientId }) => (
        <Query query={GET_USER} variables={{ id: patientId }}>
            {render}
        </Query>
    ),
});

const getValues = data => {
    const firstName = _get(data, 'firstName');
    const lastName = _get(data, 'lastName');

    return {
        name: `${firstName} ${lastName}`,
    };
};

const KioskConfirmationPage = props => {
    const patientId = _get(props, 'match.params.id');

    return (
        <Composed patientId={patientId}>
            {({ getUser }) => {
                if (_get(getUser, 'loading')) {
                    return <Loading />;
                }
                if (!_get(getUser, 'data.getUser.id')) {
                    return <GeneralErrorPage />;
                }

                const values = getValues(_get(getUser, 'data.getUser'));

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
