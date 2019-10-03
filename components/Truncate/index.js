import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTruncate from 'react-truncate';

import Text from '../Text';
import Button from '../Button';

const ShowMore = () => (
    <Text
        is="a"
        color="text.green"
        fontWeight="bold"
        display="inline-block"
        cursor="pointer"
    >
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
        <Button
            type="ghost"
            height="auto"
            onClick={() => this.setState({ open: true })}
        >
            <Text is="span">
                …{this.props.toggle || (this.props.hasToggle && <ShowMore />)}
            </Text>
        </Button>
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

Truncate.defaultProps = {
    toggle: '',
};

Truncate.propTypes = {
    lines: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        .isRequired,
    toggle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default Truncate;
