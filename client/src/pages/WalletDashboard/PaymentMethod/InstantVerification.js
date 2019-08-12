import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import _get from 'lodash/get';

import { Box, Loading, Button } from '../../../components';
import { GET_DWOLLA_IAV_TOKEN } from '../queries';
import { getUser } from '../../../util/authUtils';
import { walletClient } from '../../../util/apolloClients';
import { PaymentMethodContext } from './PaymentMethodModal';

// Separated Wrapper component and main component to avoid rerendering the dwolla iframe when apollo hoc is updating props.
// This will enable componentDidMount/useEffect functions to work only once the main component mounts.

const InstantVerificationWrapper = ({ data }) => {
    if (data.loading) return <Loading />;

    const token = _get(data, 'getDwollaIavToken', '');

    return <InstantVerification token={token} />;
};

const InstantVerification = ({ token }) => {
    const [currentDwollaPage, setCurrentDwollaPage] = useState(null);
    const { onClose } = useContext(PaymentMethodContext);

    useEffect(() => {
        const { dwolla } = window;
        dwolla.configure(
            process.env.REACT_APP_ENV === 'production' ? 'prod' : 'sandbox'
        );
        dwolla.iav.start(
            token,
            {
                container: 'iavContainer',
                stylesheets: [
                    'https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext',
                ],
                microDeposits: false,
                fallbackToMicroDeposits: true,
                backButton: true,
                subscriber: ({ currentPage, error }) => {
                    setCurrentDwollaPage(currentPage);
                    // eslint-disable-next-line
                    console.log(
                        'currentPage:',
                        currentPage,
                        'error:',
                        JSON.stringify(error)
                    );
                },
            },
            (err, res) => {
                // eslint-disable-next-line
                console.log(
                    `Error: ${JSON.stringify(
                        err
                    )} -- Response: ${JSON.stringify(res)}`
                );
            }
        );
    }, [token]);

    return (
        <Box>
            {!currentDwollaPage && <Loading />}
            <Box id="iavContainer" />
            {currentDwollaPage === 'SuccessIAV' && (
                <Button width="100%" fontSize={2} onClick={onClose}>
                    Done
                </Button>
            )}
        </Box>
    );
};

InstantVerificationWrapper.propTypes = {
    data: PropTypes.shape({
        getDwollaIavToken: PropTypes.string,
        loading: PropTypes.bool,
    }).isRequired,
};

InstantVerification.propTypes = { token: PropTypes.string.isRequired };

export default graphql(GET_DWOLLA_IAV_TOKEN, {
    options: () => {
        const { id } = getUser();
        return {
            variables: { input: { userId: id } },
            client: walletClient,
            fetchPolicy: 'network-only',
        };
    },
})(InstantVerificationWrapper);
