import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Container, Flex, Box, Sticky, Responsive } from '../../components';
import { withScreenSizes } from '../../components/Responsive';
import FeaturedDentists from './FeaturedDentists';
import ReviewContainer from '../common/ReviewContainer';
import BookAppointment from '../common/BookAppointment';
import DentistDetails from '../common/DentistDetails';
import queryString from 'query-string';
import history from '../../history';

import { DENTIST } from '../../util/strings';

const { Desktop } = Responsive;

class DentistDetailsPageView extends PureComponent {
    constructor(props) {
        super(props);
        const urlParams = queryString.parse(history.location.search);

        this.state = {
            isBookAppointmentVisible: urlParams.startTime
                ? true
                : this.props.desktopOnly,
        };
    }

    toggleBookAppointment = () =>
        this.setState(({ isBookAppointmentVisible }) => ({
            isBookAppointmentVisible: !isBookAppointmentVisible,
        }));

    render() {
        const { dentist, id } = this.props;
        const { isBookAppointmentVisible } = this.state;

        const isContentVisible = this.props.desktopOnly
            ? true
            : !isBookAppointmentVisible;

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
                                <DentistDetails
                                    dentist={dentist}
                                    toggleBookAppointment={
                                        this.toggleBookAppointment
                                    }
                                    isBookAppointmentVisible={
                                        isBookAppointmentVisible
                                    }
                                />
                                {isContentVisible && (
                                    <ReviewContainer type={DENTIST} id={id} />
                                )}
                            </Box>
                        </Box>
                        {isBookAppointmentVisible && (
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
                        )}
                    </Flex>
                    <Desktop>
                        <FeaturedDentists currentDentist={dentist} />
                    </Desktop>
                </Flex>
            </Container>
        );
    }
}

DentistDetailsPageView.propTypes = {
    id: PropTypes.string.isRequired,
};

export default withScreenSizes(DentistDetailsPageView);
