import { payerList } from '../staticData/supportedPayerList'

export const getInsuranceText = key => {
  const insurance = payerList.find(item => item.id === key);
  return insurance.name;
}
