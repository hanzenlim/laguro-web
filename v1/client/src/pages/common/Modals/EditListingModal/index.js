import React, { PureComponent } from 'react';

import EditListingModal from './view';

class EditListingContainer extends PureComponent {
    onCancel = () => {
        // do cancel logic here
        this.props.toggleModalState();
    };

    onSubmit = () => {
        // do submit logic here
        this.props.toggleModalState();
    };

    render() {
        return (
            <EditListingModal
                visible={this.props.visible}
                onCancel={this.onCancel}
                onSubmit={this.onSubmit}
            />
        );
    }
}

export default EditListingContainer;
