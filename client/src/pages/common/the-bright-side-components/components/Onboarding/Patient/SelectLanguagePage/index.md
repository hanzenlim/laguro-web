/**
 * @class SelectLanguagePage
 */

import { Theme } from '@laguro/basic-components';
import * as React from 'react';
import * as styledComponents from 'styled-components';
import { WrapperProps } from '../../../Wizard/types';
import SelectLanguagePageView from './view';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<{}>;

class SelectLanguagePage extends React.Component<WrapperProps, {}> {
    constructor(props: any) {
        super(props);

        this.state = {};
    }

    public render() {
        return (
            <ThemeProvider theme={Theme}>
                <SelectLanguagePageView {...this.props} />
            </ThemeProvider>
        );
    }
}

export default SelectLanguagePage;
