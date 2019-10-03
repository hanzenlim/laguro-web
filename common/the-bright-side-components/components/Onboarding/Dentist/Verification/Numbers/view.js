import * as React from 'react';
import Onboarding from '../../..';
import InfoIcon from '../../../Assets/infoIcon';
import { Box, Flex } from '~/components';

class NumbersView extends React.PureComponent {
    render() {
        return (
            <Box width={['100%', '500px', '500px']} px="20px">
                <Flex justifyContent="center">
                    <InfoIcon />
                </Flex>
                <Onboarding.StepTitleText text="Dentist verification" />
                <Onboarding.StepBlurbText text="Please fill in the missing information to become a Laguro verified dentist" />

                <Onboarding.FormItemLabelText text="SSN or EIN/TIN number" />
                <Onboarding.Input
                    type="text"
                    name="ssn"
                    value={this.props.formikProps.values.ssn}
                    onChange={this.props.formikProps.handleChange}
                />
                <Onboarding.FormItemLabelText text="DEA registration number" />
                <Onboarding.Input
                    type="text"
                    name="deaNum"
                    value={this.props.formikProps.values.deaNum}
                    onChange={this.props.formikProps.handleChange}
                />
                <Onboarding.FormItemLabelText text="NPI number" />
                <Onboarding.Input
                    type="text"
                    name="npiNum"
                    value={this.props.formikProps.values.npiNum}
                    onChange={this.props.formikProps.handleChange}
                />
                <Onboarding.FormItemLabelText text="Dental license number" />
                <Onboarding.Input
                    type="text"
                    name="license"
                    value={this.props.formikProps.values.license}
                    onChange={this.props.formikProps.handleChange}
                />

                <Onboarding.NextButton
                    onClick={() => {
                        this.props.formikProps.submitForm();
                    }}
                >
                    Next
                </Onboarding.NextButton>

                {this.props.formikProps.submitCount !== 0 &&
                    Object.keys(this.props.formikProps.errors).length !== 0 && (
                        <Onboarding.RequiredFieldsMessage
                            text={Object.values(
                                this.props.formikProps.errors
                            )[0].toString()}
                        />
                    )}
                <Box mb={154} />
            </Box>
        );
    }
}

export default NumbersView;
