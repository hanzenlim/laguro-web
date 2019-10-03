import * as React from 'react';
import ChooseLanguageView from './view';

class ChooseLanguage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <ChooseLanguageView {...this.props} />;
    }
}

export { ChooseLanguage };
