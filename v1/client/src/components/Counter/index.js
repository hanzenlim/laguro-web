import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CounterView from './view';

class CounterContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            count: 1,
        };
    }

    componentDidMount() {
        this.props.onCounterCountHandler(this.state.count);
    }

    handleAddClick = () => {
        this.setState(
            {
                count: this.state.count + 1,
            },
            () => {
                this.props.onCounterCountHandler(this.state.count);
            }
        );
    };

    handleMinusClick = () => {
        if (this.state.count !== 0) {
            this.setState(
                {
                    count: this.state.count - 1,
                },
                () => {
                    this.props.onCounterCountHandler(this.state.count);
                }
            );
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

CounterContainer.defaultProps = {
    onCounterCountHandler: () => {},
};

CounterContainer.PropTypes = {
    onCounterCountHandler: PropTypes.func.isRequired,
};

export default CounterContainer;
