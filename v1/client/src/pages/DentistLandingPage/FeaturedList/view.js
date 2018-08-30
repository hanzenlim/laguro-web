import React, { Component, Fragment } from 'react';
import { Box, Container, Text, Carousel } from '../../../components';
import LinkCard from '../../common/LinkCard';

class FeaturedListView extends Component {
    render() {
        const { data } = this.props;
        return (
            <Fragment>
                <Container>
                    <Text
                        color="black"
                        fontSize={4}
                        lineHeight="34px"
                        letterSpacing="-0.8px"
                        textAlign="center"
                        mt={40}
                    >
                        rent your dental office
                    </Text>
                    <Text
                        color="black"
                        fontSize={3}
                        lineHeight="34px"
                        fontWeight="light"
                        textAlign="center"
                    >
                        Have free space to share or have an open office? Rent
                        your dental office with Laguro.
                    </Text>
                    <Text
                        color="black"
                        fontSize={3}
                        lineHeight="30px"
                        fontWeight="light"
                        textAlign="center"
                        mt={100}
                        mb={40}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin vestibulum felis eu malesuada pulvinar. Aliquam
                        sodales, sem nec mollis, magna ante porta tortor, vitae
                        pellentesque odio dui tempus mi.
                    </Text>
                </Container>
                <Carousel
                    cellAlign="center"
                    slidesToShow={4}
                    slideWidth={1.33}
                    cellSpacing={35}
                    slideIndex={1.5}
                    controlsStyle={{
                        top: '-100px',
                    }}
                >
                    {data.map((item, index) => (
                        <Box
                            width="100%"
                            height="calc((100vw - 105px) / 3 + 44px)"
                            key={index}
                            mb="90px"
                        >
                            <LinkCard size="big" height="100%" {...item} />
                        </Box>
                    ))}
                </Carousel>
                <Container>
                    <Text
                        color="black"
                        fontSize={4}
                        lineHeight="34px"
                        letterSpacing="-0.8px"
                        textAlign="center"
                    >
                        Lorem ipsum
                    </Text>
                    <Text
                        color="black"
                        fontSize={3}
                        lineHeight="34px"
                        fontWeight="light"
                        textAlign="center"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin vestibulum felis eu malesuada pulvinar. Aliquam
                        sodales, sem nec mollis dapibus, magna ante porta
                        tortor, vitae pellentesque odio dui tempus mi.
                        Suspendisse potenti. Pellentesque vitae semper augue.
                        Phasellus fermentum, convallis fermentum ex sollicitudin
                        tincidunt. Curabitur vitae dapibus nibh. Nam condimentum
                        dolor eget massa fermentum elementum. Fusce accumsan vel
                        nulla quis tristique. Sed fermentum non libero mattis
                        molestie. Fusce at metus vitae enim semper vestibulum.
                    </Text>
                    <Text
                        color="black"
                        fontSize={3}
                        lineHeight="30px"
                        fontWeight="light"
                        textAlign="center"
                        mt={40}
                    >
                        Aliquam molestie pharetra metus, eu imperdiet ipsum
                        mattis nec. Vestibulum urna justo, molestie at tincidunt
                        ac, auctor vitae leo. Suspendisse malesuada sem at arcu
                        pharetra aliquet. Nunc vestibulum porta augue, a tempor
                        velit ullamcorper in. Vivamus eget tellus tincidunt ante
                        cursus ullamcorper at id ligula. Suspendisse potenti.
                    </Text>
                </Container>
            </Fragment>
        );
    }
}

export default FeaturedListView;
