import React, { Fragment, PureComponent } from 'react';
import Loadable from 'react-loadable';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import {
    Flex,
    Image,
    Box,
    Text,
    Rating,
    Truncate,
    Button,
    Responsive,
    Icon,
} from '../../../components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import { numMaxContainerWidth } from '../../../components/theme';
import { withScreenSizes } from '../../../components/Responsive';
import { setImageSizeToUrl } from '../../../util/imageUtil';
import { formatAddress } from '../../../util/styleUtil';

const Map = Loadable({
    loader: () => import('../Map' /* webpackChunkName: "map" */),
    loading: () => null,
});

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
    constructor(props) {
        super(props);
        this.screenWidthRef = React.createRef();
        this.state = {
            contentWidth: 0,
        };
    }

    setContentWidth = () =>
        this.setState({
            contentWidth:
                Math.min(
                    this.screenWidthRef.current.offsetWidth,
                    numMaxContainerWidth
                ) -
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
            isBookAppointmentVisible,
            toggleBookAppointment,
        } = this.props;

        const { contentWidth } = this.state;

        const isContentVisible = tabletMobileOnly
            ? !isBookAppointmentVisible
            : true;

        const screenWidth = this.screenWidthRef.current
            ? this.screenWidthRef.current.offsetWidth
            : 0;

        return (
            <Box>
                <Box
                    width="100vw"
                    position="fixed"
                    left={0}
                    innerRef={this.screenWidthRef}
                />
                <Flex
                    mb={[0, '', 56]}
                    flexDirection={['column', '', 'row']}
                    textAlign={['center', '', 'left']}
                >
                    <Image
                        width={[102, '', 130]}
                        height={[102, '', 130]}
                        src={setImageSizeToUrl(
                            data.image || defaultUserImage,
                            tabletMobileOnly ? 102 : 130
                        )}
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
                            is="h1"
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
                        {!_isEmpty(data.acceptedInsurances) && (
                            <Flex
                                mt={5}
                                alignItems="center"
                                flexDirection={['column', '', 'row']}
                            >
                                <Flex alignItems="center">
                                    <Icon type="insurance" />
                                    <Text fontSize={['12px', '14px']} ml="8px">
                                        Accepts{' '}
                                        {data.acceptedInsurances.length > 1
                                            ? data.acceptedInsurances.map(
                                                  (sp, index) =>
                                                      index !==
                                                      data.acceptedInsurances
                                                          .length -
                                                          1
                                                          ? `${sp}, `
                                                          : `and ${sp}`
                                              )
                                            : data.acceptedInsurances[0]}
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                        {!_isEmpty(data.languages) && (
                            <Flex
                                alignItems="center"
                                flexDirection={['column', '', 'row']}
                            >
                                <Flex alignItems="center">
                                    <Icon type="languages" />
                                    <Text fontSize={['12px', '14px']} ml="8px">
                                        Speaks{' '}
                                        {data.languages.length > 1
                                            ? data.languages.map((sp, index) =>
                                                  index !==
                                                  data.languages.length - 1
                                                      ? `${sp}, `
                                                      : `and ${sp}`
                                              )
                                            : data.languages[0]}
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                    </Box>
                </Flex>

                <TabletMobile>
                    <Button
                        mt={30}
                        mb={34}
                        width="100%"
                        onClick={toggleBookAppointment}
                    >
                        <Text color="text.white" fontWeight="bold" fontSize={1}>
                            {isContentVisible
                                ? 'Find appointment'
                                : 'Back to Profile'}
                        </Text>
                    </Button>
                </TabletMobile>

                {isContentVisible && this.screenWidthRef.current && (
                    <Fragment>
                        <Text
                            fontSize={[1, '', 4]}
                            fontWeight={['medium', '', 'bold']}
                            mb={[12, '', 26]}
                        >
                            available procedures
                        </Text>

                        {data.procedures.length ? (
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
                        ) : (
                            <Text mb={34}>No procedures selected.</Text>
                        )}

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

                        {data.locations && data.locations.length > 0 && (
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
                                        <Box key={location.name}>
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
                                                {formatAddress(
                                                    location.name,
                                                    location.addressDetails
                                                )}
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
                                        height={tabletMobileOnly ? 184 : 440}
                                        width={
                                            tabletMobileOnly
                                                ? screenWidth
                                                : contentWidth
                                        }
                                        zoom={
                                            data.locations.length === 1 ? 13 : 3
                                        }
                                        data={data.locations.map(location => ({
                                            address: formatAddress(
                                                location.name,
                                                location.addressDetails
                                            ),
                                            url: location.url,
                                            latitude: _get(
                                                location,
                                                'geoPoint.lat'
                                            ),
                                            longitude: _get(
                                                location,
                                                'geoPoint.lon'
                                            ),
                                        }))}
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
