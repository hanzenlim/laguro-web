import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';

import { Flex, Box, Text, Rating, Button } from '../../../components';
import { formatAddress } from '../../../util/styleUtil';
import { withScreenSizes } from '../../../components/Responsive';
import { getEquipmentColor } from '../../../util/tagUtils';

const DefaultCursorButton = styled(Button)`
    && {
        cursor: default;
    }
`;

class OfficeDetailsView extends PureComponent {
    render() {
        const { data, tabletMobileOnly } = this.props;

        return (
            <Box>
                <Box textAlign={['left', '', 'center']} mb={[50, '', 40]}>
                    <Text
                        is="h1"
                        color="text.black"
                        fontSize={[4, '', 5]}
                        lineHeight="34px"
                        letterSpacing={['-0.51px', '', '-0.76px']}
                        m={0}
                    >
                        {data.officeName}
                    </Text>
                    <Text
                        fontSize={[0, '', 4]}
                        fontWeight="light"
                        lineHeight={['24px', '', '34px']}
                        letterSpacing={['-0.3px', '', '-0.76px']}
                    >
                        {formatAddress(
                            _get(data, 'address.name'),
                            _get(data, 'address.addressDetails')
                        )}
                    </Text>
                    <Flex
                        alignItems="center"
                        justifyContent={['flex-start', '', 'center']}
                    >
                        <Rating
                            fontSize={tabletMobileOnly ? '15px' : '18px'}
                            value={data.rating}
                            disabled
                        />
                        <Text
                            ml={10}
                            mt={3}
                            color="text.black"
                            fontSize={[0, '', 1]}
                            lineHeight="17px"
                        >
                            {data.numReviews} reviews
                        </Text>
                    </Flex>
                </Box>

                {data.equipments.length ? (
                    <Box mb={[15, '', 38]}>
                        <Text
                            fontSize={[1, '', 2]}
                            lineHeight="30px"
                            letterSpacing={['0.05px', '', '-0.4px']}
                            fontWeight="medium"
                            mb={[6, '', 13]}
                        >
                            Available equipments
                        </Text>
                        {data.equipments.map((equipment, index) => (
                            <DefaultCursorButton
                                key={index}
                                type="ghost"
                                height="auto"
                            >
                                <Box
                                    px={[12, '', 24]}
                                    bg={getEquipmentColor(equipment.name)}
                                    borderRadius="25px"
                                    mr="6px"
                                    mb="6px"
                                >
                                    <Text
                                        textTransform="capitalize"
                                        fontWeight="medium"
                                        color="text.white"
                                        lineHeight="22px"
                                        fontSize={[0, '', 1]}
                                        letterSpacing={[
                                            '-0.38px',
                                            '',
                                            '-0.4px',
                                        ]}
                                    >
                                        {equipment.name}
                                    </Text>
                                </Box>
                            </DefaultCursorButton>
                        ))}
                    </Box>
                ) : null}

                {data.description && (
                    // Added fixed width to fix bug in rendering truncated text
                    <Box pb={[20, '', 40]}>
                        <Text
                            fontSize={[1, '', 2]}
                            lineHeight={['25px', '', '30px']}
                            letterSpacing={['0.05px', '', '-0.4px']}
                            fontWeight="medium"
                            mb={5}
                        >
                            About the office
                        </Text>
                        <Text
                            style={{ 'white-space': 'pre-line' }}
                            fontSize={[0, '', 1]}
                            lineHeight="26px"
                            letterSpacing="-0.51px"
                        >
                            {data.description}
                        </Text>
                    </Box>
                )}
            </Box>
        );
    }
}

export default withScreenSizes(OfficeDetailsView);
