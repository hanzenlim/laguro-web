import React, { PureComponent } from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';
import {
    Container,
    Flex,
    Box,
    SlickCarousel,
    Image,
    Sticky,
} from '../../components';
import OfficeDetails from '../common/OfficeDetails';
import Payment from '../common/Payment';
import ReserveOffice from '../common/ReserveOffice';
import { OFFICE } from '../../util/strings';
import ReviewContainer from '../common/ReviewContainer';
import FeaturedOffices from './FeaturedOffices';

const renderReservationModule = () => <Payment hasBackButton />;

const StyledCarousel = styled(SlickCarousel)`
    && {
        margin-bottom: 20px;
    }

    &&,
    && div {
        margin-bottom: 20px;
        height: 20vw;
        transition: height 0.2s;
    }

    &&.expanded,
    &&.expanded div {
        height: 66vw;

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

        this.state = { carouselClass: '' };
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
            officeDetailsDoneLoading,
        } = this.props;
        return (
            <Flex flexDirection="column" height="100%">
                {_get(imageUrls, 'length') > 0 ? (
                    <StyledCarousel
                        className={this.state.carouselClass}
                        infinite={true}
                        centerPadding={0}
                        variableWidth={true}
                    >
                        {imageUrls.map((imageUrl, index) => (
                            <Flex
                                className="image-container"
                                key={index}
                                alignItems="center"
                                onClick={this.toggleCarouselHeight}
                            >
                                <Image
                                    src={imageUrl}
                                    width="100%"
                                    height="100%"
                                />
                            </Flex>
                        ))}
                    </StyledCarousel>
                ) : (
                    <Box mb={30} />
                )}
                <Container style={{ flex: 1 }}>
                    <Flex
                        height="100%"
                        flexDirection="column"
                        justifyContent="space-between"
                    >
                        <Flex justifyContent="space-between">
                            <Box width="57%">
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
                                <ReviewContainer type={OFFICE} id={id} />
                            </Box>
                            <Sticky mt={20} offset="20px">
                                <Box mt="44px" width="460px">
                                    <ReserveOffice
                                        officeId={id}
                                        startLoading={officeDetailsDoneLoading}
                                    />
                                </Box>
                            </Sticky>
                        </Flex>
                        <FeaturedOffices currentOffice={id} />
                    </Flex>
                </Container>
            </Flex>
        );
    }
}

export default OfficeDetailsPageView;
