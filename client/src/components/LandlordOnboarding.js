import React from 'react';
import styled from 'styled-components';

import AddOfficeInfo from './forms/AddOfficeInfo';
import AddOfficeEquipments from './forms/AddOfficeEquipments';
import AddOfficeListing from './forms/AddOfficeListing';

import { ProgressBar } from './common';

const OFFICE_STEP = 'add-office';
const EQUIPMENT_STEP = 'add-equipments';
const LISTING_STEP = 'add-listing';

const DEFAULT_PERCENTAGE = 0;
const OFFICE_PERCENTAGE = 30;
const EQUIPMENT_PERCENTAGE = 60;
const LISTING_PERCENTAGE = 90;

const StyledContainer = styled.div`
    min-height: 100vh;
`;

const LandlordOnboarding = props => {
    const { step } = props.match.params;

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
            <ProgressBar percent={percent} />
            {step === OFFICE_STEP && <AddOfficeInfo />}
            {step === EQUIPMENT_STEP && <AddOfficeEquipments />}
            {step === LISTING_STEP && <AddOfficeListing />}
        </StyledContainer>
    );
};

export default LandlordOnboarding;
