/**
 * @class MiniCalendar
 */
import * as React from 'react';
import { Theme } from '@laguro/basic-components';
import PersonaSelectionView from './view';
import * as styledComponents from 'styled-components';
import { WrapperProps } from '../../../Wizard/types';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

interface IThemeInterface {}

export interface Props {}

interface State {}

class PersonaSelection extends React.Component<WrapperProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ThemeProvider theme={Theme}>
                <PersonaSelectionView {...this.props} />
            </ThemeProvider>
        );
    }
}

export default PersonaSelection;