import React from 'react';
import PropTypes from 'prop-types';

import { Container, Flex, Box, Sticky } from '../../components';

import FeaturedDentists from './FeaturedDentists';
import ReviewContainer from '../common/ReviewContainer';
import BookAppointment from '../common/BookAppointment';
import DentistDetails from '../common/DentistDetails';

import { DENTIST } from '../../util/strings';

const DentistDetailsPageView = props => {
    const { dentist, id } = props;

    return (
        <Container style={{ height: '100%' }}>
            <Flex
                height="100%"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Flex>
                    <Box mt={30} mr={34} width="57%">
                        <DentistDetails dentist={dentist} />
                        <ReviewContainer type={DENTIST} id={id} />
                    </Box>
                    <Box width="40%">
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
                    </Box>
                </Flex>

                <FeaturedDentists currentDentist={dentist} />
            </Flex>
        </Container>
    );
};

DentistDetailsPageView.propTypes = {
    id: PropTypes.string.isRequired,
};

export default DentistDetailsPageView;
