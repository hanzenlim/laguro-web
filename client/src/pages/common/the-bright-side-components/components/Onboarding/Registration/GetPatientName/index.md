/**
 * @class MiniCalendar
 */
import { Theme } from '@laguro/basic-components';
import * as React from 'react';
import * as styledComponents from 'styled-components';
import { WrapperProps } from '../../../Wizard/types';
import PersonaSelectionView from './view';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

interface IThemeInterface {}

export interface Props {}

interface State {}

class GetPatientName extends React.Component<WrapperProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <ThemeProvider theme={Theme}>
                <PersonaSelectionView {...this.props} />
            </ThemeProvider>
        );
    }
}

export default GetPatientName;
