import * as React from 'react';
import KioskTermsView from './view';

class KioskTerms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitting: false,
        };
    }

    render() {
        return (
            <KioskTermsView
                isSubmitting={this.state.isSubmitting}
                {...this.props}
            />
        );
    }
}

export { KioskTerms };
