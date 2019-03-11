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

const { Desktop } = Responsive;

const OfficeSearchPageView = props => {
    const {
        data,
        total,
        urlParams,
        defaultPosition,
        mapDimensions,
        showMap,
        toggleMap,
    } = props;

    console.log({ data });

    return (
        <Container pt={[48, '', 160]}>
            <Desktop>
                {matches =>
                    matches ? null : (
                        <Box mb={20} mt={[24, '', 0]}>
                            <SearchBox
                                size="large"
                                placeholder="Search for dentists by name, location, or specialty"
                            />
                        </Box>
                    )
                }
            </Desktop>
            {total > 0 && (
                <Flex justifyContent="space-between" mb="18px">
                    <Text fontSize={['20px', '22px']} color="text.black">
                        {urlParams.location && 'Dentists near '}
                        <Text display="inline-block" fontWeight="bold">
                            {urlParams.location}
                        </Text>
                        {urlParams.startTime && ' on '}
                        {urlParams.startTime && (
                            <Text display="inline-block" fontWeight="bold">
                                {moment(urlParams.startTime).format(
                                    'MMM D, YYYY'
                                )}
                            </Text>
                        )}
                    </Text>
                    <Flex display={['none', '', 'flex']}>
                        <Text fontSize="16px" color="text.black" mr="13px">
                            Map View
                        </Text>
                        <Switch onClick={toggleMap} />
                    </Flex>
                </Flex>
            )}
            <Grid
                gridColumnGap={['', '', '33px']}
                gridTemplateColumns={[
                    '1fr',
                    '',
                    `${total > 0 && showMap ? '1fr 1fr' : ''}`,
                ]}
            >
                <Box>
                    <Box
                        style={{ overflow: 'scroll' }}
                        height={['auto', '', 'calc(100vh - 220px)']}
                    >
                        <SearchResultsList
                            data={data}
                            total={total}
                            showMap={showMap}
                            title="Office Results"
                        />
                    </Box>
                </Box>

                {total > 0 && showMap ? (
                    <Desktop>
                        <Box
                            position="absolute"
                            transform="translateX(calc(100% + 34px))"
                            top="220px"
                            height="calc(100vh - 220px)"
                            bottom="0"
                        >
                            <Map
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
        </Container>
    );
};

export default OfficeSearchPageView;
