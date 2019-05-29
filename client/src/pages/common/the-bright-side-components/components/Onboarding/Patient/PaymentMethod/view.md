import * as React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { Dropdown } from 'antd';
import {
    StripeProvider,
    CardElement,
    Elements,
    injectStripe,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement,
    ReactStripeElements
} from 'react-stripe-elements';
import { Card, Button, Box, Truncate, Grid, Flex, Input, Text, Icon, Select } from '@laguro/basic-components';
import moment from 'moment';
import PaymentMethod from '.';
import { WrapperProps } from '../../../Wizard/types';
import { Menu } from 'antd';
import Onboarding from '../..';
import InfoIcon from '../../Assets/infoIcon';

interface Props {}

const style = {
    base: {
        fontSize: '16px',
        color: '#424770',
        lineHeight: '22px',
        letterSpacing: '0.025em',
        '::placeholder': {
            color: '#aab7c4'
        },
        padding: '16px'
    },
    invalid: {
        color: '#f5222d'
    }
};

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

import InjectedStripeProps = ReactStripeElements.InjectedStripeProps;

import ElementChangeResponse = ReactStripeElements.ElementChangeResponse;
import ElementsOptions = ReactStripeElements.ElementsOptions;
import ElementsCreateOptions = ReactStripeElements.ElementsCreateOptions;
import PatchedTokenResponse = ReactStripeElements.PatchedTokenResponse;
import HTMLStripeElement = ReactStripeElements.HTMLStripeElement;

const cardElementProps: ElementsOptions = {
    iconStyle: 'solid',
    style: {
        base: {
            color: '#32325d',
            lineHeight: '24px',
            fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#B71C1C',
            iconColor: '#B71C1C'
        }
    },
    hidePostalCode: true,
    classes: {
        base: 'field',
        complete: 'complete',
        empty: 'is-empty',
        focus: 'is-focused',
        invalid: 'is-invalid',
        webkitAutofill: 'webkit-autofill'
    },
    hideIcon: true
};

const fontElementsProps: ElementsCreateOptions = {
    fonts: [
        {
            cssSrc: 'https://fonts.googleapis.com/css?family=Dosis'
        },
        {
            family: 'Dosis, sanz',
            src: 'url(https://somewebsite.com/path/to/font.woff)',
            style: 'normal',
            weight: 'bold',
            unicodeRange: 'U+26'
        }
    ],
    locale: 'es'
};

class PaymentMethodView extends React.PureComponent<WrapperProps> {
    render() {
        return (
            <Box minWidth={500}>
                <Flex justifyContent="center">
                    <InfoIcon />
                </Flex>
                <Onboarding.StepTitleText text="Payment method?" />
                <Onboarding.StepBlurbText />

                <Onboarding.FormItemLabelText text="Card number" />

                <StripeProvider stripe={null}>
                    <Elements>
                        <CardElement
                            onChange={this.props.formikProps.handleChange}
                            style={style}
                            className="ant-input"
                        />
                    </Elements>
                </StripeProvider>

                <Onboarding.FormItemLabelText text="Name on card" />
                <Onboarding.Input
                    type="text"
                    name="patientCardName"
                    value={this.props.formikProps.values.patientCardName}
                    onChange={this.props.formikProps.handleChange}
                />
                <Onboarding.FormItemLabelText text="Postal code" />
                <Onboarding.Input
                    type="text"
                    name="patientCardZIP"
                    value={this.props.formikProps.values.patientCardZIP}
                    onChange={this.props.formikProps.handleChange}
                />
                <Onboarding.NextButton onClick={() => this.props.formikProps.submitForm()}>Next</Onboarding.NextButton>
            </Box>
        );
    }
}

export default PaymentMethodView;
