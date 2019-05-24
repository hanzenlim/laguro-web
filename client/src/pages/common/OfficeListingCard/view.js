import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Flex,
    Rating,
    Text,
    Button,
    Truncate,
} from '@laguro/basic-components';
import { FilestackImage } from '../../../components';
import { getIdFromFilestackUrl } from '../../../util/imageUtil';
import { getEquipmentColor } from '../../../util/tagUtils';

const StyledCard = styled(Card)`
    && {
        .ant-card-body {
            padding: 0;
        }
    }

    && {
        box-shadow: 1px 1px 12px 0 rgba(0, 0, 0, 0.06),
            -1px -1px 12px 0 rgba(0, 0, 0, 0.06);
        border: none;
        width: 100%;
    }
`;

const StyledRating = styled(Rating)`
    && i {
        font-size: 15px;
    }
`;

const DefaultCursorButton = styled(Button)`
    && {
        cursor: default;
        border: 0;
        vertical-align: middle;
    }
`;

class OfficeListingCard extends Component {
    render() {
        const { office, onRedirect, showMap } = this.props;

        return (
            <Flex
                width="100%"
                style={{ cursor: 'pointer' }}
                onClick={onRedirect}
            >
                <StyledCard showMap={showMap}>
                    <Box>
                        <Flex
                            flexDirection={
                                showMap ? 'column' : ['column', '', 'row']
                            }
                            m={0}
                            height={showMap ? '100%' : ['100%', '', 215]}
                        >
                            <Box
                                display="block"
                                width={showMap ? '100%' : ['100%', '', 317]}
                                height={showMap ? 262 : [242, '', 213]}
                                position="relative"
                                overflow="hidden"
                            >
                                <FilestackImage
                                    handle={getIdFromFilestackUrl(office.image)}
                                    alt={office.title}
                                    sizes={{
                                        fallback: '250px',
                                    }}
                                    formats={['webp', 'pjpg']}
                                />
                            </Box>
                            <Box
                                width="100%"
                                px={showMap ? 20 : [20, '', 27]}
                                py={showMap ? 12 : [12, '', 27]}
                                flex={1}
                            >
                                <Box textAlign="left">
                                    <Text
                                        fontWeight="bold"
                                        fontSize={20}
                                        lineHeight="24px"
                                        mb={4}
                                    >
                                        {office.title}
                                    </Text>
                                    <Flex alignItems="center" lineHeight="15px">
                                        <StyledRating
                                            disabled={true}
                                            value={office.rating}
                                        />
                                        <Text ml={6} mt={4} fontSize="12px">
                                            {office.numReviews &&
                                            office.numReviews !== 0
                                                ? `(${office.numReviews})`
                                                : ''}
                                        </Text>
                                    </Flex>
                                    <Text
                                        mt={8}
                                        mb={12}
                                        fontSize={0}
                                        color="text.gray"
                                        style={{ whiteSpace: 'initial' }}
                                    >
                                        {office.address}
                                    </Text>
                                    {office.equipment.length > 0 && (
                                        <Box
                                            maxHeight={
                                                showMap ? 48 : [48, '', 20]
                                            }
                                            overflow="hidden"
                                            mb={showMap ? 0 : 12}
                                        >
                                            {office.equipment.map(eq => (
                                                <DefaultCursorButton
                                                    key={eq.name}
                                                    type="ghost"
                                                    height="auto"
                                                >
                                                    <Box
                                                        bg={getEquipmentColor(
                                                            eq.name
                                                        )}
                                                        borderRadius="20px"
                                                        mr={4}
                                                        mb={6}
                                                        px={12}
                                                    >
                                                        <Text
                                                            textTransform="capitalize"
                                                            fontWeight="medium"
                                                            color="text.white"
                                                            lineHeight="20px"
                                                            fontSize="10px"
                                                        >
                                                            {eq.name}
                                                        </Text>
                                                    </Box>
                                                </DefaultCursorButton>
                                            ))}
                                        </Box>
                                    )}
                                </Box>

                                <Text
                                    style={{ 'white-space': 'pre-line' }}
                                    fontSize={3}
                                    lineHeight="23px"
                                    letterSpacing={0}
                                    textAlign="left"
                                    fontWeight="300"
                                    display={
                                        showMap
                                            ? 'none'
                                            : ['none', 'none', 'block']
                                    }
                                >
                                    {office.subtitle ? (
                                        <Truncate lines={2}>
                                            {office.subtitle || ''}
                                        </Truncate>
                                    ) : (
                                        'No available description'
                                    )}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                </StyledCard>
            </Flex>
        );
    }
}

OfficeListingCard.propTypes = {
    office: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        address: PropTypes.string,
        rating: PropTypes.number,
        numReviews: PropTypes.number,
        equipment: PropTypes.array,
        subtitle: PropTypes.string,
    }),
    onRedirect: PropTypes.func,
};

export default OfficeListingCard;
