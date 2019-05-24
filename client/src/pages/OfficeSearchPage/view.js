import React from 'react';
import Loadable from 'react-loadable';
import moment from 'moment';
import {
    Container,
    Box,
    Grid,
    Responsive,
    Flex,
    Text,
    Switch,
} from '../../components';
import SearchBox from '../common/SearchBox';
import SearchResultsList from '../common/SearchResultsList';

const Map = Loadable({
    loader: () => import('../common/Map' /* webpackChunkName: "map" */),
    loading: () => null,
});

const { Desktop, TabletMobile } = Responsive;

const OfficeSearchPageView = props => {
    const {
        data,
        total,
        urlParams,
        defaultPosition,
        mapDimensions,
        showMap,
        toggleMap,
        onShowMore,
    } = props;

    return (
        <Box height={['', '', '100vh']}>
            <Container pt={[48, '', total === 0 ? 110 : 169]}>
                <TabletMobile>
                    <Box mb={20} mt={[24, '', 0]}>
                        <SearchBox
                            size="large"
                            placeholder="Search for dentists by name, location, or specialty"
                        />
                    </Box>
                </TabletMobile>
                {total > 0 && (
                    <Flex
                        pb={16}
                        width="100%"
                        left="0"
                        px={[25, '', 0]}
                        position={['relative', '', 'fixed']}
                        zIndex="10"
                        pt={[0, 0, 120]}
                        top={['auto', '', 0]}
                        bg="white"
                    >
                        <Container px={[0, 0, 25]}>
                            <Flex justifyContent="space-between">
                                {urlParams.text && !urlParams.location && (
                                    <Text
                                        fontSize={['20px', '22px']}
                                        color="text.black"
                                    >
                                        Search results for{' '}
                                        <Text
                                            display="inline-block"
                                            fontWeight="bold"
                                        >
                                            "{urlParams.text}"
                                        </Text>
                                    </Text>
                                )}

                                <Text
                                    fontSize={['20px', '22px']}
                                    color="text.black"
                                >
                                    {urlParams.location && 'Offices near '}
                                    <Text
                                        display="inline-block"
                                        fontWeight="bold"
                                    >
                                        {urlParams.location}
                                    </Text>
                                    {urlParams.startTime && ' on '}
                                    {urlParams.startTime && (
                                        <Text
                                            display="inline-block"
                                            fontWeight="bold"
                                        >
                                            {moment(urlParams.startTime).format(
                                                'MMM D, YYYY'
                                            )}
                                        </Text>
                                    )}
                                </Text>

                                <Flex display={['none', '', 'flex']}>
                                    <Text
                                        fontSize="16px"
                                        color="text.black"
                                        mr="13px"
                                    >
                                        Map View
                                    </Text>
                                    <Switch
                                        onClick={toggleMap}
                                        checked={showMap}
                                    />
                                </Flex>
                            </Flex>
                        </Container>
                    </Flex>
                )}
                <Box pt={0}>
                    <Grid
                        gridColumnGap={['', '', '18px']}
                        gridTemplateColumns={[
                            '1fr',
                            '',
                            `${
                                total > 0 && showMap
                                    ? 'fit-content(55%) fit-content(45%)'
                                    : ''
                            }`,
                        ]}
                    >
                        <Box>
                            <Box
                                height={['auto', '', 'calc(100vh - 180px)']}
                                overflow={['', '', 'auto']}
                            >
                                <SearchResultsList
                                    data={data}
                                    total={total}
                                    showMap={showMap}
                                    title="Office Results"
                                    onShowMore={onShowMore}
                                />
                            </Box>
                        </Box>

                        {total > 0 && showMap ? (
                            <Desktop>
                                <Box>
                                    <Map
                                        withLinkedMarkers
                                        data={data}
                                        width={mapDimensions.width}
                                        height={mapDimensions.height}
                                        urlParams={urlParams}
                                        defaultPosition={defaultPosition}
                                    />
                                </Box>
                            </Desktop>
                        ) : null}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default OfficeSearchPageView;
