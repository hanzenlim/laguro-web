import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    reduxForm,
    FieldArray,
    Field,
    change,
    formValueSelector
} from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import * as actions from '../actions';
import UserReservation from './UserReservation';
import { addTooltip, renderCheckbox } from './forms/sharedComponents';
import { Modal, Typography, Box, Flex, Button } from './common';
import { renderPrice } from '../util/paymentUtil';

class UserReservationIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipmentModal: false,
            redirectToPayment: false,
            office: {},
            reservation: {}
        };

        this.handleAddEquipment = this.handleAddEquipment.bind(this);
        this.cancelUserReservation = this.cancelUserReservation.bind(this);
    }

    async cancelUserReservation(reservationToCancel) {
        const { dentist } = this.props;
        // if owner rented his own office, remove reservation from nested office/listing/reservation table
        if (reservationToCancel.hostId === reservationToCancel.reservedBy.id) {
            // find the office this reservation is for
            let office = dentist.offices.find(
                office => office.id === reservationToCancel.office.id
            );
            // find the listing that the reservation belongs to
            let listing = office.listings.find(
                listing => listing.id === reservationToCancel.listingId
            );
            // remove reservation from that listing
            listing.reservations = listing.reservations.filter(
                reservation => reservation.id !== reservationToCancel.id
            );
        }
        // also remove reservation from dentist's list of reservations
        dentist.reservations = dentist.reservations.filter(
            res => res.id !== reservationToCancel.id
        );
        await this.props.cancelReservation(reservationToCancel.id);
        this.props.updateDentist(dentist);
    }

    handleAddEquipment(office, reservation) {
        this.setState({ office, reservation });
        let equipList = office.equipment.filter(
            equip => !reservation.equipmentSelected.includes(equip.name)
        );
        this.props.dispatch(change('addEquipment', 'equipment', equipList));
        this.toggleEquipmentModal();
    }

    toggleEquipmentModal = () => {
        this.setState({ equipmentModal: !this.state.equipmentModal });
    }

    renderEquipmentSelector = ({ fields, className }) => {
        const equipData = this.props.equipment;
        return (
            <ul className={className}>
                <label>
                    {'Equipment Needed'}
                    {addTooltip(
                        'Select the equipment you anticipate needing for your reservation.'
                    )}
                </label>
                {fields.map((equipment, index) => (
                    <Box my={2} key={`equip${index}`}>
                        <Field
                            name={`${equipment}.needed`}
                            label={`${equipData[index].name} - ${renderPrice(
                                equipData[index].price
                            )}`}
                            component={renderCheckbox}
                        />
                    </Box>
                ))}
            </ul>
        );
    };

    calcEquipFee() {
        const { equipment } = this.props;
        if (!equipment || equipment.length === 0) {
            return 0;
        }
        const equipmentFee = equipment
            .filter(equip => equip.needed)
            .map(equip => equip.price)
            .reduce((acc, sub) => sub + acc, 0);

        return equipmentFee;
    }

    initiatePayment = () => {
        this.setState({ redirectToPayment: true });
    }

    render() {
        const { reservations } = this.props.dentist;
        const { equipment, handleSubmit, submitting } = this.props;

        if (!reservations || reservations.length === 0) {
            return (
                <div>
                    <h6>
                        {'No reservations yet - '}
                        <Link
                            className="blue-text text-darken-2"
                            to={'/office/search'}
                        >
                            search for new listings and make a reservation
                        </Link>
                    </h6>
                </div>
            );
        }

        let UserReservations = reservations.map(reservation => (
            <UserReservation
                key={reservation.id}
                reservation={reservation}
                cancelUserReservation={this.cancelUserReservation}
                handleAddEquipment={this.handleAddEquipment}
            />
        ));

        if (this.state.redirectToPayment) {
            const { reservation } = this.state;
            let { equipment } = this.props;

            equipment = JSON.stringify(
                equipment.filter(equip => equip.needed).map(equip => equip.name)
            );

            const urlParams = {};
            urlParams.type = 'equipment';
            urlParams.equipment = equipment;
            urlParams.equipmentFee = this.calcEquipFee();
            urlParams.totalPaid = urlParams.equipmentFee;
            urlParams.reservationId = reservation.id;

            return (
                <Redirect
                    push
                    to={{
                        pathname: '/payment',
                        search: `?${queryString.stringify(urlParams)}`
                    }}
                />
            );
        }

        return (
            <div>
                {UserReservations}
                <Modal
                    closable={true}
                    open={this.state.equipmentModal}
                    closeModal={this.toggleEquipmentModal}
                >
                    <Typography fontSize={5}>
                        Add additional equipment
                    </Typography>
                    <form onSubmit={handleSubmit(this.initiatePayment)}>
                        <FieldArray
                            className="col s12"
                            name="equipment"
                            component={this.renderEquipmentSelector}
                        />
                        <Flex justifyContent="space-between">
                            <Box>
                                <label>Additional Equipment Fee</label>
                                <h6>{renderPrice(this.calcEquipFee())}</h6>
                            </Box>
                            <Box>
                                <Button
                                    color="primary"
                                    type="submit"
                                    disabled={
                                        submitting || !equipment ||
                                        equipment.filter(e => e.needed)
                                            .length === 0
                                    }
                                >
                                    Add Equipment
                                </Button>
                            </Box>
                        </Flex>
                    </form>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const selector = formValueSelector('addEquipment');
    return {
        dentist: state.dentists.selectedDentist,
        equipment: selector(state, 'equipment')
    };
}

export default reduxForm({
    form: 'addEquipment'
})(connect(mapStateToProps, actions)(UserReservationIndex));
