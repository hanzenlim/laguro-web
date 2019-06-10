import React, { Component } from 'react';

import BannerContentView from './view';

export default class BannerContent extends Component {
    state = {
        isQuizVisible: false,
        isQuizDone: true,
    };

    toggleQuizVisibility = () => {
        this.setState(({ isQuizVisible }) => ({
            isQuizVisible: !isQuizVisible,
        }));
    };

    setQuizDone = isQuizDone => this.setState({ isQuizDone });

    render() {
        const { isQuizVisible, isQuizDone } = this.state;
        return (
            <BannerContentView
                isQuizVisible={isQuizVisible}
                isQuizDone={isQuizDone}
                toggleQuizVisibility={this.toggleQuizVisibility}
                setQuizDone={this.setQuizDone}
            />
        );
    }
}
