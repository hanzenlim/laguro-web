import React from 'react';
import PropTypes from 'prop-types';
import { renderPrice } from '../../../util/paymentUtil';

import { Box, Flex, Text } from '../../../components';

const ReviewDetails = ({
    fee,
    amount,
    estimatedArrival,
    fundingSourceName,
}) => {
    const total = amount + fee;

    const details = [
        { title: 'Bank', value: fundingSourceName },
        { title: 'Estimated arrival', value: estimatedArrival },
        { title: 'Fee', value: renderPrice(fee) },
        { title: 'Transfer amount', value: renderPrice(amount) },
        { title: 'Total', value: renderPrice(total) },
    ];
    return (
        <Box>
            {details.map(({ title, value }) => (
                <DetailRow key={title} title={title} value={value} />
            ))}
        </Box>
    );
};

const DetailRow = ({ title, value }) => (
    <Flex
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="divider.gray"
        py={16}
    >
        <Text flex={1} fontWeight="medium" mr={16} fontSize={0}>
            {title}
        </Text>
        <Text flex={1} fontSize={0} textAlign="right">
            {value}
        </Text>
    </Flex>
);

ReviewDetails.propTypes = {
    fundingSourceName: PropTypes.string.isRequired,
    fee: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    estimatedArrival: PropTypes.string.isRequired,
};

export default ReviewDetails;
