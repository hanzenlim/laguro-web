import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Text, Button, Image, Link } from '../../components';
import devicesImage from '../../images/devices.png';
import { withScreenSizes } from '../../components/Responsive';
import emitter from '../../util/emitter';

const TopCallToAction = ({ desktopOnly }) => (
    <Box bg="#f4f2ff">
        <Container>
            <Box position="relative">
                <Box
                    pt={[26, '', 100]}
                    pb={[50, '', 84]}
                    width={['100%', '', 560]}
                    maxWidth={['100%', '', '50%']}
                    position="relative"
                    zIndex="1"
                >
                    <Text
                        fontSize={[28, '', 50]}
                        fontFamily="IowanOldStyle"
                        fontWeight="bold"
                        lineHeight={[1.25, '', 1]}
                        mb={[16, '', 32]}
                    >
                        You could earn a $100 treatment credit.
                    </Text>
                    <Text fontSize={[1, '', 4]} mb={[12, '', 26]}>
                        {`Earn a $100 credit to use toward your next appointment
                        when you create your free account with us today. `}
                        <Text is="span" fontSize={[1, '', 2]}>
                            Terms apply.{' '}
                        </Text>
                        <Link to="/laguro-credits-terms">
                            <Text
                                is="span"
                                fontSize={[1, '', 2]}
                                color="text.blue"
                            >
                                Learn more
                            </Text>
                        </Link>
                    </Text>

                    <Button
                        height={[50, '', 50]}
                        width="auto"
                        px="46px"
                        style={{ borderRadius: 30 }}
                        onClick={() =>
                            emitter.emit('loginModal', { mode: 'getName' })
                        }
                    >
                        <Box fontSize={2} display="inline" fontWeight="medium">
                            Sign up{' '}
                        </Box>
                        <Box fontSize={2} display="inline" fontWeight="light">
                            — it's free!
                        </Box>
                    </Button>
                </Box>

                <Box
                    position={['static', '', 'absolute']}
                    right={0}
                    top={0}
                    width={1110}
                    maxWidth={['100%', '', '50%']}
                    pb={[60, '', 0]}
                    minHeight={[200, '', 400]}
                >
                    <Image
                        src={devicesImage}
                        maxWidth={['140%', '', '170%']}
                        position="relative"
                        zIndex="2"
                    />
                    <Circle
                        fill="#9379ff"
                        svgSize={desktopOnly ? '40%' : '70%'}
                        width="100%"
                        position="absolute"
                        bottom={['11%', '', '5%']}
                        left={['-24%', '', '-20%']}
                        zIndex={['1', '', '0']}
                    />
                    <Circle
                        fill="#ff5355"
                        svgSize={desktopOnly ? '28%' : '35%'}
                        width="100%"
                        position="absolute"
                        bottom={['2%', '', '-11%']}
                        left={['-5%', '', '-7%']}
                        zIndex="0"
                    />
                </Box>
            </Box>
        </Container>
    </Box>
);

const Circle = ({ fill, svgSize, ...boxProps }) => (
    <Box {...boxProps}>
        <svg
            width={svgSize || '1em'}
            height={svgSize || '1em'}
            viewBox="0 0 379 379"
        >
            <ellipse
                cx={791.191}
                cy={1330.13}
                fill={fill}
                fillRule="evenodd"
                rx={189.084}
                ry={189}
                transform="rotate(-14 -4156.159 3211.078)"
            />
        </svg>
    </Box>
);

TopCallToAction.propTypes = {
    desktopOnly: PropTypes.bool.isRequired,
};

Circle.propTypes = {
    fill: PropTypes.string.isRequired,
    svgSize: PropTypes.string.isRequired,
};

export default withScreenSizes(TopCallToAction);
