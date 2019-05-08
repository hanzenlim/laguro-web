import React from 'react';
import {
    Box,
    Button,
    Flex,
    Grid,
    Text,
    Truncate,
    Image,
    Link,
} from '../../../../components';
import _get from 'lodash/get';
import Map from '../../Map';
import LinkIcon from '../../../../components/Icon/link.svg';
import { OFFICE_PAGES_URL_PREFIX } from '../../../../util/urls';
import { withScreenSizes } from '../../../../components/Responsive';
import { formatAddress } from '../../../../util/styleUtil';

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
                <Flex
                    // Hacky fix for centering the map on location change
                    key={_get(selectedLocation, 'id')}
                    width="100%"
                    height="304px"
                    mb="24px"
                    justifyContent="center"
                >
                    <Map
                        height={304}
                        width={
                            props.tabletMobileOnly
                                ? window.innerWidth - 50
                                : 430
                        }
                        zoom={9}
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
                </Flex>
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
                                is="span"
                                fontSize={1}
                                fontFamily="'Silka', 'Courier new', sans-serif"
                                fontWeight="500"
                                color="rgba(0, 0, 0, 0.5)"
                                letterSpacing="-0.3px"
                                lineHeight="normal"
                                width={[285, 500, 370]}
                            >
                                <Flex
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Truncate lines={1}>
                                        {formatAddress(
                                            _get(location, 'location.name')
                                        )}
                                    </Truncate>
                                    <Link
                                        ml={6}
                                        onClick={e => e.stopPropagation()}
                                        target="_blank"
                                        to={`${OFFICE_PAGES_URL_PREFIX}/${_get(
                                            location,
                                            'id'
                                        )}`}
                                    >
                                        <Image src={LinkIcon} alt="link-icon" />
                                    </Link>
                                </Flex>
                            </Text>
                        </Flex>
                    </Button>
                ))}
            </Grid>
        </Box>
    );
};

AvailableLocationsView.propTypes = {};

export default withScreenSizes(AvailableLocationsView);
