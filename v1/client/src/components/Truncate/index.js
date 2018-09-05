import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTruncate from 'react-truncate';

import { Text } from '../../components';

const ShowMore = () => (
    <Text is="a" color="text.green" fontWeight="bold" display="inline-block">
        show more
    </Text>
);

class Truncate extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    renderToggle = () => (
        <span onClick={() => this.setState({ open: true })}>
            …{this.props.toggle || (this.props.hasToggle && <ShowMore />)}
        </span>
    );

    render() {
        if (this.state.open) return this.props.children;

        return (
            <ReactTruncate
                lines={this.props.lines}
                ellipsis={
                    this.props.toggle || this.props.hasToggle
                        ? this.renderToggle()
                        : '…'
                }
            >
                {this.props.children || ''}
            </ReactTruncate>
        );
    }
}

Truncate.propTypes = {
    lines: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired,
    toggle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default Truncate;
