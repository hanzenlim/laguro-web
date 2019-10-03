import React, { PureComponent } from 'react';
import { Query, withApollo } from 'react-apollo';
import _get from 'lodash/get';
import compose from 'lodash/flowRight';

import {
    GET_DENTIST_PINCODE_QUERY,
    GENERATE_NEW_PINCODE_MUTATION,
} from './query';
import { Loading } from '~/components';
import DentistPosPinCodeView from './view';
import GeneralErrorPage from '~/routes/GeneralErrorPage';
import { getUser } from '~/util/authUtils';

class DentistPosPinCode extends PureComponent {
    constructor(props) {
        super(props);

        const user = getUser();
        this.userId = _get(user, 'id');
        this.dentistId = _get(user, 'dentistId');
    }

    onRenewPincode = async refetch => {
        const result = await this.props.client.mutate({
            mutation: GENERATE_NEW_PINCODE_MUTATION,
            variables: {
                dentistId: this.dentistId,
            },
        });

        // Make an api call to reftch the newly created dentist pin code.
        if (result) {
            refetch();
        }
    };

    render() {
        return (
            <Query
                query={GET_DENTIST_PINCODE_QUERY}
                fetchPolicy="network-only"
                variables={{
                    dentistId: this.dentistId,
                }}
            >
                {({ loading, error, data, refetch }) => {
                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        return <GeneralErrorPage />;
                    }
                    const pinCode = _get(data, 'getDentistPosPincode');

                    return (
                        <DentistPosPinCodeView
                            pinCode={pinCode}
                            onRenewPincode={() => this.onRenewPincode(refetch)}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default compose(withApollo)(DentistPosPinCode);
