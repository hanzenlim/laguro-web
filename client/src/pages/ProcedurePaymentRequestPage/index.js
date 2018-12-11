import React, { PureComponent } from 'react';
import { compose, Query, graphql, withApollo } from 'react-apollo';
import _get from 'lodash/get';
import {
    getUserQuery,
    getPaymentRequestByPayerQuery,
    acceptOrRejectPaymentRequestMutation,
} from './queries';
import ProcedurePaymentRequestPageView from './view';
import { Loading } from '../../components';
import { RedirectErrorPage } from '../../pages/GeneralErrorPage';
import { PENDING } from '../../util/strings';

class ProcedurePaymentRequest extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hasConsented: false,
            isPaymentSuccessful: false,
            isRejectSuccessful: false,
            isSubmitting: false,
            hasClickedNext: false,
        };
    }

    componentDidMount() {
        if (!_get(this, 'props.data.activeUser.id')) {
            this.props.client.writeData({ data: { visibleModal: 'login' } });
        }
    }

    handlePaymentSuccess = async (paymentOptionId, paymentRequestId) => {
        await this.setState({ isSubmitting: true });

        try {
            await this.props.acceptOrRejectPaymentRequestMutation({
                variables: {
                    input: {
                        accept: true,
                        paymentRequestId,
                        paymentOptionId,
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

    render() {
        if (!_get(this, 'props.data.activeUser.id')) return null;

        return (
            <Query
                query={getPaymentRequestByPayerQuery}
                fetchPolicy="network-only"
                variables={{
                    input: {
                        payerId: this.props.data.activeUser.id,
                        status: PENDING,
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

                    const paymentRequestData = _get(
                        data,
                        'getPaymentRequestByPayer'
                    );

                    const handlePaymentSuccess = paymentOptionId => {
                        this.handlePaymentSuccess(
                            paymentOptionId,
                            _get(data, 'getPaymentRequestByPayer.id')
                        );
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
                            onClickCheckbox={this.handleClickCheckbox}
                            onClickNext={this.handleNext}
                            hasConsented={hasConsented}
                            hasClickedNext={hasClickedNext}
                            onPaymentSuccess={handlePaymentSuccess}
                            isSubmitting={isSubmitting}
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
    graphql(acceptOrRejectPaymentRequestMutation, {
        name: 'acceptOrRejectPaymentRequestMutation',
    })
)(ProcedurePaymentRequest);
