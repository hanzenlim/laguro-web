import React, { Component } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import history from '../../history';
import { Steps } from '../../components';
import AddOfficeInfo from '../common/Forms/AddOfficeInfo';
import AddOfficeEquipments from '../common/Forms/AddOfficeEquipments';
import AddOfficeListing from '../common/Forms/AddOfficeListing';
// import { Steps } from '../components/steps';
// import NewDentist from './forms/NewDentist';
// import dentistProfileExists from '../util/userInfo';
// import history from './history';

const OFFICE_STEP = 'add-office';
const EQUIPMENT_STEP = 'add-equipments';
const LISTING_STEP = 'add-listing';
const CONFIRMATION_STEP = 'listing-confirmation';

const DEFAULT_STEP_COUNT = 0;
const OFFICE_STEP_COUNT = 0;
const EQUIPMENT_STEP_COUNT = 1;
const LISTING_STEP_COUNT = 2;
const CONFIRMATION_STEP_COUNT = 3;

const StyledContainer = styled.div`
    min-height: 100vh;
`;

class HostOnboarding extends Component {
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

    render() {
        const { step } = this.props.match.params;

        let stepCount = DEFAULT_STEP_COUNT;
        switch (step) {
            case OFFICE_STEP:
                stepCount = OFFICE_STEP_COUNT;
                break;
            case EQUIPMENT_STEP:
                stepCount = EQUIPMENT_STEP_COUNT;
                break;
            case LISTING_STEP:
                stepCount = LISTING_STEP_COUNT;
                break;
            case CONFIRMATION_STEP:
                stepCount = CONFIRMATION_STEP_COUNT;
                break;
            default:
                stepCount = DEFAULT_STEP_COUNT;
        }

        const steps = (
            <Steps
                mt={210}
                mb={46}
                current={stepCount}
                direction="vertical"
                size={4}
            />
        );

        return (
            <StyledContainer>
                {step === OFFICE_STEP && <AddOfficeInfo steps={steps} />}
                {step === EQUIPMENT_STEP && (
                    <AddOfficeEquipments steps={steps} />
                )}
                {step === LISTING_STEP && <AddOfficeListing steps={steps} />}
            </StyledContainer>
        );
    }
}

export default HostOnboarding;
