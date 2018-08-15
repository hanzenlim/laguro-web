// eslint-disable-next-line
export const APPOINTMENT_SCHEDULING_FEE = 2000;

export const renderPrice = price => {
    const isNegative = price < 0;
    price = removeSpecialChars(price);
    return `${isNegative ? '-' : ''}$${Math.abs(Number(price) / 100).toFixed(
        2
    )}`;
};

export const removeSpecialChars = price => {
    if (!price) return 0;
    return String(price).replace(/[$.\D]/g, '');
};
