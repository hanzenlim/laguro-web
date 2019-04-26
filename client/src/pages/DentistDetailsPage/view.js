import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Container, Flex, Box, Sticky, Responsive } from '../../components';
import FeaturedDentists from './FeaturedDentists';
import ReviewContainer from '../common/ReviewContainer';
import BookAppointment from '../common/BookAppointment';
import DentistDetails from '../common/DentistDetails';

import { DENTIST } from '../../util/strings';

const { Desktop, TabletMobile } = Responsive

class DentistDetailsPageView extends PureComponent {
    render() {
        const { dentist, id } = this.props;

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
                        <Box>
                            <Box mt={30} mr={[0, '', 34]}>
                                <DentistDetails dentist={dentist} />
                                <Desktop>
                                    <ReviewContainer type={DENTIST} id={id} />
                                </Desktop>
                            </Box>
                        </Box>
                        <Sticky 
                            width={['100%', '', 460]}
                            maxWidth={['100%', '', '40%']}
                        >
                            <Box
                                mt={[22, '', 44]}
                                border={['none', '', '1px solid']}
                                borderColor={['', '', 'divider.gray']}
                                boxShadow={['none', '', 0]}
                                pt={[0, '', 16]}
                                pr={[0, '', 32]}
                                pl={[0, '', 32]}
                                pb={32}
                            >
                                <BookAppointment id={id} />
                            </Box>
                        </Sticky>
                    </Flex>
                    <TabletMobile>
                        <ReviewContainer type={DENTIST} id={id} />
                    </TabletMobile>
                    <FeaturedDentists currentDentist={dentist} />
                </Flex>
            </Container>
        );
    }
}

DentistDetailsPageView.propTypes = {
    id: PropTypes.string.isRequired,
};

export default DentistDetailsPageView;
