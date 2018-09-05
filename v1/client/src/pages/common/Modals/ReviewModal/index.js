import React, { PureComponent } from 'react';

import ReviewModalView from './view';

class ReviewModal extends PureComponent {
    state = {
        rating: 0,
    };

    setRating = rating => this.setState({ rating });

    onCancel = () => {
        this.setRating(0);
        this.props.toggleModalState();
    };

    // TODO: Add mutation here
    onSuccess = () => {
        this.setRating(0);
    };

    render() {
        return (
            <ReviewModalView
                {...this.props}
                rating={this.state.rating}
                setRating={this.setRating}
                onSuccess={this.onSuccess}
                onCancel={this.onCancel}
            />
        );
    }
}

export default ReviewModal;
