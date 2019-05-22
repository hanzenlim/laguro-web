import React, { PureComponent } from 'react';
import { Box, Flex, Text } from '@laguro/basic-components';
import _isEmpty from 'lodash/isEmpty';
import { getProcedureColor } from '../../../util/dentistUtils';

class Procedures extends PureComponent {
    render() {
        const { procedures } = this.props;

        return (
            !_isEmpty(procedures) &&
            procedures.length && (
                <Box mb={[10, '', 20]}>
                    <Flex flexWrap="wrap">
                        {procedures.map(procedure => (
                            <Box
                                bg={getProcedureColor(procedure)}
                                px={[12, '', 16]}
                                py="3px"
                                borderRadius={['15.5px', '', '19.5px']}
                                mr="6px"
                                mb="6px"
                            >
                                <Text
                                    color="text.white"
                                    lineHeight="normal"
                                    fontSize={['10px', '', '12px']}
                                >
                                    {procedure}
                                </Text>
                            </Box>
                        ))}
                    </Flex>
                </Box>
            )
        );
    }
}

export default Procedures;
