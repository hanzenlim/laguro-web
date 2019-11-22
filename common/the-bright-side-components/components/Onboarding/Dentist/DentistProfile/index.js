import * as React from 'react';
import styled from 'styled-components';

import { procedureList } from '~/data';
import { Box, Flex, Grid, Image, Text, TextArea } from '~/components';

import Onboarding from '../..';
import Upload from '../../../Upload';
import Wizard from '../../../Wizard';
import InfoIcon from '../../Assets/infoIcon';
import { SelectLanguage } from '../../SelectLanguage';
import { SelectTime } from '../../SelectTime';

const UploadButton = styled.button`
    padding: 3px;
    height: fit-content;
    font-family: Silka;
    font-size: 12px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -0.4px;
    color: #3481f8;
    border: none;
    background: transparent;
`;

const specialties = [
    'General Dentist',
    'Endodontics',
    'Oral Surgery',
    'Orthodontics',
    'Pedodontics',
    'Periodontics',
    'Prosthodontics',
];

const LANGUAGES_FORM_ITEM_NAME = 'languages';

const Step1 = ({ formikProps, isEditing }) => {
    return (
        <Box mb={30}>
            <Flex flexDirection="column">
                <Flex justifyContent="center">
                    <InfoIcon />
                </Flex>
                <Onboarding.StepTitleText text="Tell us about your dental services" />
                <Onboarding.StepBlurbText text="This information will be shown on your profile page" />

                <Text fontSize={2}>Profile picture</Text>
                <Text color="text.gray">
                    Your profile will show your first name and the first initial
                    of your last name. When you book an appointment, your
                    dentist will see your full name.
                </Text>
                <Box height={20} />
                <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    height="80px"
                >
                    <Box
                        borderRadius="50%"
                        width="80px"
                        height="80px"
                        background="#3481f8"
                        mr={12}
                    >
                        {formikProps.values.profilePicture && (
                            <Image
                                alt="profile photo"
                                borderRadius="50%"
                                width="80px"
                                height="80px"
                                src={formikProps.values.profilePicture}
                            />
                        )}
                    </Box>
                    <Flex>
                        <Upload
                            render={renderProps => {
                                return (
                                    <UploadButton onClick={renderProps.onPick}>
                                        Upload new image
                                    </UploadButton>
                                );
                            }}
                            onSuccess={result => {
                                const upload = result.filesUploaded[0];
                                formikProps.setFieldValue(
                                    'profilePicture',
                                    upload.url
                                );
                            }}
                            value={formikProps.values.profilePicture}
                        />
                    </Flex>
                </Flex>
                <Box height={30} />

                <Text fontSize={2}>Select your dental title</Text>
                <Text color="text.gray">
                    Select the appropriate name that describes your profession
                    best
                </Text>
                <Box width={['100%', '370px', '370px']}>
                    <Onboarding.Select
                        placeholder="General Dentist"
                        value={formikProps.values.key}
                        onSelect={value =>
                            formikProps.setFieldValue('key', value)
                        }
                    >
                        {specialties.map(sp => (
                            <Onboarding.SelectOption value={sp}>
                                {sp}
                            </Onboarding.SelectOption>
                        ))}
                    </Onboarding.Select>
                </Box>
                <Box height={30} />

                <Text fontSize={2}>Default appointment time selection</Text>
                <Text color="text.gray">
                    This selection is for your patients to choose their desired
                    time increments when they book their appointment
                </Text>
                <SelectTime
                    onSelect={time => formikProps.setFieldValue('time', time)}
                    value={formikProps.values.time}
                />
                <Box height={30} />

                <Text fontSize={2}>Which languages do you speak?</Text>
                <Box height={10} />
                <SelectLanguage
                    onSelect={languages =>
                        formikProps.setFieldValue(
                            LANGUAGES_FORM_ITEM_NAME,
                            languages
                        )
                    }
                    value={formikProps.values[LANGUAGES_FORM_ITEM_NAME]}
                />
                <Box height={30} />
                {isEditing && (
                    <React.Fragment>
                        <Text fontSize={2}>Set your unique profile link</Text>
                        <Box height={10} />
                        <Onboarding.Input
                            onChange={e =>
                                formikProps.setFieldValue(
                                    'permalink',
                                    e.target.value
                                )
                            }
                            value={formikProps.values.permalink}
                        />
                        <Box height={30} />
                    </React.Fragment>
                )}

                <Text fontSize={2}>Which procedures do you practice?</Text>
                <Box height={10} />
                <Grid
                    gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
                    gridColumnGap={14}
                >
                    {Object.keys(procedureList).map(p => (
                        <Onboarding.ProcedureCheckbox
                            key={p}
                            disabled={p === 'Exams'}
                            field={p}
                            value={formikProps.values.procedureList[p]}
                            onClick={() =>
                                formikProps.setFieldValue(
                                    `procedureList[${p}]`,
                                    !formikProps.values.procedureList[p]
                                )
                            }
                        />
                    ))}
                </Grid>

                <Box height={35} />

                <Onboarding.NextButton
                    onClick={() => {
                        formikProps.submitForm();
                    }}
                />
                {formikProps.submitCount !== 0 &&
                    Object.keys(formikProps.errors).length !== 0 && (
                        <Onboarding.RequiredFieldsMessage />
                    )}
            </Flex>
        </Box>
    );
};

const Step2 = ({ formikProps }) => (
    <Box mb={30}>
        <Flex flexDirection="column">
            <Flex justifyContent="center">
                <InfoIcon />
            </Flex>
            <Onboarding.StepTitleText text="Introduce yourself!" />
            <Onboarding.StepBlurbText text="You are our superstar and we love learning cool details about our dentists." />

            <Onboarding.FormItemLabelText text="Tell us about yourself" />
            <TextArea
                placeholder="Laguro believes in establishing great connections and developing fundamental relationships. Use this space to introduce yourself to your prospective patients and other dentists.

Tell them about your professional background: Where did you obtain your credentials? When/where did you start your practice?

Tell them about you: Where are you currently practicing? What kind of procedures do you offer? What do you like to do on your spare time?
"
                value={formikProps.values.about}
                onChange={value =>
                    formikProps.setFieldValue('about', value.target.value)
                }
                height={356}
            />

            <Box height={35} />

            <Onboarding.NextButton onClick={() => formikProps.submitForm()} />
        </Flex>
    </Box>
);

const render = props => {
    let Step = null;

    switch (props.actions.currentStep) {
        case '1':
            Step = Step1;
            break;
        case '2':
            Step = Step2;
            break;
        default:
            Step = Step1;
    }

    return (
        <Box width={['100%', '100%', '620px']} mx="auto" mt="100px" px="20px">
            <Step {...props} />
        </Box>
    );
};

export const DentistProfile = ({ onSubmit, steps, isEditing }) => (
    <Wizard
        onSubmit={onSubmit}
        Form="form"
        render={props => (
            <Flex width="100%" flexDirection="column" position="relative">
                {props.actions.canGoBack && (
                    <Onboarding.PreviousButton
                        goToPreviousStep={props.actions.goToPreviousStep}
                    />
                )}
                {render({ ...props, isEditing })}
            </Flex>
        )}
        steps={steps}
    />
);

export default DentistProfile;
