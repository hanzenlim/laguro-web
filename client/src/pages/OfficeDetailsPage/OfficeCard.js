import React from 'react';
import defaultDentistProfileImg from '../../components/Image/default_dentist_profile_img_square.svg';
import {
    Box,
    Image,
    Rating,
    Text,
    Link,
    FilestackImage,
} from '../../components';
import { withScreenSizes } from '../../components/Responsive';
import { getIdFromFilestackUrl } from '../../util/imageUtil';
import theme from '../../components/theme';

const OfficeCard = props => {
    const { image, name, url, rating, address } = props;

    return (
        <Box
            width="100%"
            mb={[4, '', 0]}
            border="1px solid"
            borderColor="divider.gray"
        >
            <Link type="ghost" to={url}>
                <Box height={[108, '', 160]}>
                    {image && image.includes('filestack') ? (
                        <FilestackImage
                            handle={getIdFromFilestackUrl(image)}
                            alt={name}
                            sizes={{
                                [`(min-width: ${
                                    theme.breakpoints[1]
                                })`]: '196px',
                                [`(min-width: ${
                                    theme.breakpoints[0]
                                })`]: '228px',
                                fallback: '350px',
                            }}
                            formats={['webp', 'pjpg']}
                        />
                    ) : (
                        <Image
                            src={defaultDentistProfileImg}
                            alt={name}
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    )}
                </Box>
                <Box
                    px={12}
                    pt={[2, '', 13]}
                    pb={[28, '', 30]}
                    textAlign="center"
                >
                    <Text
                        fontSize={[1, '', 3]}
                        lineHeight="18px"
                        py={8}
                        letterSpacing={['-0.35px', '', '-0.46px']}
                    >
                        {name}
                    </Text>
                    <Box mb={10}>
                        <Rating
                            disabled
                            fontSize={['16px', '', '24px']}
                            value={rating}
                        />
                    </Box>
                    <Text
                        fontSize={[0, '', 2]}
                        color="text.lightGray"
                        lineHeight={['14px', '', '19px']}
                        letterSpacing="0px"
                    >
                        {address}
                    </Text>
                </Box>
            </Link>
        </Box>
    );
};

OfficeCard.defaultProps = {
    url: '#',
};

export default withScreenSizes(OfficeCard);
