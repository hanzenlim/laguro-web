import React from 'react';

import {
    Box,
    Flex,
    Image,
    Rating,
    Text,
    Truncate,
    Link,
} from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import { setImageSizeToUrl } from '../../../util/imageUtil';
import defaultDentistProfileImg from '../../../components/Image/default_dentist_profile_img_square.svg';

const CarouselLinkCard = props => {
    const {
        averageRating,
        specialty,
        imageUrl,
        name,
        type,
        numReviews,
        url,
        tabletMobileOnly,
    } = props;

    return (
        <Link type="ghost" to={url}>
            <Box maxWidth={[130, 160, 230]} width="100%" height="100%">
                <Box borderRadius="4px" height="100%" position="relative">
                    <Flex
                        height="100%"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box
                            position="relative"
                            width="100%"
                            pb={type === 'rectangle' ? '75%' : '100%'}
                        >
                            <Image
                                position="absolute"
                                borderRadius="4px"
                                src={setImageSizeToUrl(
                                    imageUrl || defaultDentistProfileImg,
                                    tabletMobileOnly ? 160 : 230
                                )}
                                width="100%"
                                height={props.height}
                                alt={name}
                            />
                        </Box>
                    </Flex>
                    {specialty &&
                        name && (
                            <Box
                                pl={[0, 0, 18]}
                                pt={10}
                                width="100%"
                                minHeight="70px"
                                borderRadius="4px"
                                position={['static', '', 'absolute']}
                                bottom="0"
                                bg={[
                                    'background.transparent',
                                    '',
                                    'rgba(0, 0, 0, 0.7)',
                                ]}
                            >
                                <Text
                                    fontSize={0}
                                    fontWeight="bold"
                                    color="text.gray"
                                    lineHeight="1"
                                    letterSpacing="-0.5px"
                                    mb={4}
                                >
                                    <Truncate lines={1}>{specialty}</Truncate>
                                </Text>
                                <Text
                                    fontSize={[1, 1, 3]}
                                    color={['text.black', '', 'text.white']}
                                    lineHeight="1"
                                    letterSpacing="-0.5px"
                                    mb={4}
                                >
                                    <Truncate lines={1}>{name}</Truncate>
                                </Text>
                                <Flex>
                                    <Rating
                                        fontSize="8px"
                                        disabled
                                        value={averageRating}
                                    />
                                    <Text
                                        ml={6}
                                        fontSize={0}
                                        fontWeight="medium"
                                        color={['text.black', '', 'text.white']}
                                        lineHeight="1"
                                        letterSpacing="-0.6px"
                                    >
                                        ({numReviews})
                                    </Text>
                                </Flex>
                            </Box>
                        )}
                </Box>
            </Box>
        </Link>
    );
};

export default withScreenSizes(CarouselLinkCard);
