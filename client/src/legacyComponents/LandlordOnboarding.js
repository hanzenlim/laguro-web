import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import queryString from 'query-string';
import AddOfficeInfo from './forms/AddOfficeInfo';
import AddOfficeEquipments from './forms/AddOfficeEquipments';
import AddOfficeListing from './forms/AddOfficeListing';
import { ProgressBar } from './common';
import NewDentist from './forms/NewDentist';
import dentistProfileExists from '../util/userInfo';
import history from '../history';

const OFFICE_STEP = 'add-office';
const EQUIPMENT_STEP = 'add-equipments';
const LISTING_STEP = 'add-listing';

const DEFAULT_PERCENTAGE = 0;
const OFFICE_PERCENTAGE = 25;
const EQUIPMENT_PERCENTAGE = 50;
const LISTING_PERCENTAGE = 75;

const StyledContainer = styled.div`
    min-height: 100vh;
`;

class LandlordOnboarding extends Component {
    constructor() {
        super();
        this.state = { isModalOpen: true };
    }

    // isExistingOffice is true if officeId defined (when adding new listing)
    isExistingOffice() {
        this.urlParams = queryString.parse(history.location.search);
        const { officeId } = this.urlParams;

        return officeId !== undefined;
    }

    closeCreateProfileModal = () => {
        this.setState({
            isModalOpen: false
        });
    };

    renderCreateProfileModal = () => {
        const { auth } = this.props;

        return (
            <NewDentist
                open={!dentistProfileExists(auth)}
                closable={false}
                closeModal={this.closeCreateProfileModal}
                onSuccess={this.closeCreateProfileModal}
                auth={auth}
                message={
                    'Before renting your office, we need you to create a dentist profile. '
                }
            />
        );
    };

    render() {
        let step = this.props.computedMatch.params.step;

        let percent = DEFAULT_PERCENTAGE;
        switch (step) {
        case OFFICE_STEP:
            percent = OFFICE_PERCENTAGE;
            break;
        case EQUIPMENT_STEP:
            percent = EQUIPMENT_PERCENTAGE;
            break;
        case LISTING_STEP:
            percent = LISTING_PERCENTAGE;
            break;
        default:
            percent = DEFAULT_PERCENTAGE;
        }

        return (
            <StyledContainer>
                {this.renderCreateProfileModal()}
                {!this.isExistingOffice() && <ProgressBar percent={percent} />}
                {step === OFFICE_STEP && <AddOfficeInfo />}
                {step === EQUIPMENT_STEP && <AddOfficeEquipments />}
                {step === LISTING_STEP && <AddOfficeListing />}
            </StyledContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export { LandlordOnboarding };
export default connect(mapStateToProps, null)(LandlordOnboarding);
