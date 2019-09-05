import { allInsuranceList } from '../staticData';

export const getInsuranceText = key => {
    const insurance = allInsuranceList.find(item => item.id === key);
    return insurance ? insurance.name : '';
};

export const getInsuranceId = key => {
    const insurance = allInsuranceList.find(item => item.name === key);
    return insurance ? insurance.id : '';
};
