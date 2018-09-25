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
import { OFFICE } from '../../util/strings';
import ReviewContainer from '../common/ReviewContainer';
import FeaturedOffices from './FeaturedOffices';

const renderReservationModule = () => <Payment />;

const OfficeDetailsPageView = props => {
    const { id, imageUrls } = props;

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
                            renderStickyComponent={renderReservationModule}
                        />
                        <ReviewContainer type={OFFICE} id={id} />
                    </Box>
                    <Sticky offset="20px">
                        <Payment />
                    </Sticky>
                </Flex>
                <FeaturedOffices />
            </Container>
        </Fragment>
    );
};

export default OfficeDetailsPageView;
