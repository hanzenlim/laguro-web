import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { Box, Text, Flex, Button } from '../../../components';

const StyledButton = styled(Button)`
    &&.ant-btn {
        border-radius: 32px;
    }
`;

const ResultCard = ({
    name,
    group,
    price,
    proceduresDetail,
    coverage,
    deductibleRemaining,
    annualMaximumRemaining,
    outOfPocket,
    history,
}) => (
    <Box
        maxWidth={[316, 377, '']}
        width="100%"
        mx="auto"
        px={[6, '', 17]}
        position="relative"
    >
        <Text
            px={18}
            py={6}
            mx="auto"
            mb={-16}
            color="text.white"
            bg="#9e84ff"
            borderRadius={15}
            position="relative"
            width="fit-content"
            className="title-tag"
        >
            {name}
        </Text>

        <Box className="inactive-box-text" textAlign="center">
            <Text fontSize="11px" mb={12}>
                Click to see price breakdown for:
            </Text>
            <Text
                px={18}
                py={6}
                mx="auto"
                mb={-16}
                color="text.white"
                bg="#9e84ff"
                borderRadius={15}
                position="relative"
                width="fit-content"
            >
                {name}
            </Text>
        </Box>

        <Box
            bg="background.white"
            borderRadius={9}
            p={22}
            className="white-box"
        >
            <Flex justifyContent="space-between" mb={8}>
                <Text fontSize={0} fontWeight="medium">
                    Estimated price for {group}
                </Text>
                <Text fontSize={0} fontWeight="medium">
                    {price}
                </Text>
            </Flex>
            <Box mb={8} pl={20} is="ul">
                {proceduresDetail.map(item => (
                    <Text
                        key={item.code}
                        color="text.gray"
                        fontSize="10px"
                        mb={4}
                        is="li"
                    >
                        {item.name}
                    </Text>
                ))}
            </Box>
            <Flex justifyContent="space-between" mb={8}>
                <Text fontSize={0} fontWeight="medium">
                    Insurance coverage
                </Text>
                <Text fontSize={0} fontWeight="medium" color="#b11f29">
                    {coverage}
                </Text>
            </Flex>
            <Box mb={8} pl={10}>
                <Flex justifyContent="space-between" mb={4}>
                    <Text color="text.gray" fontSize="10px">
                        Deductable
                    </Text>
                    <Text color="text.gray" fontSize="10px">
                        {deductibleRemaining}
                    </Text>
                </Flex>
                <Flex justifyContent="space-between" mb={4}>
                    <Text color="text.gray" fontSize="10px">
                        Remaining annual coverage
                    </Text>
                    <Text color="text.gray" fontSize="10px">
                        {annualMaximumRemaining}
                    </Text>
                </Flex>
            </Box>
            <Box borderTop="2px solid" borderColor="divider.gray" mb={5} />

            <Box textAlign="right" mb={20}>
                <Text fontWeight="medium" fontSize={2} is="span">
                    Out-of-pocket cost* :
                </Text>
                <Text
                    fontWeight="medium"
                    fontSize={2}
                    color="text.blue"
                    ml={10}
                    is="span"
                >
                    {outOfPocket}
                </Text>
            </Box>

            <Text fontSize="10px" fontWeight="light">
                *This is an estimation based on the insurance input. Actual
                coverage pricing may differ.
            </Text>

            <StyledButton
                type="primary"
                maxWidth="100%"
                width={260}
                height={50}
                mx="auto"
                mt={30}
                px={35}
                fontWeight="medium"
                fontSize={1}
                style={{ whiteSpace: 'initial', display: 'block' }}
                onClick={() => history.push('/dentist/search')}
            >
                See dentists available for this procedure
            </StyledButton>
        </Box>
    </Box>
);

ResultCard.propTypes = {
    name: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    proceduresDetail: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            code: PropTypes.string,
        })
    ).isRequired,
    coverage: PropTypes.string.isRequired,
    deductibleRemaining: PropTypes.string.isRequired,
    annualMaximumRemaining: PropTypes.string.isRequired,
    outOfPocket: PropTypes.string.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(ResultCard);
