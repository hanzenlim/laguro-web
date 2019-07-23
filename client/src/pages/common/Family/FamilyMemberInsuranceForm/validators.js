import * as Yup from 'yup';

const YES = 'yes';
const NO = 'no';

const HAS_INSURANCE_FORM_NAME = 'hasInsurance';
const IS_UNDER_PRIMARY_USER_INSURNACE_FORM_ITEM_NAME =
    'isUnderPrimaryUserInsurance';

export const getHasInsuranceYesValidation = validation =>
    Yup.string().when(['hasInsurance', 'hasOwnInsurance'], {
        is: (hasInsurance, hasOwnInsurance) =>
            hasInsurance === YES && hasOwnInsurance === NO,
        then: validation,
    });

export const getIsUnderPrimaryUserInsuranceNoValidation = validation =>
    Yup.string().when(IS_UNDER_PRIMARY_USER_INSURNACE_FORM_ITEM_NAME, {
        is: NO,
        then: validation,
    });

export const getHasInsuranceYesAndIsUnderPrimaryUserInsuranceNoValidation = validation =>
    Yup.string().when(
        [
            HAS_INSURANCE_FORM_NAME,
            IS_UNDER_PRIMARY_USER_INSURNACE_FORM_ITEM_NAME,
        ],
        {
            is: (hasInsurance, isUnderPrimaryUserInsurance) =>
                hasInsurance === YES && isUnderPrimaryUserInsurance === NO,
            then: validation,
        }
    );

export const INSURANCE_PROVIDER_YUP_VALIDATION = Yup.string().required(
    'Insurance provider is required'
);

export const INSURANCE_NUMBER_YUP_VALIDATION = Yup.string().required(
    'Subscriber ID is required'
);

export const policyHolderUserValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please fill out this field.'),
    lastName: Yup.string().required('Please fill out this field.'),
    gender: Yup.string()
        .required('Gender is required')
        .nullable(),
    birthMonth: Yup.string().required('Month is required'),
    birthDate: Yup.string().required('Date is required'),
    birthYear: Yup.string().required('Year is required'),
    address1: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('Postal code is required'),
});

export const policyHolderUser = Yup.object()
    .when(['hasInsurance', 'hasOwnInsurance', 'isUnderPrimaryUserInsurance'], {
        is: (hasInsurance, hasOwnInsurance, isUnderPrimaryUserInsurance) =>
            hasInsurance === YES &&
            hasOwnInsurance === NO &&
            isUnderPrimaryUserInsurance === NO,
        then: policyHolderUserValidationSchema,
    })
    .nullable();

export const insuranceProvider = getHasInsuranceYesAndIsUnderPrimaryUserInsuranceNoValidation(
    INSURANCE_PROVIDER_YUP_VALIDATION
);

export const insuranceNumber = getIsUnderPrimaryUserInsuranceNoValidation(
    INSURANCE_NUMBER_YUP_VALIDATION
);

export const validationSchema = Yup.object().shape({
    [HAS_INSURANCE_FORM_NAME]: Yup.string()
        .required('Please fill out this field.')
        .nullable(),
    [IS_UNDER_PRIMARY_USER_INSURNACE_FORM_ITEM_NAME]: getHasInsuranceYesValidation(
        Yup.string().required('Please fill out this field.')
    ),
    policyHolderUser,
    insuranceProvider,
    insuranceNumber,
});
