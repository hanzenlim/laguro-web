import React from 'react';
import styled from 'styled-components';
import { Box, Text, Flex, Button, Responsive } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';

const OPTION_NUM_TO_DATA = {
    1: { type: '1 chair', assistant: 'Shared assitant', price: 5 },
    2: { type: '1 chair', assistant: 'Shared assitant', price: 10 },
    3: { type: '1 reserved room', assistant: 'Private assitant', price: 15 },
};

const StyledButton = styled(Button)`
    && {
        border-radius: 29px;
    }
`;

const StyledText = styled(Text)`
    writing-mode: vertical-rl;
`;

const { Desktop, TabletMobile } = Responsive;

const ListingPlanComponent = props => {
    const data = OPTION_NUM_TO_DATA[props.option];
    const isSelected = props.option === props.selectedOption;
    return (
        <Flex
            width="100%"
            borderColor="divider.blue"
            border="solid 1px"
            borderRadius="2px"
            flexDirection={['row', '', 'column']}
            justifyContent={['space-between', '', 'unset']}
            alignItems="center"
            onClick={
                props.tabletMobileOnly
                    ? () => props.onSelect(props.option)
                    : () => {}
            }
        >
            <Desktop>
                <Flex
                    width="100%"
                    mb={[10, '', 19]}
                    bg={isSelected && 'background.blue'}
                    height={[30, '', 23]}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text
                        color="text.white"
                        fontSize={0}
                        letterSpacing="-0.34px"
                    >
                        {isSelected && 'SELECTED'}
                    </Text>
                </Flex>
            </Desktop>
            <Flex
                flexDirection="column"
                alignItems={['unset', '', 'center']}
                ml={[23, '', 0]}
                width={[165, '', '100%']}
            >
                <Text
                    mb={[2, '', 4]}
                    mt={[15, '', 0]}
                    fontSize={10}
                    color="text.blue"
                    letterSpacing="1.7px"
                    height={[props.option === 2 ? 'unset' : 0, '', 13]}
                >
                    {props.option === 2 ? 'MOST POPULAR' : ''}
                </Text>
                <Text
                    mb={[5, '', 14]}
                    color={isSelected ? '#245197' : 'text.black'}
                    fontSize={[1, '', 2]}
                    letterSpacing="-0.45px"
                    fontWeight="bold"
                    textAlign={['unset', '', 'center']}
                >
                    Option {props.option}
                </Text>
                <Text fontSize={10} letterSpacing="-0.28px" mb={[5, '', 14]}>
                    This plan comes with:{' '}
                </Text>
                <Box
                    fontSize={10}
                    width="70%"
                    letterSpacing="-0.28px"
                    ml={[-20, '', -15]}
                    mb={[10, '', 31]}
                >
                    <ul>
                        <li>
                            <Text>{data.type}</Text>
                        </li>
                        <li>
                            <Text>{data.assistant}</Text>
                        </li>
                    </ul>
                </Box>
            </Flex>
            <Flex alignItems="center">
                <Text
                    textAlign="center"
                    color={isSelected ? '#245197' : 'text.black'}
                    fontSize={[1, '', 2]}
                    letterSpacing="-0.45px"
                    fontWeight="bold"
                    mb={[10, '', 18]}
                    mr={[17, '', 0]}
                    width={[62, '', 'unset']}
                >
                    ${data.price}/hour
                </Text>
                <TabletMobile>
                    <Flex
                        width={24}
                        bg={isSelected && 'background.blue'}
                        height={145}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StyledText
                            width={18}
                            color="text.white"
                            fontSize={0}
                            letterSpacing="-0.34px"
                        >
                            {isSelected && 'SELECTED'}
                        </StyledText>
                    </Flex>
                </TabletMobile>
            </Flex>
            <Desktop>
                <StyledButton
                    width="calc(100% - 36px)"
                    onClick={() => props.onSelect(props.option)}
                    mb={[15, '', 26]}
                    height={33}
                    fontSize={0}
                    ghost
                >
                    Choose plan
                </StyledButton>
            </Desktop>
        </Flex>
    );
};

export const ListingPlan = withScreenSizes(ListingPlanComponent);
