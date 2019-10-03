import * as React from 'react';
import Onboarding from '../../..';
import InfoIcon from '../../../Assets/infoIcon';
import { Box, Flex } from '~/components';

const insuranceList = [
    { id: 'METLIFE', text: 'MetLife' },
    { id: 'CIGNA', text: 'Cigna' },
    { id: 'DD_CALIFORNIA', text: 'Delta Dental (CA)' },
    { id: 'GUARDIAN', text: 'Guardian' },
];

class DentistInsuranceView extends React.PureComponent {
    render() {
        return (
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
                width="100%"
            >
                <Flex justifyContent="center">
                    <InfoIcon />
                </Flex>
                <Onboarding.StepTitleText text="Which insurance do you accept?" />
                <Onboarding.StepBlurbText />

                {insuranceList.map(i => {
                    const key = i.id;

                    return (
                        <Onboarding.Checkbox
                            key={key}
                            field={i.text}
                            value={this.props.formikProps.values[key]}
                            onClick={() =>
                                this.props.formikProps.setFieldValue(
                                    key,
                                    !this.props.formikProps.values[key]
                                )
                            }
                        />
                    );
                })}

                <Box height={35} />
                <Onboarding.NextButton
                    onClick={() => {
                        this.props.formikProps.submitForm();
                    }}
                    loading={this.props.formikProps.isSubmitting}
                >
                    Next
                </Onboarding.NextButton>
                {this.props.formikProps.submitCount !== 0 &&
                    Object.keys(this.props.formikProps.errors).length !== 0 && (
                        <Onboarding.RequiredFieldsMessage
                            text={Object.values(
                                this.props.formikProps.errors
                            )[0].toString()}
                        />
                    )}
            </Flex>
        );
    }
}

export default DentistInsuranceView;
