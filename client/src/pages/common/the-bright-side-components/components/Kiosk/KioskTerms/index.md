import * as React from 'react';
import KioskTermsView from './view';

class KioskTerms extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitting: false
        };
    }

    public render() {
        return <KioskTermsView isSubmitting={this.state.isSubmitting} {...this.props} />;
    }
}

export default KioskTerms;
