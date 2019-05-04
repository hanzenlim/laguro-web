import React, { PureComponent } from 'react';
import { compose, Query, graphql, withApollo } from 'react-apollo';
import _get from 'lodash/get';
import queryString from 'query-string';
import {
    getPaymentRequestByPayerQuery,
    acceptOrRejectPaymentRequestMutation,
} from './queries';
import ProcedurePaymentRequestPageView from './view';
import { Loading } from '../../components';
import { RedirectErrorPage } from '../../pages/GeneralErrorPage';
import { PENDING } from '../../util/strings';
import { getUser } from '../../util/authUtils';
import { execute } from '../../util/gqlUtils';

class ProcedurePaymentRequest extends PureComponent {
    constructor(props) {
        super(props);
        const params = queryString.parse(window.location.search);
        const { patientId } = params;

        this.patientId = patientId;
        this.state = {
            isPaymentSuccessful: false,
            isRejectSuccessful: false,
            isSubmitting: false,
            hasClickedNext: false,
            showDeclinePaymentModal: false,
        };
    }

    updatePaymentRequestStatus = async (
        paymentRequestId,
        paymentOptionId,
        status
    ) => {
        await this.setState({ isSubmitting: true });
        let hasNoError;
        await execute({
            action: async () => {
                hasNoError = await this.props.acceptOrRejectPaymentRequestMutation(
                    {
                        variables: {
                            input: {
                                accept: status,
                                paymentRequestId,
                                paymentOptionId,
                            },
                        },
                    }
                );
            },
        });

        if (status === true && hasNoError) {
            this.setState({ isPaymentSuccessful: true });
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
                        payerId: this.patientId || _get(user, 'id'),
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

                    const originalPrice = _get(
                        paymentRequestData,
                        'originalPrice'
                    );
                    const afterInsuranceAndDiscountBeforeInstallmentPlan = _get(
                        paymentRequestData,
                        'nominalAmount'
                    );

                    const discountRate = _get(
                        paymentRequestData,
                        'discount.rate'
                    );

                    const discountPrice = Math.round(
                        _get(paymentRequestData, 'discount.amount') ||
                            (afterInsuranceAndDiscountBeforeInstallmentPlan /
                                (1 - discountRate)) *
                                discountRate ||
                            0
                    );

                    const insuranceCoverage =
                        originalPrice -
                        afterInsuranceAndDiscountBeforeInstallmentPlan -
                        discountPrice;

                    return (
                        <ProcedurePaymentRequestPageView
                            isPaymentSuccessful={isPaymentSuccessful}
                            installmentPlan={_get(
                                paymentRequestData,
                                'installmentPlan'
                            )}
                            discountPrice={discountPrice}
                            insuranceCoverage={insuranceCoverage}
                            originalPrice={originalPrice}
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
