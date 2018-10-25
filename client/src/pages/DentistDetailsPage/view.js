import React from 'react';
import PropTypes from 'prop-types';

import { Container, Flex, Box, Sticky, Responsive } from '../../components';

import FeaturedDentists from './FeaturedDentists';
import ReviewContainer from '../common/ReviewContainer';
import BookAppointment from '../common/BookAppointment';
import DentistDetails from '../common/DentistDetails';

import { DENTIST } from '../../util/strings';

const { Desktop } = Responsive;

const DentistDetailsPageView = props => {
    const { dentist, id } = props;

    return (
        <Container style={{ height: '100%' }}>
            <Flex
                height="100%"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Flex
                    justifyContent="space-between"
                    flexDirection={['column', '', 'row']}
                >
                    <Box width={['100%', '', 'calc(100% - 460px)']}>
                        <Box mt={30} mr={[0, '', 34]}>
                            <DentistDetails dentist={dentist} />
                            <ReviewContainer type={DENTIST} id={id} />
                        </Box>
                    </Box>
                    <Desktop>
                        <Sticky>
                            <Box
                                mt="44px"
                                width="460px"
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
                    </Desktop>
                </Flex>
                <Desktop>
                    <FeaturedDentists currentDentist={dentist} />
                </Desktop>
            </Flex>
        </Container>
    );
};

DentistDetailsPageView.propTypes = {
    id: PropTypes.string.isRequired,
};

export default DentistDetailsPageView;
