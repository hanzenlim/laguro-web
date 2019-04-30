import React, { PureComponent } from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';
import {
    Container,
    Flex,
    Box,
    SlickCarousel,
    FilestackImage,
    Responsive,
} from '../../components';
import theme from '../../components/theme';
import OfficeDetails from '../common/OfficeDetails';
import Payment from '../common/Payment';
import ReserveOffice from '../common/ReserveOffice';
import { OFFICE } from '../../util/strings';
import ReviewContainer from '../common/ReviewContainer';
import FeaturedOffices from './FeaturedOffices';
import { getIdFromFilestackUrl } from '../../util/imageUtil';
import OfficeLocation from './OfficeLocation';

const { Desktop, TabletMobile } = Responsive;

const renderReservationModule = () => <Payment hasBackButton />;

const StyledCarousel = styled(SlickCarousel)`
    &&,
    && div {
        height: 208px;
        margin-bottom: 8px;
        transition: height 0.2s;

        @media (min-width: ${theme.breakpoints[1]}) {
            margin-bottom: 66px;
            height: 482px;
        }
    }

    &&.expanded,
    &&.expanded div {
        height: 250px;

        @media (min-width: ${theme.breakpoints[1]}) {
            height: 66vw;
        }

        @media (min-width: 1300px) {
            height: 850px;
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
        z-index: ${props => props.theme.zIndex.overlay};
        top: 50%;
    }

    && button.rightArrow {
        right: 100px;
    }

    && button.leftArrow {
        left: 100px;
    }
`;

class OfficeDetailsPageView extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            carouselClass: '',
        };
    }

    toggleCarouselHeight = () => {
        if (this.state.carouselClass === '') {
            this.setState({ carouselClass: 'expanded' });
        } else {
            this.setState({ carouselClass: '' });
        }
    };

    render() {
        const {
            id,
            imageUrls,
            officeDetailsDoneLoadingHandler,
            officeDetailsDoneLoading
        } = this.props;

        const { carouselClass } = this.state;

        return (
            <Flex flexDirection="column" height="100%">
                {_get(imageUrls, 'length') > 0 ? (
                    <StyledCarousel
                        className={carouselClass}
                        infinite={true}
                        centerPadding={0}
                        variableWidth={true}
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
                                onClick={this.toggleCarouselHeight}
                            >
                                <FilestackImage
                                    handle={getIdFromFilestackUrl(imageUrl)}
                                    // TODO: Use a more description alt name
                                    alt="laguro"
                                    sizes={{
                                        fallback: '100vw',
                                    }}
                                    formats={['webp', 'pjpg']}
                                />
                            </Flex>
                        ))}
                    </StyledCarousel>
                ) : (
                    <Box mb={66} />
                )}
                <Container>
                    <Box>
                        <Flex
                            justifyContent="space-between"
                            flexDirection={['column', '', 'row']}
                        >
                            <Box flex={1} mr={[0, '', 34]}>
                                <OfficeDetails
                                    id={id}
                                    viewOnly={false}
                                    doneLoading={
                                        officeDetailsDoneLoadingHandler
                                    }
                                    renderStickyComponent={
                                        renderReservationModule
                                    }
                                />
                                <Desktop>
                                    <ReviewContainer
                                        type={OFFICE}
                                        id={id}
                                    />
                                </Desktop>
                            </Box>
                            <Box
                                width={['100%', '', 460]}
                                maxWidth={['100%', '', '40%']}
                            >
                                <ReserveOffice
                                    officeId={id}
                                    startLoading={
                                        officeDetailsDoneLoading
                                    }
                                />

                                <OfficeLocation id={id} />
                            </Box>
                        </Flex>
                        <TabletMobile>
                            <ReviewContainer
                                type={OFFICE}
                                id={id}
                            />
                        </TabletMobile>
                        <FeaturedOffices currentOffice={id} />
                    </Box>
                </Container>
            </Flex>
        );
    }
}

export default OfficeDetailsPageView;
