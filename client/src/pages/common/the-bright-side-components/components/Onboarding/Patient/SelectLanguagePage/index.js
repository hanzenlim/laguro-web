import * as React from 'react';
import SelectLanguagePageView from './view';

class SelectLanguagePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return <SelectLanguagePageView {...this.props} />;
    }
}

export default SelectLanguagePage;
