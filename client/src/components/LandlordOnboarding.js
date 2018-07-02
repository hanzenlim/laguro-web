import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AddOfficeInfo from './forms/AddOfficeInfo';
import AddOfficeEquipments from './forms/AddOfficeEquipments';
import AddOfficeListing from './forms/AddOfficeListing';
import { ProgressBar, Modal } from './common';
import CreateProfile from './forms/CreateProfile';
import dentistProfileExists from '../util/userInfo';

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
        this.state = {isModalOpen: true}
    }

    closeCreateProfileModal = () => {
        this.setState({
            isModalOpen: false
        });
    }

    renderCreateProfileModal = () => {
        const { auth } = this.props;
        if (!dentistProfileExists(auth)) {
            return (<Modal
                closable={false}
                open={this.state.isModalOpen}
                onClose={this.closeCreateProfileModal}
                disableBackdropClick
                disableEscapeKeyDown
                fade={2}
            >
                <CreateProfile message={'Before renting your office, we need you to create a dentist profile. '}/>
            </Modal>);
        }
        return '';
    }

    render() {
        const { pathname } = this.props.location;

        const pathIndex = pathname.indexOf('/', 1);
        let step = '';
        if (pathIndex && pathIndex < pathname.length - 1) {
            step = pathname.substring(pathIndex + 1);
        }

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
                <ProgressBar percent={percent} />
                {step === OFFICE_STEP && <AddOfficeInfo />}
                {step === EQUIPMENT_STEP && <AddOfficeEquipments />}
                {step === LISTING_STEP && <AddOfficeListing />}
            </StyledContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(
    mapStateToProps,
    null
)(LandlordOnboarding);
