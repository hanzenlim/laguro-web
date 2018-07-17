import React, { Component, Fragment } from 'react';
import { Box, Typography } from '../common';
import Autocomplete from './Autocomplete';

class ReduxAutocomplete extends Component {
    constructor() {
        super();
        this.state = {
            autocompleted: false,
            completedLocation: '',
            hasBeenAutocompleted: false
        };
    }

    handleAutocomplete = location => {
        this.setState({
            autocompleted: true,
            completedLocation: location,
            hasBeenAutocompleted: true
        });
    };

    handleChange = () => {
        this.setState({ autocompleted: false });
    };

    render() {
        const { tooltip } = this.props;
        const { value, onChange, onBlur } = this.props.input;
        const { touched, error } = this.props.meta;
        const {
            autocompleted,
            completedLocation,
            hasBeenAutocompleted
        } = this.state;
        return (
            <Fragment>
                <Autocomplete
                    tooltip={tooltip}
                    onAutocomplete={location => {
                        this.handleAutocomplete(location);
                        onChange(location);
                    }}
                    onChange={() => {
                        this.handleChange();
                        onChange('');
                    }}
                    onBlur={location => {
                        if (autocompleted && location === completedLocation) {
                            onBlur(location);
                        }
                    }}
                    location={value}
                />
                <Box pb={1} />
                {(touched || hasBeenAutocompleted) &&
                    error && <Typography color="red">{error}</Typography>}
            </Fragment>
        );
    }
}

export default ReduxAutocomplete;
