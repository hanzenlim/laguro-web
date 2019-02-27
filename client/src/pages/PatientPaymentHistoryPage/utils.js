export const getOutstandingPaymentText = (quantity, frequency) =>
    `${quantity} ${frequency}ly outstanding payment${
        quantity !== 1 ? 's' : ''
    }`;
