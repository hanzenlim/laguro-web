import * as React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { Dropdown } from 'antd';
import { Card, Button, Box, Truncate, Grid, Flex, Input, Text, Icon, Select } from '@laguro/basic-components';
import moment from 'moment';
import PersonaSelection from '.';
import { WrapperProps } from '../../../Wizard/types';
import { Menu } from 'antd';
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

class PersonaSelectionView extends React.PureComponent<WrapperProps> {
    render() {
        return (
            <Box minWidth={500}>
                <Flex justifyContent="center">
                    <AppleIcon />
                </Flex>
                <Onboarding.StepTitleText text="Welcome!" />
                <Onboarding.StepBlurbText text="Who would you like to sign up as?" />

                <Onboarding.Choices
                    formKey="persona"
                    namesAndTexts={[
                        { name: 'patient', text: 'I am a patient' },
                        { name: 'dentist', text: 'I am a dentist' },
                        { name: 'host', text: 'I am a host' }
                    ]}
                    {...this.props}
                />
            </Box>
        );
    }
}

export default PersonaSelectionView;
