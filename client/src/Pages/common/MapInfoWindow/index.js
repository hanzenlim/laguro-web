import React from 'react';
import { Popup } from 'react-map-gl';
import styled from 'styled-components';

import { Flex, Box, Text, Image } from '../../../components';

const StyledPopup = styled(Popup)`
    z-index: ${props => props.theme.zIndex.overlay};

    && .mapboxgl-popup-content {
        padding: ${props => props.theme.space[8]};
    }
`;

const MapInfoWindow = props => {
    const { onClose, longitude, latitude, id } = props;

    return (
        <StyledPopup
            anchor="top"
            dynamicPosition
            closeButton={true}
            onClose={onClose}
            longitude={longitude}
            latitude={latitude}
        >
            <Flex alignItems="center">
                <Image
                    src="http://via.placeholder.com/60x60"
                    alt="dentist/office image"
                    borderRadius="50%"
                />
                <Box width="160px" ml={5}>
                    <Text
                        fontSize={2}
                        lineHeight="1.29"
                        color="text.black"
                        letterSpacing="-0.8px"
                    >
                        DR. Saba Khandani
                    </Text>
                    <Text
                        fontWeight="bold"
                        italic
                        fontSize={1}
                        color="text.black"
                        lineHeight="1"
                    >
                        tooth cleaning
                    </Text>
                    <Text color="text.black" lineHeight="1.29" fontSize={1}>
                        1825 E Gary St, Park City, KS 67219
                    </Text>
                </Box>
            </Flex>
        </StyledPopup>
    );
};

export default MapInfoWindow;
