import React, { Fragment } from 'react';
import {
    Container,
    Flex,
    Box,
    Carousel,
    Image,
    Sticky,
} from '../../components';
import OfficeDetails from '../common/OfficeDetails';
import Payment from '../common/Payment';
import ReserveOffice from '../common/ReserveOffice';
import { OFFICE } from '../../util/strings';
import ReviewContainer from '../common/ReviewContainer';
import FeaturedOffices from './FeaturedOffices';

const renderReservationModule = () => <Payment />;

const OfficeDetailsPageView = props => {
    const {
        id,
        imageUrls,
        officeDetailsDoneLoadingHandler,
        officeDetailsDoneLoading,
    } = props;

    return (
        <Fragment>
            <Carousel>
                {imageUrls.map(imageUrl => (
                    <Box height="370px">
                        <Image src={imageUrl} width="100%" height="100%" />
                    </Box>
                ))}
            </Carousel>
            <Container>
                <Flex>
                    <Box>
                        <OfficeDetails
                            id={id}
                            viewOnly={false}
                            doneLoading={officeDetailsDoneLoadingHandler}
                            renderStickyComponent={renderReservationModule}
                        />
                        <ReviewContainer type={OFFICE} id={id} />
                    </Box>
                    <Sticky mt={20} offset="20px">
                        <Box
                            mt="44px"
                        >
                            <ReserveOffice
                                officeId={id}
                                startLoading={officeDetailsDoneLoading}
                            />
                        </Box>
                    </Sticky>
                </Flex>
                <FeaturedOffices />
            </Container>
        </Fragment>
    );
};

export default OfficeDetailsPageView;
