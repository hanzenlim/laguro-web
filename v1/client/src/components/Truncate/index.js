import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTruncate from 'react-truncate';

class Truncate extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    render() {
        if (this.state.open) return this.props.children;

        return (
            <ReactTruncate
                lines={this.props.lines}
                ellipsis={
                    this.props.toggle ? (
                        <span onClick={() => this.setState({ open: true })}>
                            …{this.props.toggle}
                        </span>
                    ) : (
                        '…'
                    )
                }
            >
                {this.props.children}
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
