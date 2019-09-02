import { Box, Flex, Text } from '../../../../../../../components';
import * as React from 'react';

export const Progress = props => {
    const { step = 1, percent, steps } = props;

    return (
        <div>
            <Box position="relative" top="0" left="0" right="0">
                <Box
                    left="0"
                    width={`${step * percent}%`}
                    height="3px"
                    background="#3481f8"
                    position="absolute"
                />
                <Flex justifyContent="space-around" width="100%" pt="8px">
                    {steps.map((s, index) => (
                        <Box opacity={s === steps[step - 1] ? 1 : 0.4}>
                            <Text color="#303449">
                                <Box
                                    mr={10}
                                    width={18}
                                    height={18}
                                    display="inline-flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    border="1px solid #303449"
                                    borderRadius="50%"
                                >
                                    <Text color="#303449" fontSize={0}>
                                        {index + 1}
                                    </Text>
                                </Box>
                                {s}
                            </Text>
                        </Box>
                    ))}
                </Flex>
            </Box>
        </div>
    );
};
