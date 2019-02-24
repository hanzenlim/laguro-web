import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { compose, withApollo } from 'react-apollo';
import SelectAppointmentView from './view';
import { getUser } from '../../../util/authUtils';

class SelectAppointmentContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selected: {},
        };
    }

    handleSelect = event => {
        const user = getUser();
        // Show login modal if not logged in.
        if (!user) {
            const { client } = this.props;
            if (client) {
                client.writeData({
                    data: { visibleModal: 'login' },
                });

                return null;
            }
        }

        const { key } = event.currentTarget.dataset;
        const selected = get(this, `props.appointments[${key}]`);

        this.setState({ selected });

        if (this.props.onSelect) {
            this.props.onSelect(selected);
        }

        return null;
    };

    render() {
        const { appointments, selected } = this.props;

        return (
            <SelectAppointmentView
                appointments={appointments}
                onSelect={this.handleSelect}
                selected={isEmpty(selected) ? this.state.selected : selected}
            />
        );
    }
}

SelectAppointmentContainer.propTypes = {
    appointments: PropTypes.array,
    onSelect: PropTypes.func,
    selected: PropTypes.string,
};

export default compose(withApollo)(SelectAppointmentContainer);
