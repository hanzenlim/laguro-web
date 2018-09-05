import React, { PureComponent } from 'react';

import ReviewModalView from './view';

class ReviewModal extends PureComponent {
    state = {
        rating: 0,
    };

    setRating = rating => this.setState({ rating });

    // TODO: Add mutation here
    onSuccess = () => {};

    render() {
        return (
            <ReviewModalView
                {...this.props}
                rating={this.state.rating}
                setRating={this.setRating}
                onSuccess={this.onSuccess}
            />
        );
    }
}

export default ReviewModal;
