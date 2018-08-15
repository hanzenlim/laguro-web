import React from 'react';
import styled from 'styled-components';

import { Flex, Box, Text, Image } from '../../../components';
import { StyledPopup, StyledImage } from './styles';

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
                <StyledImage
                    src="http://via.placeholder.com/60x60"
                    alt="dentist/office image"
                />
                <Box width="160px" ml={5}>
                    <Text
                        fontSize={2}
                        lineHeight="1.29"
                        color="black"
                        letterSpacing="-0.8px"
                    >
                        DR. Saba Khandani
                    </Text>
                    <Text bold italic fontSize={1} color="black" lineHeight="1">
                        tooth cleaning
                    </Text>
                    <Text color="black" lineHeight="1.29" fontSize={1}>
                        1825 E Gary St, Park City, KS 67219
                    </Text>
                </Box>
            </Flex>
        </StyledPopup>
    );
};

export default MapInfoWindow;
