/**
 * @class AppointmentSelection
 */
import { Theme } from '@laguro/basic-components';
import * as React from 'react';
import * as styledComponents from 'styled-components';
import { WrapperProps } from '../../../../Wizard/types';
import AppointmentSelectionView from './view';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

interface IThemeInterface {}

export interface Props extends WrapperProps {
    dentistTimes: DentistTime[];
}

export interface DentistTime {
    id: string;
    startTime: string;
    name: string;
    rating: number;
    specialties: string[];
    specialty: string;
    imageUrl: string;
    languages: string[];
    insurance?: string[];
}

interface State {
    moreMap: {};
}

class AppointmentSelection extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { moreMap: {} };
    }

    public handleOnMore = dentistId => {
        this.setState({ moreMap: { ...this.state.moreMap, [dentistId]: true } });
    };

    public render() {
        return (
            <ThemeProvider theme={Theme}>
                <AppointmentSelectionView {...this.props} onMore={this.handleOnMore} moreMap={this.state.moreMap} />
            </ThemeProvider>
        );
    }
}

export default AppointmentSelection;
