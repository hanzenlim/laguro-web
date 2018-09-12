import React, { Fragment } from 'react';
import {
    Container,
    Flex,
    Box,
    Text,
    Carousel,
    Image,
    Sticky,
} from '../../components';
import LinkCard from '../common/LinkCard';
import OfficeDetails from '../common/OfficeDetails';
import Payment from '../common/Payment';
import { OFFICE } from '../../util/strings';
import ReviewContainer from '../common/ReviewContainer';

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
            </Container>
            <Container>
                <Box mt={40}>
                    <Text fontSize={5}>find our highlights</Text>

                    <Flex justifyContent="space-between" mt={30}>
                        <Box width="186px">
                            <LinkCard
                                title="Manhathan Dental"
                                subtitle="dental emergency"
                                address="1308 Terrace Dr Newton, KS 67114"
                                rating={4}
                            />
                        </Box>
                        <Box width="186px">
                            <LinkCard
                                title="Manhathan Dental"
                                subtitle="dental emergency"
                                address="1308 Terrace Dr Newton, KS 67114"
                                rating={4}
                            />
                        </Box>
                        <Box width="186px">
                            <LinkCard
                                title="Manhathan Dental"
                                subtitle="dental emergency"
                                address="1308 Terrace Dr Newton, KS 67114"
                                rating={4}
                            />
                        </Box>
                        <Box width="186px">
                            <LinkCard
                                title="Manhathan Dental"
                                subtitle="dental emergency"
                                address="1308 Terrace Dr Newton, KS 67114"
                                rating={4}
                            />
                        </Box>
                        <Box width="186px">
                            <LinkCard
                                title="Manhathan Dental"
                                subtitle="dental emergency"
                                address="1308 Terrace Dr Newton, KS 67114"
                                rating={4}
                            />
                        </Box>
                        <Box width="186px">
                            <LinkCard
                                title="Manhathan Dental"
                                subtitle="dental emergency"
                                address="1308 Terrace Dr Newton, KS 67114"
                                rating={4}
                            />
                        </Box>
                    </Flex>
                </Box>
            </Container>
        </Fragment>
    );
};

export default OfficeDetailsPageView;
