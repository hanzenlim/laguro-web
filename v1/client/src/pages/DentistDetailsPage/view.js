import React from 'react';
import PropTypes from 'prop-types';

import { Container, Flex, Box, Text, Sticky } from '../../components';

import DentistDetails from '../common/DentistDetails';
import Payment from '../common/Payment';
import DentistCard from './DentistCard';
import ReviewContainer from '../common/ReviewContainer';
import { DENTIST } from '../../util/strings';

const DentistDetailsPageView = props => {
    const { dentistId } = props;

    return (
        <Container>
            <Flex>
                <Box mt={30} mr={34}>
                    <DentistDetails id={dentistId} />
                    <ReviewContainer type={DENTIST} id={dentistId} />
                </Box>
                <Sticky offset="20px">
                    <Payment />
                </Sticky>
            </Flex>

            <Box mt={40}>
                <Text fontSize={5}>similar dentists</Text>

                <Flex justifyContent="space-between" mt={30}>
                    <Box width="295px">
                        <DentistCard />
                    </Box>
                    <Box width="295px">
                        <DentistCard />
                    </Box>
                    <Box width="295px">
                        <DentistCard />
                    </Box>
                    <Box width="295px">
                        <DentistCard />
                    </Box>
                </Flex>
            </Box>
        </Container>
    );
};

DentistDetailsPageView.propTypes = {
    dentistId: PropTypes.string.isRequired,
};

export default DentistDetailsPageView;
