import React, { Component } from 'react';
import _groupBy from 'lodash/groupBy';
import SelectProcedureModalView from './view';

class SelectProcedureModal extends Component {
    constructor(props) {
        super(props);
        const { procedureList = [] } = props;
        this.procedureList = this.getGroupedProcedureList(procedureList);
    }

    getGroupedProcedureList = bundlesByDentist => {
        const groupedByProcedureGroup = _groupBy(bundlesByDentist, 'group');
        return groupedByProcedureGroup;
    };

    render() {
        const {
            isModalVisible = false,
            onToggleModal = () => {},
            onSelectBundle = () => {},
        } = this.props;

        return (
            <SelectProcedureModalView
                procedureList={this.procedureList}
                isModalVisible={isModalVisible}
                onToggleModal={onToggleModal}
                onSelectBundle={onSelectBundle}
            />
        );
    }
}

export default SelectProcedureModal;
