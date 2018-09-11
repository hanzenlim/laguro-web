import React from 'react';
import { Popup } from 'react-map-gl';
import styled from 'styled-components';

import { Flex, Box, Text, Image, Truncate } from '../../../components';

const StyledPopup = styled(Popup)`
    z-index: ${props => props.theme.zIndex.overlay};

    && .mapboxgl-popup-content {
        padding: ${props => props.theme.space[8]};
    }
`;

const MapInfoWindow = props => {
    const { onClose, longitude, latitude, title, subtitle, body } = props;

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
                    height={60}
                    width={60}
                />
                <Box width="160px" ml={5}>
                    <Text
                        fontSize={3}
                        lineHeight="1.29"
                        color="text.black"
                        letterSpacing="-0.8px"
                    >
                        <Truncate lines={1}>{title}</Truncate>
                    </Text>

                    <Text
                        fontWeight="bold"
                        fontStyle="italic"
                        fontSize={1}
                        color="text.black"
                        lineHeight="1"
                    >
                        <Truncate lines={1}>{subtitle}</Truncate>
                    </Text>
                    <Text color="text.black" lineHeight="1.29" fontSize={1}>
                        <Truncate lines={2}>{body}</Truncate>
                    </Text>
                </Box>
            </Flex>
        </StyledPopup>
    );
};

export default MapInfoWindow;
