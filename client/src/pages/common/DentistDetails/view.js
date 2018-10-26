import React, { Fragment, PureComponent } from 'react';
import _get from 'lodash/get';
import {
    Flex,
    Image,
    Box,
    Text,
    Rating,
    Truncate,
    Button,
    Responsive,
} from '../../../components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import Map from '../Map';
import { numMaxContainerWidth } from '../../../components/theme';
import { withScreenSizes } from '../../../components/Responsive';

const TAG_COLORS = [
    'background.blue',
    'background.yellow',
    'background.orange',
    'background.darkBlue',
];

const { TabletMobile, Desktop } = Responsive;

const SIDEBAR_WIDTH = 460;
const GUTTER = 34;
const CONTAINER_PADDINGS = 50;

class DentistDetailsView extends PureComponent {
    state = {
        contentWidth:
            Math.min(window.innerWidth, numMaxContainerWidth) -
            (SIDEBAR_WIDTH + GUTTER + CONTAINER_PADDINGS),
    };

    setContentWidth = () =>
        this.setState({
            contentWidth:
                Math.min(window.innerWidth, numMaxContainerWidth) -
                (SIDEBAR_WIDTH + GUTTER + CONTAINER_PADDINGS),
        });

    componentDidMount() {
        window.addEventListener('resize', this.setContentWidth);
        this.setContentWidth();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setContentWidth);
    }

    render() {
        const {
            data,
            tabletMobileOnly,
            screenWidth,
            isBookAppointmentVisible,
            toggleBookAppointment,
        } = this.props;
        const { contentWidth } = this.state;

        const isContentVisible = tabletMobileOnly
            ? !isBookAppointmentVisible
            : true;

        return (
            <Box>
                <Flex
                    mb={[0, '', 56]}
                    flexDirection={['column', '', 'row']}
                    textAlign={['center', '', 'left']}
                >
                    <Image
                        width={[102, '', 130]}
                        height={[102, '', 130]}
                        src={data.image || defaultUserImage}
                        alt={data.name}
                        borderRadius="50%"
                        mr={['auto', '', 20]}
                        ml={['auto', '', 0]}
                    />
                    <Box>
                        <Text
                            textTransform="uppercase"
                            fontSize={[1, '', 3]}
                            color="#adadad"
                            lineHeight={[3, '', 1]}
                            fontWeight="bold"
                            letterSpacing="-0.8px"
                        >
                            {data.specialization}
                        </Text>
                        <Text
                            color="text.black"
                            fontSize={[4, '', 5]}
                            lineHeight={[1, '', '40px']}
                        >
                            {data.name}
                        </Text>

                        <Flex
                            mt={5}
                            alignItems="center"
                            flexDirection={['column', '', 'row']}
                        >
                            <Rating
                                fontSize={[15, '', 18]}
                                value={data.rating}
                                disabled
                            />
                            <Text
                                mt={[8, '', 0]}
                                ml={[0, '', 10]}
                                lineHeight="16px"
                                color="text.black"
                                fontSize={[0, '', 1]}
                            >
                                {data.numReviews} reviews
                            </Text>
                        </Flex>
                    </Box>
                </Flex>

                {isContentVisible && (
                    <Fragment>
                        <TabletMobile>
                            <Button
                                mt={30}
                                mb={34}
                                width="100%"
                                onClick={toggleBookAppointment}
                            >
                                <Text
                                    color="text.white"
                                    fontWeight="bold"
                                    fontSize={1}
                                >
                                    Find appointment
                                </Text>
                            </Button>
                        </TabletMobile>

                        <Text
                            fontSize={[1, '', 4]}
                            fontWeight={['medium', '', 'bold']}
                            mb={[12, '', 26]}
                        >
                            available procedures
                        </Text>

                        <Flex flexWrap="wrap" mb="34px">
                            {data.procedures.map((procedure, index) => (
                                <Button
                                    type="ghost"
                                    height={['auto', '', '50px']}
                                >
                                    <Box
                                        px={[12, '', 24]}
                                        py={[0, '', 10]}
                                        bg={TAG_COLORS[index % 4]}
                                        borderRadius="25px"
                                        mr="6px"
                                        mb="6px"
                                    >
                                        <Text
                                            textTransform="lowercase"
                                            color="text.white"
                                            lineHeight="22px"
                                            fontSize={[0, '', 1]}
                                            letterSpacing="-0.4px"
                                        >
                                            {procedure}
                                        </Text>
                                    </Box>
                                </Button>
                            ))}
                        </Flex>

                        {data.bio && (
                            // Added fixed width to fix bug in rendering truncated text
                            <Box
                                pb={[0, '', 42]}
                                width={
                                    tabletMobileOnly
                                        ? screenWidth - 50
                                        : contentWidth
                                }
                            >
                                <TabletMobile>
                                    <Text
                                        fontSize={1}
                                        fontWeight="medium"
                                        mb={12}
                                    >
                                        About the Dentist
                                    </Text>
                                </TabletMobile>
                                <Text fontSize={1} lineHeight="1.86">
                                    <Truncate
                                        lines={3}
                                        toggle={
                                            <Text
                                                is="span"
                                                color="text.blue"
                                                fontWeight="bold"
                                            >
                                                … show more.
                                            </Text>
                                        }
                                    >
                                        {data.bio}
                                    </Truncate>
                                </Text>
                            </Box>
                        )}

                        {data.locations &&
                            data.locations.length > 0 && (
                                <Box
                                    pt={40}
                                    borderTop={['none', '', '1px solid']}
                                    borderColor="divider.gray"
                                >
                                    <Text
                                        color="text.black"
                                        fontSize={[1, '', 4]}
                                        lineHeight="1.5"
                                        letterSpacing="1.5"
                                        fontWeight={['bold', '', 'regular']}
                                    >
                                        address information{' '}
                                        {data.locations.map(location => (
                                            <Box>
                                                <Text
                                                    is="span"
                                                    fontWeight={[
                                                        'regular',
                                                        '',
                                                        'bold',
                                                    ]}
                                                    fontSize={[0, '', 4]}
                                                    display={[
                                                        'block',
                                                        '',
                                                        'inline',
                                                    ]}
                                                    mt={[14, '', 0]}
                                                >
                                                    <Desktop>{' - '}</Desktop>
                                                    {location.name}
                                                </Text>
                                            </Box>
                                        ))}
                                    </Text>

                                    <Box
                                        width="100%"
                                        height={[184, '', 440]}
                                        mt={20}
                                        ml={[-25, '', 0]}
                                    >
                                        <Map
                                            height={
                                                tabletMobileOnly ? 184 : 440
                                            }
                                            width={
                                                tabletMobileOnly
                                                    ? screenWidth
                                                    : contentWidth
                                            }
                                            zoom={
                                                data.locations.length === 1
                                                    ? 13
                                                    : 3
                                            }
                                            data={data.locations.map(
                                                location => ({
                                                    address: location.name,
                                                    latitude: _get(
                                                        location,
                                                        'geoPoint.lat'
                                                    ),
                                                    longitude: _get(
                                                        location,
                                                        'geoPoint.lon'
                                                    ),
                                                })
                                            )}
                                        />
                                    </Box>
                                </Box>
                            )}
                        <TabletMobile>
                            <Button
                                mt={24}
                                mb={30}
                                width="100%"
                                onClick={toggleBookAppointment}
                            >
                                <Text
                                    color="text.white"
                                    fontWeight="bold"
                                    fontSize={1}
                                >
                                    Find appointment
                                </Text>
                            </Button>
                        </TabletMobile>
                    </Fragment>
                )}
            </Box>
        );
    }
}

export default withScreenSizes(DentistDetailsView);
