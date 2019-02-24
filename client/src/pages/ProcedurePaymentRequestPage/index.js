import React, { PureComponent } from 'react';
import { compose, Query, graphql, withApollo } from 'react-apollo';
import _get from 'lodash/get';
import {
    getPaymentRequestByPayerQuery,
    acceptOrRejectPaymentRequestMutation,
} from './queries';
import ProcedurePaymentRequestPageView from './view';
import { Loading } from '../../components';
import { RedirectErrorPage } from '../../pages/GeneralErrorPage';
import { PENDING } from '../../util/strings';
import { getUser } from '../../util/authUtils';

class ProcedurePaymentRequest extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isPaymentSuccessful: false,
            isRejectSuccessful: false,
            isSubmitting: false,
            hasClickedNext: false,
            showDeclinePaymentModal: false,
        };
    }

    componentDidMount() {
        const user = getUser();
        if (!_get(user, 'id')) {
            this.props.client.writeData({ data: { visibleModal: 'login' } });
        }
    }

    updatePaymentRequestStatus = async (
        paymentRequestId,
        paymentOptionId,
        status
    ) => {
        await this.setState({ isSubmitting: true });

        try {
            await this.props.acceptOrRejectPaymentRequestMutation({
                variables: {
                    input: {
                        accept: status,
                        paymentRequestId,
                        paymentOptionId,
                    },
                },
            });

            if (status === true) {
                this.setState({ isPaymentSuccessful: true });
            }
        } catch (error) {
            throw error;
        }

        this.setState({ isSubmitting: false });
    };

    handleNext = () => {
        this.setState({ hasClickedNext: true });
    };

    updateSubmittingState = isSubmitting => {
        this.setState({ isSubmitting });
    };

    toggleDeclinePaymentBtn = () => {
        this.setState({
            showDeclinePaymentModal: !this.state.showDeclinePaymentModal,
        });
    };

    render() {
        const user = getUser();
        if (!_get(user, 'id')) return null;

        return (
            <Query
                query={getPaymentRequestByPayerQuery}
                fetchPolicy="network-only"
                variables={{
                    input: {
                        payerId: _get(user, 'id'),
                        status: PENDING,
                    },
                }}
            >
                {({ loading, error, data, refetch }) => {
                    const {
                        hasClickedNext,
                        isPaymentSuccessful,
                        isSubmitting,
                    } = this.state;

                    if (loading) return <Loading />;
                    if (error) return <RedirectErrorPage />;

                    const paymentRequestData = _get(
                        data,
                        'getPaymentRequestByPayer'
                    );

                    const handlePaymentSuccess = paymentOptionId => {
                        this.updatePaymentRequestStatus(
                            _get(paymentRequestData, 'id'),
                            paymentOptionId,
                            true
                        );
                    };

                    const handleDeclinePayment = async () => {
                        await this.updatePaymentRequestStatus(
                            _get(paymentRequestData, 'id'),
                            null,
                            false
                        );

                        refetch();
                        window.scrollTo(0, 0);
                    };

                    const discountPrice =
                        _get(paymentRequestData, 'originalPrice') -
                        _get(paymentRequestData, 'nominalAmount');

                    return (
                        <ProcedurePaymentRequestPageView
                            isPaymentSuccessful={isPaymentSuccessful}
                            installmentPlan={_get(
                                paymentRequestData,
                                'installmentPlan'
                            )}
                            discountPrice={discountPrice}
                            originalPrice={_get(
                                paymentRequestData,
                                'originalPrice'
                            )}
                            nominalAmount={_get(
                                paymentRequestData,
                                'nominalAmount'
                            )}
                            patientProcedures={_get(
                                paymentRequestData,
                                'invoice.items'
                            )}
                            onClickNext={this.handleNext}
                            onDeclineBtn={this.toggleDeclinePaymentBtn}
                            hasClickedNext={hasClickedNext}
                            onPaymentSuccess={handlePaymentSuccess}
                            isSubmitting={isSubmitting}
                            updateSubmittingState={this.updateSubmittingState}
                            onSubmitDeclinePayment={handleDeclinePayment}
                            showDeclinePaymentModal={
                                this.state.showDeclinePaymentModal
                            }
                            onCancelDeclinePayment={
                                this.toggleDeclinePaymentBtn
                            }
                        />
                    );
                }}
            </Query>
        );
    }
}

export default compose(
    withApollo,
    graphql(acceptOrRejectPaymentRequestMutation, {
        name: 'acceptOrRejectPaymentRequestMutation',
    })
)(ProcedurePaymentRequest);
