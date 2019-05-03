import _get from 'lodash/get';
import React from 'react';
import { Box, Button, Flex, Grid, Text } from '../../../../components';
import Map from '../../Map';

const DEFAULT_COORDINATES = {
    latitude: 42.93552,
    longitude: -88.40764,
};

const AvailableLocationsView = props => {
    const {
        selectedLocation,
        locationList,
        showMap,
        onSelectLocation,
        onToggleMap,
    } = props;

    return (
        <Box mb="13px">
            <Flex justifyContent="space-between" width="100%">
                <Text fontSize={1} fontWeight="500" mb="12px" color="#303549">
                    Available locations
                </Text>

                <Button onClick={onToggleMap} type="ghost" height="auto">
                    <Text fontSize={1} mb="12px" color="#3481f8">
                        {showMap ? 'Hide Map' : 'Show Map'}
                    </Text>
                </Button>
            </Flex>

            {showMap && (
                <Box
                    // Hacky fix for centering the map on location change
                    key={_get(selectedLocation, 'id')}
                    width="100%"
                    height="304px"
                    mb="24px"
                >
                    <Map
                        height={304}
                        width={394}
                        zoom={2}
                        data={
                            selectedLocation
                                ? [
                                      {
                                          latitude: _get(
                                              selectedLocation,
                                              'location.geoPoint.lat'
                                          ),
                                          longitude: _get(
                                              selectedLocation,
                                              'location.geoPoint.lon'
                                          ),
                                      },
                                  ]
                                : [DEFAULT_COORDINATES]
                        }
                    />
                </Box>
            )}

            <Grid gridTemplateColumn="auto" gridRowGap="4px">
                {locationList.map(location => (
                    <Button
                        onClick={() => onSelectLocation(location)}
                        type="ghost"
                        height="auto"
                        width="100%"
                    >
                        <Flex
                            minHeight="48px"
                            py="16px"
                            px="18px"
                            width="100%"
                            alignItems="center"
                            justifyContent="center"
                            borderColor={
                                (selectedLocation &&
                                    selectedLocation.location.name) ===
                                (location && location.location.name)
                                    ? '#3481f8'
                                    : '#dbdbdb'
                            }
                            border="1px solid"
                            borderRadius="2px"
                        >
                            <Text
                                fontSize={1}
                                fontWeight="500"
                                color="rgba(0, 0, 0, 0.5)"
                                letterSpacing="-0.3px"
                                style={{ 'white-space': 'pre-line' }}
                                lineHeight="normal"
                            >
                                {location && location.location.name}
                            </Text>
                        </Flex>
                    </Button>
                ))}
            </Grid>
        </Box>
    );
};

AvailableLocationsView.propTypes = {};

export default AvailableLocationsView;
