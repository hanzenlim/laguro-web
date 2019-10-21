import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { AppContext } from '../../appContext';
import styled from 'styled-components';
import _get from 'lodash/get';
import {
    Container,
    Flex,
    Box,
    SlickCarousel,
    FilestackImage,
    Text,
    Responsive,
} from '~/components';
import theme from '~/components/theme';
import OfficeDetails from '~/common/OfficeDetails';
import Payment from '~/common/Payment';
import { OFFICE } from '~/util/strings';
import ReviewContainer from '~/common/ReviewContainer';
import FeaturedOffices from './FeaturedOffices';
import { getIdFromFilestackUrl } from '~/util/imageUtil';
import OfficeLocation from './OfficeLocation';

const BookAppointment = dynamic(() => import('~/common/BookAppointment'), {
    ssr: false,
});

const { Desktop, TabletMobile } = Responsive;

const renderReservationModule = () => <Payment hasBackButton />;

const StyledCarousel = styled(SlickCarousel)`
    &&,
    && div {
        height: auto;
        transition: height 0.2s;

        @media (min-width: 576px) {
            height: 250px;
        }

        @media (min-width: ${theme.breakpoints[1]}) {
            height: 482px;
        }
    }

    &&.full-screen {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    &&.full-screen .image-container img {
        object-fit: cover;

        @media (min-width: 576px) {
            object-fit: contain;
        }
    }

    && .slick-slide {
        width: 100vw;
    }

    && .image-container {
        overflow: hidden;
    }

    && .image-container img {
        object-fit: cover;
    }

    && button {
        top: 50%;
    }

    && button.rightArrow {
        right: 5vw;
    }

    && button.leftArrow {
        left: 5vw;
    }

    && .slick-dots {
        bottom: 5px;

        li {
            margin: 0;

            button:before {
                color: ${props => props.theme.colors.text.white};
                opacity: 0.5;
            }

            &.slick-active button:before {
                opacity: 1;
                font-size: 8px;
                margin-top: 1px;
            }
        }
    }
`;

const OfficeDetailsPageView = props => {
    const { mounted } = useContext(AppContext);
    const [isCarouselFullScreen, setIsCarouselFullScreen] = useState(false);

    const {
        id,
        imageUrls,
        officeName,
        officeDetailsDoneLoadingHandler,
    } = props;

    return (
        <Flex flexDirection="column" height="100%">
            {_get(imageUrls, 'length') > 0 ? (
                <Box
                    {...(isCarouselFullScreen
                        ? { position: 'fixed', zIndex: '9999' }
                        : {})}
                    top={0}
                    height={isCarouselFullScreen ? '100vh' : 'auto'}
                    width="100%"
                    mb={[8, '', 66]}
                >
                    {isCarouselFullScreen && (
                        <Box
                            bg="#262626"
                            position="absolute"
                            width="100%"
                            height="100%"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setIsCarouselFullScreen(false)}
                        />
                    )}
                    {isCarouselFullScreen && (
                        <Text
                            color="text.white"
                            position="absolute"
                            top={0}
                            right="5vw"
                            fontSize={6}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setIsCarouselFullScreen(false)}
                        >
                            &times;
                        </Text>
                    )}
                    <StyledCarousel
                        className={isCarouselFullScreen && 'full-screen'}
                        infinite
                        dots
                        responsive={[
                            {
                                breakpoint: 991,
                                settings: {
                                    arrows: false,
                                    draggable: true,
                                },
                            },
                        ]}
                    >
                        {imageUrls.map((imageUrl, index) => (
                            <Flex
                                className="image-container"
                                key={index}
                                alignItems="center"
                            >
                                <FilestackImage
                                    handle={getIdFromFilestackUrl(imageUrl)}
                                    alt={officeName}
                                    sizes={{
                                        fallback: '100vw',
                                    }}
                                    formats={['webp', 'pjpg']}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        setIsCarouselFullScreen(true)
                                    }
                                />
                            </Flex>
                        ))}
                    </StyledCarousel>
                </Box>
            ) : (
                <Box mb={66} />
            )}
            <Container>
                <Box>
                    <Flex
                        alignItems="flex-start"
                        justifyContent="space-between"
                        flexDirection={['column', '', 'row']}
                    >
                        <Box flex={1} mr={[0, '', 34]}>
                            <OfficeDetails
                                id={id}
                                viewOnly={false}
                                doneLoading={officeDetailsDoneLoadingHandler}
                                renderStickyComponent={renderReservationModule}
                            />
                            <Desktop>
                                <ReviewContainer type={OFFICE} id={id} />
                            </Desktop>
                        </Box>

                        <Box
                            width={['100%', '', 460]}
                            maxWidth={['100%', '', '40%']}
                        >
                            {mounted && <BookAppointment id={id} />}
                            <OfficeLocation id={id} />
                        </Box>
                    </Flex>
                    <TabletMobile>
                        <ReviewContainer type={OFFICE} id={id} />
                    </TabletMobile>
                    <Box mt={[34, '', 90]} mb={[21, '', 173]}>
                        <FeaturedOffices currentOffice={id} />
                    </Box>
                </Box>
            </Container>
        </Flex>
    );
};

export default OfficeDetailsPageView;
