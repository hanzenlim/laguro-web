import React from 'react';

import {
    Box,
    Flex,
    Image,
    Rating,
    Text,
    Responsive,
} from '../../../components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';

const { TabletMobile } = Responsive;

const TopBlock = ({ dentist }) => (
    <Flex>
        <TabletMobile>
            <Image
                src={dentist.imageUrl || defaultUserImage}
                alt={`Dr. ${dentist.name}`}
                width={46}
                height={46}
                borderRadius="50%"
                mr={17}
            />
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
                mb={[8, '', 4]}
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
                    <Rating
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
);

export default TopBlock;