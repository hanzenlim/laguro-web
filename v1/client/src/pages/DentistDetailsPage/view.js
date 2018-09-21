import React from 'react';
import PropTypes from 'prop-types';

import { Container, Flex, Box, Sticky } from '../../components';

import FeaturedDentists from './FeaturedDentists';
import ReviewContainer from '../common/ReviewContainer';
import BookAppointment from '../common/BookAppointment';
import DentistDetails from '../common/DentistDetails';

import { DENTIST } from '../../util/strings';

const DentistDetailsPageView = props => {
    const { id } = props;

    return (
        <Container>
            <Flex>
                <Box mt={30} mr={34} width="100%">
                    <DentistDetails id={id} />
                    <ReviewContainer type={DENTIST} id={id} />
                </Box>
                <Sticky>
                    <Box
                        mt="44px"
                        width="100%"
                        border="1px solid"
                        borderColor="divider.gray"
                        boxShadow={0}
                        pt={16}
                        pr={32}
                        pl={32}
                        pb={32}
                    >
                        <BookAppointment id={id} />
                    </Box>
                </Sticky>
            </Flex>

            <FeaturedDentists />
        </Container>
    );
};

DentistDetailsPageView.propTypes = {
    dentistId: PropTypes.string.isRequired,
};

export default DentistDetailsPageView;
