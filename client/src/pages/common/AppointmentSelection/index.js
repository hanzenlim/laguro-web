import * as React from 'react';
import AppointmentSelectionView from './view';

class AppointmentSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { moreMap: {} };
    }

    handleOnMore = dentistId => {
        this.setState({
            moreMap: { ...this.state.moreMap, [dentistId]: true },
        });
    };

    render() {
        return (
            <AppointmentSelectionView
                {...this.props}
                onMore={this.handleOnMore}
                moreMap={this.state.moreMap}
            />
        );
    }
}

export { AppointmentSelection };
