import React, { Component, useContext } from 'react';
import { Menu } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { withRouter } from 'next/router';

import { getInsuranceText } from '~/util/insuranceUtil';
import { getUser } from '~/util/authUtils';
import {
    trackSelectProcedure,
    trackSelectInsurance,
    trackCheckOutOfPocketAttempt,
} from '~/util/trackingUtils';

import BundleView from './view';
import { LoginContext } from '../../appContext';

const { Item } = Menu;

class Bundle extends Component {
    state = {
        selectedProcedure: '',
        selectedIndex: null,
        selectedInsurance: null,
        price: null,
        insuranceList: [],
        isModalVisible: false,
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
            [insurance] = currentBundle.insuranceList.filter(
                i => i.name === selectedInsurance.name
            );
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

    onLearnMore = e => {
        const { router } = this.props;
        const dentistUrl = this.getDentistUrl();

        if (dentistUrl) {
            router.push(dentistUrl);
        }

        e.stopPropagation();
    };

    onCheckOutOfPocket = e => {
        e.stopPropagation();
        const { router } = this.props;

        if (trackCheckOutOfPocketAttempt) {
            trackCheckOutOfPocketAttempt({
                internalPage: 'search',
            });
        }

        const user = getUser();
        const dentistUrl = this.getDentistUrl();

        if (user) {
            router.push(dentistUrl);
        } else {
            const { openLoginModal } = this.props;
            openLoginModal();
        }
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

    getDentistUrl = () => {
        const { dentistId } = this.props;

        return `/dentist/${dentistId}?scrollTo=priceEstimation`;
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

const withLoginContext = WrappedComponent => props => {
    const { openLoginModal } = useContext(LoginContext);

    return <WrappedComponent {...props} openLoginModal={openLoginModal} />;
};

export default withLoginContext(withRouter(Bundle));
