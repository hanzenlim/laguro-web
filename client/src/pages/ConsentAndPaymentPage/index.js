import React, { PureComponent } from 'react';
import { compose, Query, graphql, withApollo } from 'react-apollo';
import _get from 'lodash/get';
import {
    getUserQuery,
    getProceduresQuery,
    updatePatientProcedures as updatePatientProceduresMutation,
    updatePatientProceduresStatus as updatePatientProceduresStatusMutation,
} from './queries';
import ConsentAndPaymentPageView from './view';
import { Loading } from '../../components';
import { RedirectErrorPage } from '../../pages/GeneralErrorPage';
import { PATIENT_ID, STATUS, PENDING, REJECTED } from '../../util/strings';

class ConsentAndPaymentPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hasConsented: false,
            isPaymentSuccessful: false,
            isRejectSuccessful: false,
            isSubmitting: false,
            hasClickedNext: false,
            rejectedIds: [],
        };
    }

    componentDidMount() {
        if (!_get(this, 'props.data.activeUser.id')) {
            this.props.client.writeData({ data: { visibleModal: 'login' } });
        }
    }

    handlePaymentSuccess = async (paymentOptionId, patientProcedures) => {
        await this.setState({ isSubmitting: true });
        const procedureIds = patientProcedures
            .map(item => item.id)
            .filter(item => !this.state.rejectedIds.includes(item));

        try {
            await this.props.updatePatientProcedures({
                variables: {
                    input: {
                        procedureIds,
                        paymentOptionId,
                    },
                },
            });

            if (this.state.rejectedIds.length)
                await this.props.updatePatientProceduresStatus({
                    variables: {
                        input: {
                            procedureIds: this.state.rejectedIds,
                            status: REJECTED,
                        },
                    },
                });

            this.setState({ isPaymentSuccessful: true });
        } catch (error) {
            throw error;
        }

        this.setState({ isSubmitting: false });
    };

    handleNext = () => {
        this.setState({ hasClickedNext: true });
    };

    handleClickCheckbox = () => {
        this.setState({ hasConsented: !this.state.hasConsented });
    };

    updateSubmittingState = isSubmitting => {
        this.setState({ isSubmitting });
    };

    rejectProcedure = id => () => {
        this.setState(({ rejectedIds }) => ({
            rejectedIds: rejectedIds.includes(id)
                ? rejectedIds.filter(rejectedId => rejectedId !== id)
                : [...rejectedIds, id],
        }));
    };

    confirmRejectAllProcedures = async () => {
        await this.setState({ isSubmitting: true });
        try {
            await this.props.updatePatientProceduresStatus({
                variables: {
                    input: {
                        procedureIds: this.state.rejectedIds,
                        status: REJECTED,
                    },
                },
            });

            this.setState({ isRejectSuccessful: true });
        } catch (error) {
            throw error;
        }

        this.setState({ isSubmitting: false });
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
                                filterValues: [PENDING],
                            },
                        },
                    },
                }}
            >
                {({ loading, error, data }) => {
                    const {
                        hasConsented,
                        hasClickedNext,
                        isPaymentSuccessful,
                        isSubmitting,
                    } = this.state;

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
                            isPaymentSuccessful={isPaymentSuccessful}
                            patientProcedures={patientProcedures}
                            onClickCheckbox={this.handleClickCheckbox}
                            onClickNext={this.handleNext}
                            hasConsented={hasConsented}
                            hasClickedNext={hasClickedNext}
                            onPaymentSuccess={handlePaymentSuccess}
                            isSubmitting={isSubmitting}
                            updateSubmittingState={this.updateSubmittingState}
                            rejectedIds={this.state.rejectedIds}
                            rejectProcedure={this.rejectProcedure}
                            confirmRejectAllProcedures={
                                this.confirmRejectAllProcedures
                            }
                            isRejectSuccessful={this.state.isRejectSuccessful}
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
    graphql(updatePatientProceduresMutation, {
        name: 'updatePatientProcedures',
    }),
    graphql(updatePatientProceduresStatusMutation, {
        name: 'updatePatientProceduresStatus',
    })
)(ConsentAndPaymentPage);
