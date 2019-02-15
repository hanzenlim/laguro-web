import React from 'react';
import styled from 'styled-components';

import { Box, Container, SlickCarousel, Flex, Text } from '../../../components';
import CarouselLinkCard from '../../common/CarouselLinkCard';

const carouselSpacing = 15;

const StyledCarousel = styled(SlickCarousel)`
    && .slick-track {
        margin-left: 0;
    }
`;

const FeaturedListView = props => (
    <Flex mt={[28, 28, 80]} mb={[28, 28, 75]} flexDirection="column">
        <Container pr={[0, 0, 25]}>
            {props.featuredDentists.length > 0 && (
                <Box>
                    <Text
                        color="text.black50"
                        fontSize={[1, 1, 4]}
                        mb={[10, 10, 36]}
                        fontWeight={['bold', '', 'regular']}
                    >
                        DENTISTS NEAR ME
                    </Text>
                    <StyledCarousel
                        infinite={true}
                        centerPadding={0}
                        slidesToShow={5}
                        adaptiveHeight
                        responsive={[
                            {
                                breakpoint: 1026,
                                settings: {
                                    slidesToShow: 3.5,
                                    arrows: false,
                                    draggable: true,
                                    infinite: false,
                                },
                            },
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 2.5,
                                    arrows: false,
                                    draggable: true,
                                    infinite: false,
                                },
                            },
                        ]}
                    >
                        {props.featuredDentists.map((item, index) => (
                            <Box key={index} pr={carouselSpacing}>
                                <CarouselLinkCard
                                    height="100%"
                                    size="big"
                                    url={`/dentist/${item._id}`}
                                    {...item._source}
                                />
                            </Box>
                        ))}
                    </StyledCarousel>
                </Box>
            )}
        </Container>
    </Flex>
);

export default FeaturedListView;
