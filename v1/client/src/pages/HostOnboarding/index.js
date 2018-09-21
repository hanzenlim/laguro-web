import React, { Component } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { get } from 'lodash';
import history from '../../history';
import { Container, Steps, Form, Grid } from '../../components';
import AddOfficeInfo from '../common/Forms/AddOfficeInfo';
import AddOfficeEquipments from '../common/Forms/AddOfficeEquipments';
import AddOfficeListing from '../common/Forms/AddOfficeListing';

const { GridItem } = Grid;

const OFFICE_STEP = 'add-office';
const EQUIPMENT_STEP = 'add-equipments';
const LISTING_STEP = 'add-listing';
const CONFIRMATION_STEP = 'listing-confirmation';

const stepList = [OFFICE_STEP, EQUIPMENT_STEP, LISTING_STEP, CONFIRMATION_STEP];
const DEFAULT_STEP_COUNT = 0;

const StyledContainer = styled(Container)`
    min-height: 100vh;
`;

const { BackButton, SubmitButton } = Form;

class HostOnboarding extends Component {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);
        const { imageUrls, location } = this.urlParams;

        this.state = {
            submitDisabled: false,
            location,
            imageUrls: imageUrls ? JSON.parse(imageUrls) : [],
        };
    }

    // isExistingOffice is true if officeId defined (when adding new listing)
    isExistingOffice() {
        this.urlParams = queryString.parse(history.location.search);
        const { officeId } = this.urlParams;

        return officeId !== undefined;
    }

    disableSubmit = () => {
        this.setState({ submitDisabled: true });
    };

    onSubmit = values => {
        const { step } = this.props.match.params;

        // do not need location in text
        const { locationInText, ...restOfValues } = values;
        const { imageUrls, location } = get(this, 'addOfficeInfo.state');
        console.log(this.addOfficeInfo.state);
        const params = queryString.stringify({
            ...this.urlParams,
            ...restOfValues,
            imageUrls: JSON.stringify(imageUrls),
            location,
        });

        const nextStep = stepList[stepList.indexOf(step) + 1];

        history.push(`/host-onboarding/${nextStep}?${params}`);
    };

    render() {
        const { submitDisabled } = this.state;
        const { step } = this.props.match.params;

        let stepCount;
        switch (step) {
            case OFFICE_STEP:
                stepCount = stepList.indexOf(OFFICE_STEP);
                break;
            case EQUIPMENT_STEP:
                stepCount = stepList.indexOf(EQUIPMENT_STEP);
                break;
            case LISTING_STEP:
                stepCount = stepList.indexOf(LISTING_STEP);
                break;
            case CONFIRMATION_STEP:
                stepCount = stepList.indexOf(CONFIRMATION_STEP);
                break;
            default:
                stepCount = DEFAULT_STEP_COUNT;
        }

        return (
            <StyledContainer>
                <Form onSuccess={this.onSubmit}>
                    <Grid
                        gtc="188px 624px 188px"
                        gtr="auto 60px"
                        gcg="140px"
                        grg="304px"
                    >
                        <Steps
                            mt={210}
                            mb={46}
                            current={stepCount}
                            direction="vertical"
                            size={4}
                        />
                        {step === OFFICE_STEP && (
                            <AddOfficeInfo
                                ref={value => {
                                    this.addOfficeInfo = value;
                                }}
                            />
                        )}
                        {step === EQUIPMENT_STEP && <AddOfficeEquipments />}
                        {step === LISTING_STEP && <AddOfficeListing />}
                        <GridItem gc="1 / 2">
                            <BackButton
                                type="primary"
                                ghost
                                width={188}
                                height={60}
                                buttonText="Previous"
                            />
                        </GridItem>

                        <GridItem gc="3 / 4">
                            <SubmitButton
                                disabled={submitDisabled}
                                position="absolute"
                                width={188}
                                height={60}
                                buttonText="Next"
                            />
                        </GridItem>
                    </Grid>
                </Form>
            </StyledContainer>
        );
    }
}

export default HostOnboarding;
