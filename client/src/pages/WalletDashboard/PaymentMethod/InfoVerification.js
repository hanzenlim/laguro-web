import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import _get from 'lodash/get';

import { Box, Text, Link, Button, Loading, Icon } from '../../../components';
import { GET_USER } from '../queries';
import { REGISTER_DWOLLA_CUSTOMER } from '../mutations';
import { getUser } from '../../../util/authUtils';
import { walletClient } from '../../../util/apolloClients';
import { execute } from '../../../util/gqlUtils';

const Composed = adopt({
    getUserQuery: ({ render }) => {
        const { id } = getUser();
        return (
            <Query query={GET_USER} variables={{ id }}>
                {render}
            </Query>
        );
    },
    registerDwollaCustomerMutation: ({ render }) => (
        <Mutation mutation={REGISTER_DWOLLA_CUSTOMER} client={walletClient}>
            {(mutate, { data, loading, error }) =>
                render({
                    mutate,
                    data,
                    loading,
                    error,
                })
            }
        </Mutation>
    ),
});

// Main Component

const InfoVerification = () => (
    <Composed>
        {({ getUserQuery, registerDwollaCustomerMutation }) => {
            if (getUserQuery.loading) return <Loading />;

            const {
                id = '',
                firstName = '',
                lastName = '',
                dob = '',
                email = '',
                address,
                dentist: { ssnOrEinOrTin = '' },
            } = _get(getUserQuery, 'data.getUser', {});

            const name =
                firstName && lastName ? `${firstName} ${lastName}` : '';

            const streetAddressString =
                address && address.streetAddress
                    ? `${address.streetAddress}, `
                    : '';
            const addressDetailsString =
                address && address.addressDetails
                    ? `${address.addressDetails} `
                    : '';
            const cityString =
                address && address.city ? `${address.city}, ` : '';
            const stateString =
                address && address.state ? `${address.state} ` : '';
            const zipCodeString =
                address && address.zipCode ? `${address.zipCode} ` : '';
            const completeAddress = `${streetAddressString}${addressDetailsString}${cityString}${stateString}${zipCodeString}`;
            const isDisabled = !name || !dob || !email || !completeAddress;

            return (
                <Box textAlign="center">
                    <Text fontSize={3} fontWeight="medium" mb={30}>
                        Verification
                    </Text>

                    <Text mb={20}>
                        Something is missing! Please see below and visit{' '}
                        <Link to="/dashboard/patient?selectedTab=account%20settings">
                            <Text is="span" color="text.blue">
                                My Profile
                            </Text>
                        </Link>{' '}
                        to add the information needed to proceed
                    </Text>

                    <Box
                        px={10}
                        pt={30}
                        pb={10}
                        borderRadius={6}
                        border="1px solid"
                        borderColor="divider.gray"
                        mb={16}
                    >
                        <InfoItem label="NAME" value={name} />
                        <InfoItem label="DATE OF BIRTH" value={dob} />
                        <InfoItem label="EMAIL ADDRESS" value={email} />
                        <InfoItem label="ADDRESS" value={completeAddress} />
                    </Box>

                    <Text fontSize={10} color="text.gray" mb={16}>
                        If you’d like to modify the information, please visit{' '}
                        <Link to="/dashboard/patient?selectedTab=account%20settings">
                            <Text is="span" color="text.blue">
                                My profile
                            </Text>
                        </Link>
                    </Text>

                    <Button
                        disabled={
                            registerDwollaCustomerMutation.loading || isDisabled
                        }
                        loading={registerDwollaCustomerMutation.loading}
                        onClick={async () => {
                            await execute({
                                action: async () => {
                                    await registerDwollaCustomerMutation.mutate(
                                        {
                                            variables: {
                                                input: {
                                                    userId: id,
                                                    firstName,
                                                    lastName,
                                                    email,
                                                    dateOfBirth: dob,
                                                    address1:
                                                        address.streetAddress,
                                                    city: address.city,
                                                    state: address.state,
                                                    postalCode: address.zipCode,
                                                    ssnLastFour: ssnOrEinOrTin.slice(
                                                        -4
                                                    ),
                                                },
                                            },
                                        }
                                    );
                                },
                            });
                        }}
                        type="ghost"
                        width="100%"
                        style={{
                            border: '1px solid #3481f8',
                            borderRadius: 25,
                            opacity: isDisabled ? 0.22 : 1,
                        }}
                    >
                        <Text color="text.blue" display="inline" px={8}>
                            Confirm and next
                        </Text>
                    </Button>
                </Box>
            );
        }}
    </Composed>
);

// This component displays each information details of the user

const InfoItem = ({ label, value }) => (
    <Box mb={20}>
        <Text color="#245197" fontSize={0} fontWeight="medium" mb={5}>
            {label}
        </Text>
        <Text
            fontSize={0}
            fontWeight="medium"
            mb={5}
            color={value ? 'text.black' : 'text.red'}
        >
            {value || (
                <Fragment>
                    <Icon type="info-circle" color="text.red" mr={6} />
                    Missing Information
                </Fragment>
            )}
        </Text>
    </Box>
);

InfoVerification.propTypes = {};
InfoItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default InfoVerification;
