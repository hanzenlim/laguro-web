import * as React from 'react';
import KioskInsuranceView from './view';

class KioskInsurance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <KioskInsuranceView {...this.props} />;
    }

    static defaultProps = {
        onSkip: () => {},
    };
}

KioskInsurance['HAS_NO_INSURANCE'] = KioskInsuranceView['HAS_NO_INSURANCE'];

export { KioskInsurance };
