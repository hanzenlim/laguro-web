// eslint-disable-next-line
export const APPOINTMENT_SCHEDULING_FEE = 2000;

export const removeSpecialChars = price => {
    if (!price) return 0;
    return String(price).replace(/[$.\D]/g, '');
};

export const renderPrice = price => {
    const isNegative = price < 0;
    const formattedPrice = removeSpecialChars(price);
    return `${isNegative ? '-' : ''}$${Math.abs(
        Number(formattedPrice) / 100
    ).toFixed(2)}`;
};

export const renderCents = price => Number(removeSpecialChars(price));
