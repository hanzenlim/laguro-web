import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import defaultOfficeImage from '../../../components/Image/office-placeholder.png';
import {
    Box,
    Button,
    Card,
    Flex,
    Image,
    Rating,
    Text,
} from '@laguro/basic-components';

const TAG_COLORS = [
    'background.blue',
    'background.yellow',
    'background.orange',
    'background.darkBlue',
];

const StyledCard = styled(Card)`
    && {
        .ant-card-body {
            padding: 0;
        }
    }
`;

const OfficeListingCard = ({ office, onRedirect }) => (
    <Button type="ghost" height="auto" width="100%" onClick={onRedirect}>
        <StyledCard>
            <Box>
                <Flex flexDirection={['column', 'row']} m={0}>
                    <Box display="block" width={['100%', 288]}>
                        <Image
                            src={office.image || defaultOfficeImage}
                            width="100%"
                            height="100%"
                        />
                    </Box>
                    <Box width="100%" ml={[0, 10]} p={[10, 12]}>
                        <Flex>
                            <Flex
                                flexDirection="column"
                                alignItems="flex-start"
                            >
                                <Flex
                                    mb={4}
                                    alignItems={['flex-start', 'center']}
                                    flexDirection={['column', 'row']}
                                >
                                    <Text
                                        fontWeight="bold"
                                        fontSize={['14px', '20px']}
                                        mr={14}
                                        color="#303449"
                                    >
                                        {office.title}
                                    </Text>
                                </Flex>
                                <Flex alignItems="flex-end" lineHeight="15px">
                                    <Rating
                                        disabled={true}
                                        fontSize={['12px', '15px']}
                                        value={office.rating}
                                    />
                                    <Text ml={6} fontSize="12px">
                                        {office.numReviews &&
                                            `(${office.numReviews.toString()})`}
                                    </Text>
                                </Flex>
                                <Text
                                    mb={8}
                                    fontSize="12px"
                                    color="#9b9b9b"
                                    fontWeight="normal"
                                    textTransform="uppercase"
                                >
                                    {office.address}
                                </Text>
                            </Flex>
                        </Flex>

                        {!_isEmpty(office.equipment) &&
                            office.equipment.length && (
                                <Flex flexWrap="wrap" mb={6} mt={10}>
                                    {office.equipment.map((equip, index) => (
                                        <Box
                                            bg={TAG_COLORS[index % 4]}
                                            px={16}
                                            borderRadius="19.5px"
                                            mr="6px"
                                            mb="6px"
                                        >
                                            <Text
                                                color="text.white"
                                                lineHeight="20px"
                                                fontSize={['10px', '12px']}
                                            >
                                                {equip}
                                            </Text>
                                        </Box>
                                    ))}
                                </Flex>
                            )}

                        <Text
                            style={{ 'white-space': 'pre-line' }}
                            fontSize={['10px', '14px']}
                            textAlign="left"
                            fontWeight="300"
                            display={['none', 'block']}
                        >
                            {office.subtitle
                                ? office.subtitle
                                : 'No available description'}
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </StyledCard>
    </Button>
);

OfficeListingCard.propTypes = {
    office: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        address: PropTypes.string,
        rating: PropTypes.number,
        numReviews: PropTypes.number,
        equipment: PropTypes.arrayOf(PropTypes.string),
        subtitle: PropTypes.string,
    }),
    onRedirect: PropTypes.func,
};

export default OfficeListingCard;
