import { allInsuranceList } from '../staticData';

export const getInsuranceText = key => {
    const insurance = allInsuranceList.find(item => item.id === key);
    return insurance ? insurance.name : '';
};
