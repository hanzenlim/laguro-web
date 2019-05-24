import React, { Component } from 'react';
import { Menu } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { getInsuranceText } from '../../../util/insuranceUtil';
import history from '../../../history';
import { getUser } from '../../../util/authUtils';
import emitter from '../../../util/emitter';
import {
    trackSelectProcedure,
    trackSelectInsurance,
} from '../../../util/trackingUtils';
import { trackCheckOutOfPocketAttempt } from '../../../util/trackingUtils';

import BundleView from './view';

const Item = Menu.Item;

class Bundle extends Component {
    state = {
        selectedProcedure: '',
        selectedIndex: null,
        selectedInsurance: null,
        price: null,
        insuranceList: [],
        isModalVisible: false,
    };

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

    setInitialInsurance = selectedInsurance => {
        this.setState({ selectedInsurance });

        if (trackSelectInsurance && !_isEmpty(selectedInsurance)) {
            trackSelectInsurance({
                eventLabel: getInsuranceText(selectedInsurance.name),
            });
        }
    };

    getProcedureList = () => {
        const { bundles, procedures } = this.props;

        const bundlesByDentist = bundles.filter(b =>
            procedures.includes(b.group)
        );

        return bundlesByDentist;
    };

    getProcedureGroupByName = name => {
        const { bundles } = this.props;
        const filteredBundle = bundles.filter(b => b.name === name);

        if (!_isEmpty(filteredBundle)) {
            return filteredBundle[0].group;
        }

        return null;
    };

    getIndexOfBundle = selectedProcedure => {
        const bundles = this.getProcedureList();

        const index = bundles.findIndex(
            bundle => bundle.name === selectedProcedure
        );

        return index;
    };

    onSelectBundle = ({ key }) => {
        const { selectedInsurance } = this.state;
        const currentBundle = this.getCurrentBundle(key);
        const selectedIndex = this.getIndexOfBundle(key);

        let insurance = null;
        if (
            selectedInsurance &&
            currentBundle &&
            currentBundle.insuranceList.length !== 0
        ) {
            insurance = currentBundle.insuranceList.filter(
                i => i.name === selectedInsurance.name
            )[0];
        }

        this.setState(() => ({
            selectedProcedure: key,
            selectedIndex,
            selectedInsurance: insurance,
            price: currentBundle.price,
            insuranceList: currentBundle.insuranceList,
            isModalVisible: false,
        }));

        if (trackSelectProcedure && !_isEmpty(currentBundle)) {
            trackSelectProcedure({
                eventLabel: `${currentBundle.group} - ${currentBundle.name}`,
            });
        }
    };

    onSelectInsurance = ({ key, domEvent }) => {
        domEvent.stopPropagation();

        this.setState({
            selectedInsurance: this.state.insuranceList.filter(
                item => item.name === key
            )[0],
        });

        if (trackSelectInsurance && !_isEmpty(key)) {
            trackSelectInsurance({
                eventLabel: getInsuranceText(key),
            });
        }
    };

    getDentistUrl = () => {
        const { dentistId } = this.props;

        return `/dentist/${dentistId}?scrollTo=priceEstimation`;
    };

    onLearnMore = e => {
        const dentistUrl = this.getDentistUrl();

        if (dentistUrl) {
            history.push(dentistUrl);
        }

        e.stopPropagation();
    };

    onCheckOutOfPocket = e => {
        e.stopPropagation();

        if (trackCheckOutOfPocketAttempt) {
            trackCheckOutOfPocketAttempt({
                internalPage: 'search',
            });
        }

        const user = getUser();
        const dentistUrl = this.getDentistUrl();

        if (user) {
            history.push(dentistUrl);
        } else {
            emitter.emit('loginModal', {
                redirectPath: dentistUrl,
            });
        }
    };

    handleToggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        const { dentistId } = this.props;
        const {
            selectedProcedure,
            selectedIndex,
            selectedInsurance,
            insuranceList,
        } = this.state;

        const insuranceMenu = (
            <Menu onClick={this.onSelectInsurance}>
                {insuranceList.map(item => (
                    <Item key={item.name}>{getInsuranceText(item.name)}</Item>
                ))}
            </Menu>
        );

        const isNullSelectedIndex = selectedIndex === null;

        return (
            <BundleView
                isModalVisible={this.state.isModalVisible}
                isProceduresListShown={this.state.isProceduresListShown}
                procedureList={this.getProcedureList()}
                onLearnMore={this.onLearnMore}
                onCheckOutOfPocket={this.onCheckOutOfPocket}
                isNullSelectedIndex={isNullSelectedIndex}
                selectedIndex={selectedIndex}
                selectedProcedure={selectedProcedure}
                selectedProcedureGroup={this.getProcedureGroupByName(
                    selectedProcedure
                )}
                onSelectBundle={this.onSelectBundle}
                onToggleModal={this.handleToggleModal}
                selectedInsurance={selectedInsurance}
                insuranceMenu={insuranceMenu}
                price={this.state.price}
                insurance={insuranceList}
                setInitialInsurance={this.setInitialInsurance}
                dentistId={dentistId}
            />
        );
    }
}

export default Bundle;
