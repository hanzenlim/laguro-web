import React from 'react';

import { Box, Rating, Text, Image, FilestackImage } from '../../../components';
import theme from '../../../components/theme';
import defaultDentistProfileImg from '../../../components/Image/default_dentist_profile_img_square.svg';
import { getIdFromFilestackUrl } from '../../../util/imageUtil';

const DentistCard = props => {
    const { rating, image, name, specialty, numReviews } = props;

    return (
        <Box width="100%" textAlign="center">
            <Box
                borderRadius="50%"
                width={[74, '', 128]}
                height={[74, '', 128]}
                mx="auto"
                mb={[6, '', 13]}
                overflow="hidden"
            >
                {image && image.includes('filestack') ? (
                    <FilestackImage
                        handle={getIdFromFilestackUrl(image)}
                        alt={name}
                        sizes={{
                            [`(min-width: ${theme.breakpoints[1]})`]: '128px',
                            [`(min-width: ${theme.breakpoints[0]}px)`]: '74px',
                            fallback: '74px',
                        }}
                        formats={['webp', 'pjpg']}
                    />
                ) : (
                    <Image src={image} alt={name} width="100%" height="100%" />
                )}
            </Box>

            <Text
                fontWeight="bold"
                fontSize={[0, '', 1]}
                color="#adadad"
                lineHeight="34px"
                letterSpacing={['-0.3px', '', '-0.35px']}
                textTransform="uppercase"
            >
                {specialty}
            </Text>

            <Text
                fontSize={[1, '', 3]}
                letterSpacing={['-0.35px', '', '-0.46px']}
            >
                {name}
            </Text>

            <Rating
                fontSize={[16, '', 18]}
                value={rating}
                disabled
                mb={[6, '', 10]}
            />
            {numReviews && <Text fontSize={[0, '', 1]}>{numReviews}</Text>}
        </Box>
    );
};

DentistCard.defaultProps = {
    name: 'DR. Michelle Choi',
    specialty: 'implant specialista',
    numReviews: '20 reviews',
    rating: 2.5,
    image: defaultDentistProfileImg,
};

export default DentistCard;
