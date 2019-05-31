import * as React from 'react';
import _uniqBy from 'lodash/uniqBy';
import OfficeFilterView from './view';
import { getOfficeToColorMap } from '../util';

class OfficeFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedList: props.defaultValue || [],
            checkAll: true,
        };
    }

    onChange = checkedList => {
        this.setState({
            checkAll: checkedList.length === this.offices.length,
            checkedList,
        });

        this.props.onChange(checkedList);
    };

    onCheckAllChange = e => {
        const checkedList = e.target.checked ? this.offices.map(o => o.id) : [];
        this.setState({
            checkedList,
            checkAll: e.target.checked,
        });

        this.props.onChange(checkedList);
    };

    render() {
        const offices = this.props.reservations.map(r => r.office);
        const uniqueOffices = _uniqBy(offices, 'id');
        this.offices = uniqueOffices;
        const colorMap = getOfficeToColorMap(uniqueOffices.map(o => o.id));

        return (
            <OfficeFilterView
                offices={this.offices}
                colorMap={colorMap}
                onChange={this.onChange}
                checkAll={this.state.checkAll}
                checkedList={this.state.checkedList}
                onCheckAllChange={this.onCheckAllChange}
                reservations={this.props.reservations}
            />
        );
    }
}

export { OfficeFilter };
