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
        price: null,
        insuranceList: [],
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

    onSelectBundle = ({ key, item, domEvent }) => {
        domEvent.stopPropagation();

        const { selectedInsurance } = this.state;
        const currentBundle = this.getCurrentBundle(key);

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
            selectedIndex: item.props.index,
            selectedInsurance: insurance,
            price: currentBundle.price,
            insuranceList: currentBundle.insuranceList,
        }));
    };

    onSelectInsurance = ({ key, domEvent }) => {
        domEvent.stopPropagation();

        this.setState({
            selectedInsurance: this.state.insuranceList.filter(
                item => item.name === key
            )[0],
        });
    };

    render() {
        const { dentistId } = this.props;
        const {
            selectedProcedure,
            selectedIndex,
            selectedInsurance,
            insuranceList,
        } = this.state;

        const menu = (
            <Menu onClick={this.onSelectBundle}>
                {this.getProcedureList().map(procedure => (
                    <Item key={procedure.name}>{procedure.name}</Item>
                ))}
            </Menu>
        );

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
                menu={menu}
                isNullSelectedIndex={isNullSelectedIndex}
                selectedIndex={selectedIndex}
                selectedProcedure={selectedProcedure}
                selectedProcedureGroup={this.getProcedureGroupByName(
                    selectedProcedure
                )}
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
