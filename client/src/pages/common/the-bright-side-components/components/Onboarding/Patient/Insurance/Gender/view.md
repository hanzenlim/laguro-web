import { Box, Button, Card, Flex, Grid, Icon, Input, Select, Text, Truncate } from '@laguro/basic-components';
import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import Gender from '.';
import Onboarding from '../../..';
import { WrapperProps } from '../../../../Wizard/types';
import InsuranceUmbrella from '../../../Assets/insuranceUmbrella';

interface Props {}

const StyledFlex = props => (
    <Flex
        width="100%"
        borderRadius=" 4px"
        boxShadow="0 2px 7px 0 rgba(207, 218, 235, 0.25)"
        height="100%"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        {...props}
    />
);

class GenderView extends React.PureComponent<WrapperProps> {
    public render() {
        return (
            <Box minWidth={500}>
                <Flex justifyContent="center">
                    <InsuranceUmbrella />
                </Flex>
                <Onboarding.StepTitleText text="What is your gender?" />
                <Onboarding.StepBlurbText />

                <Onboarding.Choices
                    formKey="patientGender"
                    namesAndTexts={[
                        { name: 'female', text: 'Female' },
                        { name: 'male', text: 'Male' },
                        { name: 'unknown', text: 'I do not wish to answer' }
                    ]}
                    {...this.props}
                />
                <Onboarding.NextButton
                    onClick={() => {
                        this.props.formikProps.submitForm();
                    }}
                    loading={this.props.formikProps.isSubmitting}
                >
                    Next
                </Onboarding.NextButton>
            </Box>
        );
    }
}

export default GenderView;
