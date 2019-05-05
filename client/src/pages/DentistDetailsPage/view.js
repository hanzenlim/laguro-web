import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

import { Container, Flex, Box, Responsive } from '../../components';
import FeaturedDentists from './FeaturedDentists';
import ReviewContainer from '../common/ReviewContainer';
import BookAppointment from '../common/BookAppointment';
import DentistDetails from '../common/DentistDetails';
import PriceEstimation from '../common/PriceEstimation';

import { DENTIST } from '../../util/strings';

const { Desktop, TabletMobile } = Responsive;

class DentistDetailsPageView extends PureComponent {
    getDentistBundles = (procedures, bundles) => {
        const procedureStringList = procedures.map(p => p.group);
        const filteredBundles = bundles.filter(b =>
            procedureStringList.includes(b.group)
        );
        return filteredBundles;
    };

    render() {
        const { dentist, id } = this.props;
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
                                    />
                                ) : null}
                                <Desktop>
                                    <ReviewContainer type={DENTIST} id={id} />
                                </Desktop>
                            </Box>
                        </Box>
                        <Box
                            width="100%"
                            maxWidth={['100%', '', '505px']}
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
