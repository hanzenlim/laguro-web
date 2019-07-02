import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { Query } from 'react-apollo';
import moment from 'moment';
import { getBundleCoverage, getUserQuery } from './queries';
import { pricingClient } from '../../../util/apolloClients';
import { renderPriceWithoutZeros } from '../../../util/paymentUtil';
import history from '../../../history';
import { getUser } from '../../../util/authUtils';
import emitter from '../../../util/emitter';
import { PATIENT_DASHBOARD_PAGE_URL_BASE } from '../../../util/urls';
import {
    trackSelectProcedure,
    trackSelectInsurance,
    trackCheckOutOfPocketAttempt,
} from '../../../util/trackingUtils';
import { getInsuranceText } from '../../../util/insuranceUtil';

import PriceEstimationView from './view';

class PriceEstimation extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            procedureIndex: 0,
            selectedProcedure: props.bundles[0],
            selectedProcedureIndex: 0,
            selectedInsurance: null,
            hasCheckedOutOfPocketCost: false,
            withInsurance: false,
            isRefetching: false,
        };
    }

    getCurrentBundle = selectedProcedure => {
        const { bundles } = this.props;

        if (!_isEmpty(bundles)) {
            const filteredBundleElement = bundles.filter(
                item =>
                    item.name.toLowerCase() === selectedProcedure.toLowerCase()
            );

            if (!_isEmpty(filteredBundleElement)) {
                return filteredBundleElement[0];
            }

            return null;
        }

        return null;
    };

    getIndexOfBundle = selectedProcedure => {
        const { bundles } = this.props;

        const index = bundles.findIndex(
            bundle => bundle.name === selectedProcedure
        );

        return index;
    };

    handleSelectProcedure = args => {
        const { key = '' } = args;
        const selectedProcedure = this.getCurrentBundle(key);

        this.setState({
            selectedProcedure,
            procedureIndex: this.getIndexOfBundle(key),
        });

        if (trackSelectProcedure && !_isEmpty(selectedProcedure)) {
            trackSelectProcedure({
                eventLabel: `${selectedProcedure.group} - ${
                    selectedProcedure.name
                }`,
            });
        }
    };

    handleCheckOutOfPocketCost = () => {
        const user = getUser();
        const dentistId = history.location.pathname.split('/')[2];

        if (trackCheckOutOfPocketAttempt) {
            trackCheckOutOfPocketAttempt({ internalPage: 'dentist' });
        }

        if (!_get(user, 'id')) {
            emitter.emit('loginModal', {
                redirectPath: `/dentist/${dentistId}`,
            });
        }

        this.setState({
            hasCheckedOutOfPocketCost: true,
            withInsurance: true,
        });
    };

    handleAddInsurance = selectedInsurance => {
        this.setState({ selectedInsurance });

        if (trackSelectInsurance && !_isEmpty(selectedInsurance)) {
            trackSelectInsurance({
                eventLabel: getInsuranceText(selectedInsurance),
            });
        }
    };

    getOutOfPocketData = ({ getBundleCoverageData, userData }) => ({
        selectedInsurance: _get(
            getBundleCoverageData,
            'getBundleCoverage.insuranceName'
        ),
        hasCheckedOutOfPocketCost: this.state.hasCheckedOutOfPocketCost,
        insuranceNumber: _get(userData, 'getUser.insuranceInfo.policyHolderId'),
        withInsurance:
            this.state.withInsurance &&
            _get(userData, 'getUser.insuranceInfo.policyHolderId'),
        // Left card info
        selectedProcedure: this.state.selectedProcedure.group,
        selectedProcedureName: this.state.selectedProcedure.name,
        bundles: this.props.bundles,
        procedures: this.props.bundles,
        insurance: [
            _get(getBundleCoverageData, 'getBundleCoverage.insuranceName'),
        ],
        // Card info
        proceduresDetail:
            _get(getBundleCoverageData, 'getBundleCoverage.proceduresDetail') ||
            [],
        insuranceName: _get(
            getBundleCoverageData,
            'getBundleCoverage.insuranceName'
        ),
        insurancePrice: renderPriceWithoutZeros(
            _get(getBundleCoverageData, 'getBundleCoverage.insurancePrice')
        ),
        outOfPocket: renderPriceWithoutZeros(
            _get(getBundleCoverageData, 'getBundleCoverage.outOfPocket')
        ),
        price: this.state.hasCheckedOutOfPocket
            ? renderPriceWithoutZeros(
                  _get(getBundleCoverageData, 'getBundleCoverage.price')
              )
            : renderPriceWithoutZeros(
                  this.props.bundles[this.state.procedureIndex].price
              ),
        group: _get(getBundleCoverageData, 'getBundleCoverage.group'),
        deductibleRemaining: renderPriceWithoutZeros(
            _get(getBundleCoverageData, 'getBundleCoverage.deductibleRemaining')
        ),
        annualMaximumRemaining: renderPriceWithoutZeros(
            _get(
                getBundleCoverageData,
                'getBundleCoverage.annualMaximumRemaining'
            )
        ),
        coverage: renderPriceWithoutZeros(
            _get(getBundleCoverageData, 'getBundleCoverage.coverage')
        ),
        // from local state
        patientName: `${getUser().firstName} ${getUser().lastName}`,
        dateUpdated: moment(
            _get(getBundleCoverageData, 'getBundleCoverage.dateUpdated') ||
                _get(getBundleCoverageData, 'getBundleCoverage.dateCreated')
        ).format('MM/DD/YY'),
    });

    getPriceEstimtationData = () => {
        let insurancePrice = '';

        if (this.state.selectedInsurance) {
            const filteredInsurance = this.props.bundles[
                this.state.procedureIndex
            ].insuranceList.filter(
                i => i.name === this.state.selectedInsurance
            );

            insurancePrice = renderPriceWithoutZeros(
                filteredInsurance.length
                    ? filteredInsurance[0].price
                    : this.props.bundles[this.state.procedureIndex].price
            );
        } else {
            insurancePrice = renderPriceWithoutZeros(
                this.props.bundles[this.state.procedureIndex].price
            );
        }

        return {
            selectedInsurance: this.state.selectedInsurance,
            selectedProcedure: this.state.selectedProcedure.group,
            selectedProcedureName: this.state.selectedProcedure.name,
            procedures: this.props.bundles,
            insurance: this.props.acceptedInsurances,
            proceduresDetail: this.props.bundles[this.state.procedureIndex]
                .proceduresDetail,
            price: renderPriceWithoutZeros(
                this.props.bundles[this.state.procedureIndex].price
            ),
            insurancePrice,
        };
    };

    getPriceEstimtationAction = () => ({
        onSelectProcedure: this.handleSelectProcedure,
        onCheckOutOfPocketCost: this.handleCheckOutOfPocketCost,
        onAddInsurance: this.handleAddInsurance,
        redirectToAddInsurance: this.handleRedirect,
    });

    handleRedirect = () => {
        window.open(`${PATIENT_DASHBOARD_PAGE_URL_BASE}insurance`, '_blank');
    };

    getQueryVariables = () => {
        const { selectedProcedure } = this.state;
        const user = getUser();
        const dentistId = history.location.pathname.split('/')[2];

        return {
            input: {
                id: _get(selectedProcedure, 'bundleId'),
                dentistId,
                patientId: _get(user, 'id'),
            },
        };
    };

    onGetBundleComplete = data => {
        if (!_get(data, 'getBundleCoverage.insuranceName')) {
            message.warning(
                'You have not provided insurance information. Please input the information and reload this page'
            );
        }
    };

    render() {
        const user = getUser();
        const { hasCheckedOutOfPocketCost } = this.state;
        const priceEstimationData = this.getPriceEstimtationData();
        const priceEstimationAction = this.getPriceEstimtationAction();
        const queryVariables = this.getQueryVariables();

        if (!hasCheckedOutOfPocketCost || !user || !user.id) {
            return (
                <PriceEstimationView
                    {...priceEstimationData}
                    {...priceEstimationAction}
                />
            );
        }

        return (
            <Query
                query={getUserQuery}
                variables={{
                    id: user.id,
                }}
            >
                {({ loading: userLoading, data: userData }) => (
                    <Query
                        client={pricingClient}
                        query={getBundleCoverage}
                        variables={queryVariables}
                        onCompleted={this.onGetBundleComplete}
                    >
                        {({
                            loading: getBundleCoverageLoading,
                            error: getBundleCoverageError,
                            data: getBundleCoverageData,
                            refetch,
                        }) => {
                            if (_isEmpty(getBundleCoverageData)) {
                                return (
                                    <PriceEstimationView
                                        isLoading={getBundleCoverageLoading}
                                        {...priceEstimationData}
                                        {...priceEstimationAction}
                                    />
                                );
                            }

                            if (getBundleCoverageError) {
                                return <div>error</div>;
                            }

                            const outOfPocketData = this.getOutOfPocketData({
                                getBundleCoverageData,
                                userData,
                            });

                            return (
                                <PriceEstimationView
                                    {...outOfPocketData}
                                    {...priceEstimationAction}
                                    isLoading={
                                        this.state.isRefetching ||
                                        getBundleCoverageLoading ||
                                        userLoading
                                    }
                                    onCheckOutOfPocketCost={() => {
                                        this.setState(
                                            { isRefetching: true },
                                            async () => {
                                                await refetch();
                                                this.setState({
                                                    isRefetching: false,
                                                });
                                            }
                                        );
                                    }}
                                />
                            );
                        }}
                    </Query>
                )}
            </Query>
        );
    }
}

PriceEstimation.propTypes = {
    acceptedInsurances: PropTypes.arrayOf(PropTypes.string),
    bundles: PropTypes.shape({
        dateCreated: PropTypes.string,
        description: PropTypes.string,
        group: PropTypes.string,
        id: PropTypes.string,
        insuranceList: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                price: PropTypes.number,
            })
        ),
        name: PropTypes.string,
        price: PropTypes.number,
        procedures: PropTypes.arrayOf(PropTypes.string),
        proceduresDetail: PropTypes.arrayOf(
            PropTypes.shape({
                category_1: PropTypes.string,
                code: PropTypes.string,
                group: PropTypes.string,
                name: PropTypes.string,
                price: PropTypes.number,
            })
        ),
        status: PropTypes.string,
    }),
};

export default PriceEstimation;
