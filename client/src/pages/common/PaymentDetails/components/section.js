import React from 'react';
import { Flex, Box, Text } from '../../../../components';

const Section = ({ title, children }) => (
    <Flex
        width={['100%', '', 'unset']}
        flexDirection="column"
        mb={[16, '', 40]}
    >
        <Box
            pb={[8, '', 18]}
            mb={[8, '', 18]}
            borderBottom="1px solid"
            borderColor="divider.darkGray"
            width={['100%', '', 360]}
        >
            <Text
                color="text.gray"
                fontWeight="bold"
                fontSize={[0, '', 4]}
                style={{ textTransform: 'uppercase' }}
            >
                {title}
            </Text>
        </Box>
        {children}
    </Flex>
);

export default Section;
