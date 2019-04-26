import React from 'react';

import { Box, Rating, Text, Image } from '../../../components';
import defaultDentistProfileImg from '../../../components/Image/default_dentist_profile_img_square.svg';

const DentistCard = props => {
    const { rating, image, name, specialty, numReviews } = props;

    return (
        <Box
            width="100%"
            textAlign="center"
        >
            <Image
                borderRadius="50%"
                width={[74, '', 128]}
                height={[74, '', 128]}
                src={image}
                alt={name}
                mx="auto"
                mb={[6, '', 13]}
            />

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
            {numReviews && (
                <Text fontSize={[0, '', 1]}>
                    {numReviews}
                </Text>
            )}
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
