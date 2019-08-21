import React from 'react';
import PropTypes from 'prop-types';

import { Box, Container, Grid, Text, Link } from '../../components';
import { withScreenSizes } from '../../components/Responsive';

const AboutSection = ({ desktopOnly }) => (
    <Box pt={[44, '', 127]} pb={[66, '', 140]} bg="background.white">
        <Container>
            <Grid gridTemplateColumns={['1fr', '', '1fr 1fr']}>
                <Box pt={[0, '', 42]} mb={[55, '', 0]}>
                    <Text
                        fontWeight="bold"
                        fontFamily="IowanOldStyle"
                        fontSize={[28, '', 50]}
                        lineHeight={[1.25, '', 1.06]}
                        mb={[36, '', 46]}
                        width={['100%', '', 562]}
                        maxWidth="100%"
                    >
                        {`We're all about making the right connections.`}
                    </Text>
                    <Text
                        fontSize={[1, '', 4]}
                        lineHeight={1.35}
                        mb={30}
                        width={['100%', '', 544]}
                        maxWidth="100%"
                    >
                        Laguro makes it simple for you to find and connect with
                        the right dentist anytime, anywhere. We are here to help
                        you simplify your dental search by ensuring that you are
                        matched with the best!
                    </Text>
                    <Link to="/about">
                        <Text
                            fontSize={[1, '', 4]}
                            width={[135, '', 182]}
                            height={[50, '', 60]}
                            lineHeight={['50px', '', '60px']}
                            bg="background.blue"
                            borderRadius={30}
                            color="text.white"
                            textAlign="center"
                            mx={['auto', '', 'initial']}
                        >
                            About us
                        </Text>
                    </Link>
                </Box>

                <Box pl={[0, '', 30]}>
                    <iframe
                        title="Laguro"
                        width="100%"
                        height={desktopOnly ? 488 : 244}
                        src="https://player.vimeo.com/video/354290976?autopause=0"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                    />
                </Box>
            </Grid>
        </Container>
    </Box>
);

AboutSection.propTypes = {
    desktopOnly: PropTypes.bool.isRequired,
};

export default withScreenSizes(AboutSection);
