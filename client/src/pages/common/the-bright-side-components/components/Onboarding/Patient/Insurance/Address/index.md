/**
 * @class MiniCalendar
 */
import * as React from 'react';
import { Theme } from '@laguro/basic-components';
import AddressView from './view';
import * as styledComponents from 'styled-components';
import { WrapperProps } from '../../../../Wizard/types';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

interface IThemeInterface {}

export interface Props {}

interface State {}

class Address extends React.Component<WrapperProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ThemeProvider theme={Theme}>
                <AddressView {...this.props} />
            </ThemeProvider>
        );
    }
}

export default Address;
