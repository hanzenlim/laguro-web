import React from 'react';
import PropTypes from 'prop-types';
import { renderPrice } from '~/util/paymentUtil';

import { Text, Box, Grid } from '~/components';

const WalletDetails = ({
    details: {
        pendingAmount,
        laguroCreditAmount,
        availableAmount,
        totalAmount,
    },
}) => {
    const data = [
        { head: 'Pending', value: pendingAmount },
        { head: 'Credits', value: laguroCreditAmount },
        { head: 'Available', value: availableAmount },
        { head: 'Total', value: totalAmount },
    ];
    return (
        <Box
            borderRadius={4}
            px={20}
            py={[20, '', 6]}
            mb={28}
            boxShadow="0 2px 6px 1px rgba(0, 0, 0, 0.09)"
            textAlign="center"
        >
            <Grid gridTemplateColumns="repeat(4, 1fr)">
                {data.map(({ head }, index) => (
                    <Text
                        key={head}
                        p={[6, '', 14]}
                        fontSize={[0, '', 2]}
                        fontWeight={
                            index === data.length - 1 ? 'bold' : 'medium'
                        }
                        borderBottom="1px solid"
                        borderColor="divider.gray"
                    >
                        {head}
                    </Text>
                ))}
            </Grid>

            <Grid gridTemplateColumns="repeat(4, 1fr)">
                {data.map(({ head, value }, index) => (
                    <Text
                        key={head}
                        fontSize={[0, '', 2]}
                        p={[6, '', 14]}
                        fontWeight={
                            index === data.length - 1 ? 'bold' : 'light'
                        }
                        {...(head === 'Total' && { color: 'text.blue' })}
                    >
                        {renderPrice(value)}
                    </Text>
                ))}
            </Grid>
        </Box>
    );
};

WalletDetails.propTypes = {
    details: PropTypes.shape({
        pendingAmount: PropTypes.number,
        laguroCreditAmount: PropTypes.number,
        availableAmount: PropTypes.number,
        totalAmount: PropTypes.number,
    }).isRequired,
};

export default WalletDetails;
