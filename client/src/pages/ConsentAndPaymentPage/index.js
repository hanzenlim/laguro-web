import React, { PureComponent } from 'react';
import { compose, Query, graphql, withApollo } from 'react-apollo';
import _get from 'lodash/get';
import {
    getUserQuery,
    getProceduresQuery,
    updatePatientProcedures,
} from './queries';
import ConsentAndPaymentPageView from './view';
import { Loading } from '../../components';
import { RedirectErrorPage } from '../../pages/GeneralErrorPage';
import { PATIENT_ID, STATUS, PENDING } from '../../util/strings';

class ConsentAndPaymentPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hasConsented: false,
            isPaymentSuccessful: false,
            isSubmitting: false,
        };
    }

    componentDidMount() {
        if (!_get(this, 'props.data.activeUser.id')) {
            this.props.client.writeData({ data: { visibleModal: 'login' } });
        }
    }

    handlePaymentSuccess = async (paymentOptionId, patientProcedures) => {
        await this.setState({ isSubmitting: true });
        const procedureIds = patientProcedures.map(item => item.id);
        const result = await this.props.mutate({
            variables: {
                input: {
                    procedureIds,
                    paymentOptionId,
                },
            },
        });

        if (result) {
            this.setState({ isPaymentSuccessful: true });
        }

        this.setState({ isSubmitting: false });
    };

    handleClickCheckbox = () => {
        this.setState({ hasConsented: !this.state.hasConsented });
    };

    updateSubmittingState = isSubmitting => {
        this.setState({ isSubmitting });
    };

    render() {
        if (!_get(this, 'props.data.activeUser.id')) return null;

        return (
            <Query
                query={getProceduresQuery}
                fetchPolicy="network-only"
                variables={{
                    input: {
                        partitionKey: PATIENT_ID,
                        partitionValue: this.props.data.activeUser.id,
                        options: {
                            filters: {
                                filterKey: STATUS,
                                filterValue: PENDING,
                            },
                        },
                    },
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <Loading />;
                    if (error) return <RedirectErrorPage />;

                    const patientProcedures = _get(
                        data,
                        'queryPatientProcedure'
                    );

                    const handlePaymentSuccess = paymentOptionId => {
                        this.handlePaymentSuccess(
                            paymentOptionId,
                            patientProcedures
                        );
                    };

                    return (
                        <ConsentAndPaymentPageView
                            isPaymentSuccessful={this.state.isPaymentSuccessful}
                            patientProcedures={patientProcedures}
                            onClickCheckbox={this.handleClickCheckbox}
                            hasConsented={this.state.hasConsented}
                            onPaymentSuccess={handlePaymentSuccess}
                            isSubmitting={this.state.isSubmitting}
                            updateSubmittingState={this.updateSubmittingState}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default compose(
    withApollo,
    graphql(getUserQuery),
    graphql(updatePatientProcedures)
)(ConsentAndPaymentPage);
