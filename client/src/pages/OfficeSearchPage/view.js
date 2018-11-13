import React from 'react';
import { Container, Box, Grid, Responsive } from '../../components';
import SearchBox from '../common/SearchBox';
import SearchResultsList from '../common/SearchResultsList';
import Map from '../common/Map';

const { Desktop, TabletMobile } = Responsive;

const OfficeSearchPageView = props => {
    const { data, total, urlParams, defaultPosition, mapDimensions } = props;

    return (
        <Container pt={[48, '', 160]}>
            <Grid
                gridColumnGap={['', '', '33px']}
                gridTemplateColumns={[
                    '1fr',
                    '',
                    `${total > 0 ? '1fr 1fr' : ''}`,
                ]}
            >
                <Box mt={[24, '', 0]}>
                    <TabletMobile>
                        <Box mb={20}>
                            <SearchBox
                                size="large"
                                placeholder="Search offices"
                            />
                        </Box>
                    </TabletMobile>
                    <SearchResultsList
                        title="Office Results"
                        data={data}
                        total={total}
                    />
                </Box>
                {total > 0 ? (
                    <Desktop>
                        <Box
                            position="fixed"
                            transform="translateX(calc(100% + 34px))"
                            top="160px"
                            height="calc(100vh - 160px)"
                            mb="30px"
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
