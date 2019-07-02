import React from 'react';
import styled from 'styled-components';
import {
    Box,
    Flex,
    FilestackImage,
    Image,
    Rating,
    Text,
    Responsive,
} from '../../../components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import { getIdFromFilestackUrl } from '../../../util/imageUtil';

const { TabletMobile } = Responsive;

const ClickableRating = styled(Rating)`
    &&.ant-rate-disabled .ant-rate-star {
        cursor: inherit;
    }
`;

// For Desktop: specialty, name, rating, in orderr
// For tablet and mobile: dentist image, specialty, name, rating, in order
const TopBlock = ({ dentist }) => (
    <Box display="inline-block">
        <Flex>
            <TabletMobile>
                <Box
                    width={46}
                    height={46}
                    borderRadius="50%"
                    mr={17}
                    overflow="hidden"
                >
                    {dentist.imageUrl &&
                    dentist.imageUrl.includes('filestack') ? (
                        <FilestackImage
                            handle={getIdFromFilestackUrl(dentist.imageUrl)}
                            alt={`Dr. ${dentist.name}`}
                            sizes={{
                                fallback: '46px',
                            }}
                            formats={['webp', 'pjpg']}
                        />
                    ) : (
                        <Image
                            src={defaultUserImage}
                            alt={`Dr. ${dentist.name}`}
                            width="100%"
                            height="100%"
                        />
                    )}
                </Box>
            </TabletMobile>
            <Box textAlign="left" flex={1}>
                <Text
                    fontSize={[11, '', 14]}
                    color="text.gray"
                    fontWeight="bold"
                    lineHeight="17px"
                    textTransform="uppercase"
                >
                    {dentist.specialty}
                </Text>
                <Flex
                    alignItems={['flex-start', '', 'center']}
                    flexDirection={['column', '', 'row']}
                >
                    <Text
                        style={{
                            'white-space': 'pre-line',
                        }}
                        fontWeight="bold"
                        fontSize={[1, '', 4]}
                        lineHeight={['17px', '', '24px']}
                        mr={9}
                        color="#303449"
                        textAlign="left"
                    >
                        {dentist.name}
                    </Text>
                    <Flex alignItems="flex-end" lineHeight="15px">
                        <ClickableRating
                            disabled={true}
                            fontSize={[12, '', 15]}
                            value={dentist.averageRating}
                        />
                        <Text ml={6} fontSize={0}>
                            {dentist.numReviews && dentist.numReviews !== 0
                                ? `(${dentist.numReviews})`
                                : ''}
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    </Box>
);

export default TopBlock;
