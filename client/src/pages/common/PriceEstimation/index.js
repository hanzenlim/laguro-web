import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { Query } from 'react-apollo';
import { getBundleCoverage, getUserQuery } from './queries';
import { pricingClient } from '../../../util/apolloClients';
import { renderPrice } from '../../../util/paymentUtil';
import moment from 'moment';
import history from '../../../history';
import { getUser } from '../../../util/authUtils';
import emitter from '../../../util/emitter';

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
        insurancePrice: renderPrice(
            _get(getBundleCoverageData, 'getBundleCoverage.insurancePrice')
        ),
        outOfPocket: renderPrice(
            _get(getBundleCoverageData, 'getBundleCoverage.outOfPocket')
        ),
        price: this.state.hasCheckedOutOfPocket
            ? renderPrice(
                  _get(getBundleCoverageData, 'getBundleCoverage.price')
              )
            : renderPrice(this.props.bundles[this.state.procedureIndex].price),
        group: _get(getBundleCoverageData, 'getBundleCoverage.group'),
        deductibleRemaining: renderPrice(
            _get(getBundleCoverageData, 'getBundleCoverage.deductibleRemaining')
        ),
        annualMaximumRemaining: renderPrice(
            _get(
                getBundleCoverageData,
                'getBundleCoverage.annualMaximumRemaining'
            )
        ),
        coverage: renderPrice(
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
        price: renderPrice(this.props.bundles[this.state.procedureIndex].price),
        insurancePrice: renderPrice(
            this.props.bundles[this.state.procedureIndex].price
        ),
    });

    getPriceEstimtationAction = () => ({
        onSelectProcedure: this.handleSelectProcedure,
        onCheckOutOfPocketCost: this.handleCheckOutOfPocketCost,
        onAddInsurance: this.handleAddInsurance,
    });

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
