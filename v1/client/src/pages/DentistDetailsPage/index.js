import React, { PureComponent } from 'react';
import DentistDetailsPageView from './view';

class DentistDeatilsPageContainer extends PureComponent {
    render() {
        const { id } = this.props.match.params;

        return <DentistDetailsPageView id={id} />;
    }
}

export default DentistDeatilsPageContainer;
