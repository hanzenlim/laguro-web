import React, { PureComponent } from 'react';
import CounterView from './view';

class CounterContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
        };
    }

    handleAddClick = () => {
        this.setState({
            count: this.state.count + 1,
        });
    };

    handleMinusClick = () => {
        if (this.state.count !== 0) {
            this.setState({
                count: this.state.count - 1,
            });
        }
    };

    render() {
        return (
            <CounterView
                onAddClick={this.handleAddClick}
                onMinusClick={this.handleMinusClick}
                count={this.state.count}
            />
        );
    }
}

export default CounterContainer;
