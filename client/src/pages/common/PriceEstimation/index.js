import React, { PureComponent } from 'react';
import { message } from 'antd';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { Query } from 'react-apollo';
import { getBundleCoverage, getUserQuery } from './queries';
import { pricingClient } from '../../../util/apolloClients';
import { renderPriceWithoutZeros } from '../../../util/paymentUtil';
import moment from 'moment';
import history from '../../../history';
import { getUser } from '../../../util/authUtils';
import emitter from '../../../util/emitter';
import { PATIENT_DASHBOARD_PAGE_URL_BASE } from '../../../util/urls';

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

    handleSelectProcedure = procedureIndex => {
        const { bundles } = this.props;
        const selectedProcedure = bundles[procedureIndex];

        this.setState({ selectedProcedure, procedureIndex });
    };

    handleCheckOutOfPocketCost = () => {
        const user = getUser();
        const dentistId = history.location.pathname.split('/')[2];

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

    getPriceEstimtationData = () => ({
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
        insurancePrice: this.state.selectedInsurance
            ? renderPriceWithoutZeros(
                  this.props.bundles[
                      this.state.procedureIndex
                  ].insuranceList.filter(
                      i => i.name === this.state.selectedInsurance
                  )[0].price
              )
            : this.props.bundles[this.state.procedureIndex].price,
    });

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
                id: _get(selectedProcedure, 'id'),
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

export default PriceEstimation;
