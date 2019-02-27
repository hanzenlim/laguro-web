import _get from 'lodash/get';

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

export const getPaymentBreakdown = (payment, item) => {
    const invoiceItem = _get(payment, 'invoice.items[0]');

    // total cost of procedure before any calculation
    const originalPrice = _get(invoiceItem, 'originalPrice');
    // total that patient has to pay before considering installments
    const afterInsuranceAndDiscountBeforeInstallmentPlan = _get(
        payment,
        'nominalAmount'
    );

    const discountRate = _get(payment, 'discount.rate');

    const discount =
        _get(payment, 'discount.amount') ||
        (afterInsuranceAndDiscountBeforeInstallmentPlan / (1 - discountRate)) *
            discountRate ||
        0;
    const insuranceCoverage =
        originalPrice -
        afterInsuranceAndDiscountBeforeInstallmentPlan -
        discount;

    const installmentPlan = _get(payment, 'installmentPlan');
    const downPayment = _get(installmentPlan, 'downPaymentAmount');

    const installmentPlanInterval = _get(installmentPlan, 'interval');
    const installmentPlanNumChargePeriods = _get(
        installmentPlan,
        'numChargePeriods'
    );

    switch (item) {
        case 'total':
            return originalPrice || 0;
        case 'discount':
            return discount || 0;
        case 'insuranceCoverage':
            return insuranceCoverage || 0;
        case 'downPayment':
            return downPayment || 0;
        case 'afterInsuranceAndDiscountBeforeInstallmentPlan':
            return afterInsuranceAndDiscountBeforeInstallmentPlan || 0;
        case 'installmentPlanInterval':
            return installmentPlanInterval || 'installment plan interval';
        case 'installmentPlanNumChargePeriods':
            return installmentPlanNumChargePeriods || 0;
        case 'recentPaymentMade':
            return (
                downPayment ||
                afterInsuranceAndDiscountBeforeInstallmentPlan ||
                0
            );
        default:
            return 0;
    }
};
