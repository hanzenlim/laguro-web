/**
 * @class MiniCalendar
 */
import * as React from 'react';
import DentistInsuranceView from './view';

class DentistInsurance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <DentistInsuranceView {...this.props} />;
    }
}

export { DentistInsurance };
