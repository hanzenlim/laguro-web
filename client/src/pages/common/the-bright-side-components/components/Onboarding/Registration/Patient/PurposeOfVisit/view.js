import { Flex } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding from '../../..';
import AppointmentIcon from '../../../Assets/appointmentIcon';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';

const REGISTRATION_LIKETODO_LIKETODO = 'registration.likeTodo.likeTodo';
const REGISTRATION_LIKETODO_WANTTODO = 'registration.likeTodo.wantTodo';
const REGISTRATION_LIKETODO_WALKIN = 'registration.likeTodo.walkIn';
const REGISTRATION_LIKETODO_CHECKIN = 'registration.likeTodo.checkIn';

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
                    text={formatText(REGISTRATION_LIKETODO_LIKETODO)}
                />
                <Onboarding.StepBlurbText
                    text={formatText(REGISTRATION_LIKETODO_WANTTODO)}
                />

                <Onboarding.Choices
                    formKey="purposeOfVisit"
                    namesAndTexts={[
                        {
                            name: 'walkIn',
                            text: formatText(REGISTRATION_LIKETODO_WALKIN),
                        },
                        {
                            name: 'checkIn',
                            text: formatText(REGISTRATION_LIKETODO_CHECKIN),
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
