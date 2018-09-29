import React from 'react';
import styled from 'styled-components';

import { Box, Container, SlickCarousel, Flex, Text } from '../../../components';
import CarouselLinkCard from '../../common/CarouselLinkCard';
import { numMaxContainerWidth } from '../../../components/theme';

const carouselSpacing = 15;
const slidesToShow = 5;

const slideWidth =
    (numMaxContainerWidth - carouselSpacing * slidesToShow) / slidesToShow +
    carouselSpacing;

const StyledCarousel = styled(SlickCarousel)`
    && {
        height: 275px;
    }
`;

const FeaturedListView = props => (
    <Flex mt={80} mb={75} flexDirection="column">
        <Container>
            {props.featuredDentists.length > 0 && (
                <Box>
                    <Text color="text.black50" fontSize={4} mb={36}>
                        DENTISTS NEAR ME
                    </Text>
                    <StyledCarousel
                        className="slider variable-width"
                        infinite={true}
                        centerPadding={0}
                        variableWidth={true}
                        height="200px"
                    >
                        {props.featuredDentists.map((item, index) => (
                            <Box
                                style={{
                                    width: slideWidth + 3, // 3 is for aligning the pictures to the content width
                                }}
                                px={carouselSpacing / 2}
                                mb={90}
                                key={index}
                            >
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
