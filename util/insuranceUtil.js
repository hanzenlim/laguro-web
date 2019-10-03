import { payerList } from '~/data/supportedPayerList';

export const getInsuranceText = key => {
    const insurance = payerList.find(item => item.id === key);
    return insurance ? insurance.name : '';
};
