import { Box, Button, Card, Flex, Grid, Icon, Input, Select, Text, Truncate } from '@laguro/basic-components';
import { Menu } from 'antd';
import { Dropdown } from 'antd';
import moment from 'moment';
import * as React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import PersonaSelection from '.';
import Onboarding from '../..';
import AppleIcon from '../../Assets/appleIcon';

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

const FIRST_NAME_FORM_INPUT_NAME = 'firstName';
const MIDDLE_NAME_FORM_INPUT_NAME = 'middleName';
const LAST_NAME_FORM_INPUT_NAME = 'lastName';

class GetPatientNameView extends React.PureComponent<any> {
    public render() {
        return (
            <Box width={329}>
                <Flex justifyContent="center">
                    <AppleIcon />
                </Flex>
                <Onboarding.StepTitleText text="Step 1. What is your name?" />
                <Onboarding.StepBlurbText text="Please type in your full legal name" />

                <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="11px">
                    <Box>
                        <Onboarding.FormItemLabelText text="First Name" />
                        <Onboarding.Input
                            type="text"
                            name={FIRST_NAME_FORM_INPUT_NAME}
                            value={this.props.formikProps.values[FIRST_NAME_FORM_INPUT_NAME]}
                            onChange={e =>
                                this.props.formikProps.setFieldValue(FIRST_NAME_FORM_INPUT_NAME, e.target.value)
                            }
                        />
                    </Box>

                    <Box>
                        <Onboarding.FormItemLabelText text="Middle Name" />
                        <Onboarding.Input
                            type="text"
                            name={MIDDLE_NAME_FORM_INPUT_NAME}
                            value={this.props.formikProps.values[MIDDLE_NAME_FORM_INPUT_NAME]}
                            onChange={e =>
                                this.props.formikProps.setFieldValue(MIDDLE_NAME_FORM_INPUT_NAME, e.target.value)
                            }
                        />
                    </Box>
                </Grid>

                <Onboarding.FormItemLabelText text="Last Name" />
                <Onboarding.Input
                    type="text"
                    name={LAST_NAME_FORM_INPUT_NAME}
                    value={this.props.formikProps.values[LAST_NAME_FORM_INPUT_NAME]}
                    onChange={e => this.props.formikProps.setFieldValue(LAST_NAME_FORM_INPUT_NAME, e.target.value)}
                />

                <Onboarding.NextButton
                    onClick={async () => {
                        await this.props.formikProps.submitForm();
                        await this.props.onNext();
                    }}
                >
                    Next
                </Onboarding.NextButton>
                {this.props.formikProps.submitCount !== 0 &&
                    Object.keys(this.props.formikProps.errors).length !== 0 && <Onboarding.RequiredFieldsMessage />}
            </Box>
        );
    }
}

export default GetPatientNameView;
