/**
 * @class MiniCalendar
 */
import * as React from 'react';
import { Theme } from '@laguro/basic-components';
import _uniqBy from 'lodash/uniqBy';
import _isEmpty from 'lodash/isEmpty';
import OfficeFilterView from './view';
import { getOfficeToColorMap } from '../util';
import * as styledComponents from 'styled-components';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

interface IThemeInterface {}

export interface Props {
    onChange(officeIds: string[]): void;
    reservations: Reservation[];
    defaultValue: string[];
}

interface State {
    checkedList: string[];
    checkAll: boolean;
}

export interface Office {
    id: string;
    name: string;
}

interface LocalAvailableTime {
    startTime: string;
    endTime: string;
}

export interface Reservation {
    id: string;
    office: Office;
    localAvailableTimes: LocalAvailableTime[];
}

class MiniCalendar extends React.Component<Props, State> {
    offices: Office[];
    constructor(props) {
        super(props);
        this.state = {
            checkedList: props.defaultValue || [],
            checkAll: true
        };
    }

    onChange = checkedList => {
        this.setState({
            checkAll: checkedList.length === this.offices.length,
            checkedList
        });

        this.props.onChange(checkedList);
    };

    onCheckAllChange = e => {
        const checkedList = e.target.checked ? this.offices.map(o => o.id) : [];
        this.setState({
            checkedList,
            checkAll: e.target.checked
        });

        this.props.onChange(checkedList);
    };

    render() {
        const offices = this.props.reservations.map(r => r.office);
        const uniqueOffices = _uniqBy(offices, 'id');
        this.offices = uniqueOffices;
        const colorMap = getOfficeToColorMap(uniqueOffices.map(o => o.id));

        return (
            <ThemeProvider theme={Theme}>
                <OfficeFilterView
                    offices={this.offices}
                    colorMap={colorMap}
                    onChange={this.onChange}
                    checkAll={this.state.checkAll}
                    checkedList={this.state.checkedList}
                    onCheckAllChange={this.onCheckAllChange}
                    reservations={this.props.reservations}
                />
            </ThemeProvider>
        );
    }

    static defaultProps = {
        onChange: () => {}
    };
}

export default MiniCalendar;
