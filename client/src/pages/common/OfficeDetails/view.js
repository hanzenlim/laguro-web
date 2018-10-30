import React, { Fragment, PureComponent } from 'react';
import get from 'lodash/get';
import {
    Flex,
    Box,
    Text,
    Rating,
    Truncate,
    Button,
    Responsive,
} from '../../../components';
import { cleanAddress } from '../../../util/styleUtil';
import Map from '../../common/Map';
import { numMaxContainerWidth } from '../../../components/theme';
import { withScreenSizes } from '../../../components/Responsive';

const { TabletMobile, Desktop } = Responsive;

const SIDEBAR_WIDTH = 460;
const GUTTER = 34;
const CONTAINER_PADDINGS = 50;

class OfficeDetailsView extends PureComponent {
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
            toggleReserveOffice,
            isReserveOfficeVisible,
        } = this.props;
        const { contentWidth } = this.state;

        const isContentVisible = tabletMobileOnly
            ? !isReserveOfficeVisible
            : true;

        const screenWidth = this.screenWidthRef.current
            ? this.screenWidthRef.current.offsetWidth
            : 0;

        return (
            <Fragment>
                <Box
                    width="100vw"
                    position="fixed"
                    left={0}
                    innerRef={this.screenWidthRef}
                />
                <Flex
                    alignItems={['left', '', 'center']}
                    mb={[0, '', 40]}
                    flexDirection="column"
                >
                    <Text
                        color="text.black"
                        fontSize={[4, '', 5]}
                        lineHeight="34px"
                        letterSpacing="-0.8px"
                    >
                        {data.officeName}
                    </Text>
                    <Text
                        fontSize={[0, '', 4]}
                        lineHeight={['1.5', '', '34px']}
                        letterSpacing="-0.8px"
                    >
                        {data.address.name}
                    </Text>
                    <Flex mt={[0, '', 10]} alignItems="center">
                        <Rating
                            fontSize={tabletMobileOnly ? '15px' : '18px'}
                            value={data.rating}
                            disabled
                        />
                        <Text
                            ml={10}
                            lineHeight="16px"
                            color="text.black"
                            fontSize={[0, '', 1]}
                        >
                            {data.numReviews} reviews
                        </Text>
                    </Flex>
                </Flex>

                {isContentVisible && (
                    <Fragment>
                        <TabletMobile>
                            <Button
                                mt={16}
                                mb={24}
                                width="100%"
                                onClick={toggleReserveOffice}
                            >
                                <Text
                                    color="text.white"
                                    fontWeight="bold"
                                    fontSize={1}
                                >
                                    Book this listing
                                </Text>
                            </Button>
                        </TabletMobile>

                        {data.description && (
                            // Added fixed width to fix bug in rendering truncated text
                            <Box
                                pb={[0, '', 42]}
                                width={
                                    tabletMobileOnly
                                        ? screenWidth - 50
                                        : contentWidth
                                }
                            >
                                <Text
                                    fontSize={[1, '', 4]}
                                    lineHeight="1.3"
                                    fontWeight={['bold', '', 'regular']}
                                    mb={[16, '', 0]}
                                >
                                    description
                                </Text>
                                <Text fontSize={[0, '', 1]} lineHeight="1.86">
                                    <Truncate lines={3} hasToggle>
                                        {data.description}
                                    </Truncate>
                                </Text>
                            </Box>
                        )}

                        <Box
                            pt={[20, '', 40]}
                            borderTop={['none', '', '1px solid']}
                            borderColor={['', '', 'divider.gray']}
                        >
                            <Text
                                color="text.black"
                                fontSize={[1, '', 4]}
                                lineHeight="1.5"
                                letterSpacing="1.5"
                                fontWeight={['bold', '', 'regular']}
                            >
                                address information{' '}
                                <Text
                                    is="span"
                                    fontWeight={['regular', '', 'bold']}
                                    fontSize={[0, '', 4]}
                                    display={['block', '', 'inline']}
                                    mt={[14, '', 0]}
                                >
                                    <Desktop>{' - '}</Desktop>
                                    {cleanAddress(data.address.name)}
                                </Text>
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
                                    zoom={13}
                                    center={[
                                        data.address.geoPoint.lon,
                                        data.address.geoPoint.lat,
                                    ]}
                                    data={[
                                        {
                                            title: data.officeName,
                                            image: data.imageUrls[0],
                                            address: data.address.name,
                                            latitude: get(
                                                data,
                                                'address.geoPoint.lat'
                                            ),
                                            longitude: get(
                                                data,
                                                'address.geoPoint.lon'
                                            ),
                                        },
                                    ]}
                                />
                            </Box>
                            <TabletMobile>
                                <Button
                                    mt={24}
                                    mb={30}
                                    width="100%"
                                    onClick={toggleReserveOffice}
                                >
                                    <Text
                                        color="text.white"
                                        fontWeight="bold"
                                        fontSize={1}
                                    >
                                        Book this listing
                                    </Text>
                                </Button>
                            </TabletMobile>
                        </Box>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

export default withScreenSizes(OfficeDetailsView);
