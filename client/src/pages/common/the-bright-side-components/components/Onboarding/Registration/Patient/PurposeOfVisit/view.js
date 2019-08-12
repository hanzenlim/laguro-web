import { Flex } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding from '../../..';
import AppointmentIcon from '../../../Assets/appointmentIcon';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';

class PurposeOfVisitSelectionView extends React.PureComponent {
    render() {
        const formatText = getFormatTextFromProps(this.props);

        return (
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
            >
                <AppointmentIcon />
                <Onboarding.StepTitleText
                    text={formatText('registration.likeTodo.likeTodo')}
                />
                <Onboarding.StepBlurbText
                    text={formatText('registration.likeTodo.wantTodo')}
                />

                <Onboarding.Choices
                    formKey="purposeOfVisit"
                    namesAndTexts={[
                        {
                            name: 'walkIn',
                            text: formatText('registration.likeTodo.walkIn'),
                        },
                        {
                            name: 'checkIn',
                            text: formatText('registration.likeTodo.checkIn'),
                        },
                    ]}
                    {...this.props}
                />
                <Onboarding.NextButton
                    onClick={() => {
                        this.props.formikProps.submitForm();
                    }}
                />
            </Flex>
        );
    }
}

export default injectIntl(PurposeOfVisitSelectionView);
