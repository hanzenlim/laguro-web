import React from 'react';
import defaultDentistProfileImg from '../../../components/Image/default_dentist_profile_img_square.svg';

import {
    Box,
    Flex,
    Image,
    Rating,
    Text,
    Truncate,
    Link,
    FilestackImage,
} from '../../../components';

import { withScreenSizes } from '../../../components/Responsive';
import { getIdFromFilestackUrl } from '../../../util/imageUtil';

const LinkCard = props => {
    const {
        rating,
        image,
        address,
        title,
        subtitle,
        size,
        type,
        url,
        tabletMobileOnly,
    } = props;

    return (
        <Link type="ghost" to={url}>
            <Box width="100%">
                <Box size="186px" position="relative" borderRadius="4px">
                    <Box
                        pb={type === 'rectangle' ? '75%' : '100%'}
                        position="relative"
                    >
                        {image ? (
                            <Box position="absolute" width="100%" height="100%">
                                <FilestackImage
                                    handle={getIdFromFilestackUrl(image)}
                                    alt={title}
                                    sizes={{
                                        '(min-width: 992px)': '196px',
                                        '(min-width: 768px)': '228px',
                                        fallback: '350px',
                                    }}
                                    formats={['webp', 'pjpg']}
                                />
                            </Box>
                        ) : (
                            <Image
                                position="absolute"
                                borderRadius="4px"
                                src={defaultDentistProfileImg}
                                height={props.height}
                                alt={title}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        )}
                    </Box>
                    {address && (
                        <Flex
                            p={8}
                            width="100%"
                            minHeight="56px"
                            position="absolute"
                            bottom="0"
                            bg="rgba(242, 242, 242, 0.7)"
                            alignItems="center"
                        >
                            <Text
                                fontSize={size === 'big' ? 3 : [0, '', 1]}
                                color="text.black"
                                lineHeight="1.29"
                                letterSpacing="-0.5px"
                            >
                                {address}
                            </Text>
                        </Flex>
                    )}
                </Box>

                <Flex mt={[8, '', 5]} flexDirection="column">
                    <Text
                        color="text.black"
                        lineHeight="1.22"
                        fontSize={size === 'big' ? 3 : [1, '', 2]}
                        letterSpacing="-0.8px"
                        order={[2, '', 1]}
                    >
                        <Truncate lines={1}>{title || ''}</Truncate>
                    </Text>

                    <Text
                        fontStyle={tabletMobileOnly ? 'normal' : 'italic'}
                        textTransform={
                            tabletMobileOnly ? 'uppercase' : 'capitalize'
                        }
                        lineHeight="1.1"
                        fontSize={['10px', '', 4]}
                        color={['text.gray', '', 'text.black']}
                        fontWeight={['normal', '', 'bold']}
                        order={[1, '', 2]}
                        mb={[4, '', 0]}
                    >
                        <Truncate lines={1}>{subtitle}</Truncate>
                    </Text>

                    <Box mt={3} order={3}>
                        <Rating disabled fontSize={[0, '', 4]} value={rating} />
                    </Box>
                </Flex>
            </Box>
        </Link>
    );
};

LinkCard.defaultProps = {
    url: '#',
};

export default withScreenSizes(LinkCard);
