import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

import { Container, Flex, Box, Responsive } from '~/components';
import FeaturedDentists from './partials/FeaturedDentists';
import ReviewContainer from '~/common/ReviewContainer';
import DentistDetails from '~/common/DentistDetails';
import PriceEstimation from '~/common/PriceEstimation';

const BookAppointment = dynamic(() => import('~/common/BookAppointment'), {
    ssr: false,
});

import { DENTIST } from '~/util/strings';

const { Desktop, TabletMobile } = Responsive;

class DentistDetailsPageView extends Component {
    getDentistBundles = (procedures, bundles) => {
        const procedureStringList = procedures.map(p => p.group);
        const filteredBundles = bundles
            ? bundles.filter(b => procedureStringList.includes(b.group))
            : [];
        return filteredBundles;
    };

    render() {
        const { dentist, id, toggleLoginModal } = this.props;
        const dentistBundles = this.getDentistBundles(
            dentist.procedures,
            dentist.bundles
        );

        return (
            <Container style={{ height: '100%' }}>
                <Flex
                    height="100%"
                    flexDirection="column"
                    justifyContent="space-between"
                >
                    <Flex
                        alignItems="flex-start"
                        justifyContent="space-between"
                        flexDirection={['column', '', 'row']}
                    >
                        <Box width="100%" maxWidth={['100%', '', '752px']}>
                            <Box mt={30} mr={[0, '', 34]}>
                                <DentistDetails dentist={dentist} />
                                {!_isEmpty(dentistBundles) ? (
                                    <PriceEstimation
                                        bundles={dentistBundles}
                                        acceptedInsurances={
                                            dentist.acceptedInsurances
                                        }
                                        toggleLoginModal={toggleLoginModal}
                                    />
                                ) : null}
                                <Desktop>
                                    <ReviewContainer type={DENTIST} id={id} />
                                </Desktop>
                            </Box>
                        </Box>
                        <Box width="100%" maxWidth={['100%', '', '505px']}>
                            <BookAppointment
                                id={id}
                                toggleLoginModal={toggleLoginModal}
                            />
                        </Box>
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
