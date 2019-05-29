import { Box, Button, Card, Flex, Grid, Icon, Input, Select, Text, Truncate } from '@laguro/basic-components';
import { Menu } from 'antd';
import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import PurposeOfVisitSelection from '.';
import Onboarding from '../../..';
import { WrapperProps } from '../../../../Wizard/types';
import AppointmentIcon from '../../../Assets/appointmentIcon';

interface Props {}

class PurposeOfVisitSelectionView extends React.PureComponent<WrapperProps> {
    public render() {
        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <AppointmentIcon />
                <Onboarding.StepTitleText text="What would you like to do today?" />
                <Onboarding.StepBlurbText text="Let us know what you want to do." />

                <Onboarding.Choices
                    formKey="purposeOfVisit"
                    namesAndTexts={[
                        { name: 'walkIn', text: 'Make an appointment (Walk-in)' },
                        { name: 'checkIn', text: 'I have an appointment (Check-in)' }
                    ]}
                    {...this.props}
                />
                <Onboarding.NextButton
                    onClick={() => {
                        this.props.formikProps.submitForm();
                    }}
                >
                    Next
                </Onboarding.NextButton>
            </Flex>
        );
    }
}

export default PurposeOfVisitSelectionView;
