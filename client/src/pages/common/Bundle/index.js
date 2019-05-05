import React, { Component } from 'react';
import { Menu } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import { getInsuranceText } from '../../../util/insuranceUtil';

import BundleView from './view';

const Item = Menu.Item;

class Bundle extends Component {
    state = {
        selectedProcedure: '',
        selectedIndex: null,
        selectedInsurance: null,
    };

    getCurrentBundle = () => {
        const { bundles } = this.props;

        if (!_isEmpty(bundles)) {
            const filteredBundleElement = bundles.filter(
                item =>
                    item.group.toLowerCase() ===
                    this.state.selectedProcedure.toLowerCase()
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
    };

    render() {
        const { procedures = [], dentistId } = this.props;
        const {
            selectedProcedure,
            selectedIndex,
            selectedInsurance,
        } = this.state;

        let basePrice = null;
        let insuranceList = [];

        const currentBundle = this.getCurrentBundle();

        if (!_isEmpty(currentBundle)) {
            basePrice = currentBundle.price;
            insuranceList = currentBundle.insuranceList;
        }

        const menu = (
            <Menu
                onClick={({ key, item, domEvent }) => {
                    domEvent.stopPropagation();
                    this.setState({
                        selectedProcedure: key,
                        selectedIndex: item.props.index,
                        selectedInsurance: null,
                    });
                }}
            >
                {procedures.map(procedure => (
                    <Item key={procedure}>{procedure}</Item>
                ))}
            </Menu>
        );

        const insuranceMenu = (
            <Menu
                onClick={({ key, domEvent }) => {
                    domEvent.stopPropagation();

                    this.setState({
                        selectedInsurance: insuranceList.filter(
                            item => item.name === key
                        )[0],
                    });
                }}
            >
                {insuranceList.map(item => (
                    <Item key={item.name}>{getInsuranceText(item.name)}</Item>
                ))}
            </Menu>
        );

        const isNullSelectedIndex = selectedIndex === null;

        return (
            <BundleView
                menu={menu}
                isNullSelectedIndex={isNullSelectedIndex}
                selectedIndex={selectedIndex}
                selectedProcedure={selectedProcedure}
                selectedInsurance={selectedInsurance}
                insuranceMenu={insuranceMenu}
                price={basePrice}
                insurance={insuranceList}
                setInitialInsurance={this.setInitialInsurance}
                dentistId={dentistId}
            />
        );
    }
}

export default Bundle;
