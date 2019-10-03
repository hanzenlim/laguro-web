import React from 'react';
import { Popup } from 'react-map-gl';
import styled from 'styled-components';

import {
    Box,
    Text,
    Image,
    Link,
    Rating,
    FilestackImage,
} from '~/components';
import { getIdFromFilestackUrl } from '~/util/imageUtil';

const StyledPopup = styled(Popup)`
    z-index: ${props => props.theme.zIndex.overlay};

    && .mapboxgl-popup-content {
        padding: 0;
    }

    && .mapboxgl-popup-close-button {
        background-color: ${props => props.theme.colors.background.white};
    }
`;

const MapInfoWindow = props => {
    const {
        onClose,
        longitude,
        latitude,
        title,
        body,
        image,
        url,
        rating,
        isLinked,
    } = props;

    const Content = () => (
        <Box width={160}>
            <Box height={90}>
                {image && image.includes('filestack') ? (
                    <FilestackImage
                        handle={getIdFromFilestackUrl(image)}
                        alt={title}
                        sizes={{
                            fallback: '160px',
                        }}
                        formats={['webp', 'pjpg']}
                    />
                ) : (
                    <Image
                        src="/static/images/office-placeholder.png"
                        alt={title}
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                        }}
                    />
                )}
            </Box>
            <Box px={12} pt={2} pb={28} textAlign="center">
                <Text
                    fontSize={1}
                    lineHeight="18px"
                    py={8}
                    letterSpacing="-0.35px"
                >
                    {title}
                </Text>
                <Box mb={10}>
                    <Rating disabled fontSize="16px" value={Number(rating)} />
                </Box>
                <Text
                    fontSize={0}
                    color="text.lightGray"
                    lineHeight="14px"
                    letterSpacing="0px"
                >
                    {body}
                </Text>
            </Box>
        </Box>
    );

    return (
        <StyledPopup
            anchor="top"
            dynamicPosition
            closeButton
            onClose={onClose}
            longitude={longitude}
            latitude={latitude}
        >
            {isLinked ? (
                <Link to={url}>
                    <Content />
                </Link>
            ) : (
                <Box>
                    <Content />
                </Box>
            )}
        </StyledPopup>
    );
};

export default MapInfoWindow;
