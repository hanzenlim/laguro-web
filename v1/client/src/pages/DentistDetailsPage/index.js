import React, { PureComponent } from 'react';
import DentistDetailsPageView from './view';

class DentistDeatilsPageContainer extends PureComponent {
    render() {
        const { id } = this.props.match.params;

        return <DentistDetailsPageView dentistId={id} />;
    }
}

export default DentistDeatilsPageContainer;
