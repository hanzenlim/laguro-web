/**
 * @class MiniCalendar
 */
import * as React from 'react';
import { Theme } from '@laguro/basic-components';
import KioskInsuranceView from './view';
import * as styledComponents from 'styled-components';
import { WrapperProps } from '../../Wizard/types';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

interface IThemeInterface {}

export interface KioskInsuranceProps extends WrapperProps {
    onSkip(): () => any;
}

interface State {}

class KioskInsurance extends React.Component<KioskInsuranceProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ThemeProvider theme={Theme}>
                <KioskInsuranceView {...this.props} />
            </ThemeProvider>
        );
    }

    static defaultProps = {
        onSkip: () => {}
    };
}

KioskInsurance['HAS_NO_INSURANCE'] = KioskInsuranceView['HAS_NO_INSURANCE'];

export default KioskInsurance;
