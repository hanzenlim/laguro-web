import React from 'react';
import { Box, Flex } from '@laguro/basic-components';
import Onboarding from '../../..';
import InfoIcon from '../../../Assets/infoIcon';

// these names will be used for backend calls as well
const DENTIST_PHOTO_ID_FORM_ITEM_NAME = 'dentistPhotoId';
const WARRANTY_FORM_ITEM_NAME = 'warranty'; // malpractice insurance
const STATE_DENTAL_LICENSE_FORM_ITEM_NAME = 'stateDentalLicense';
const DEA_FORM_ITEM_NAME = 'dea';

class PicturesView extends React.PureComponent {
    render() {
        return (
            <Box width={['100%', '500px', '500px']} px="20px">
                <Flex justifyContent="center">
                    <InfoIcon />
                </Flex>
                <Onboarding.StepTitleText text="Become a verified dentist" />
                <Onboarding.StepBlurbText />
                {/* left-border is getting covered*/}
                <Box ml={1}>
                    <Onboarding.DocumentUploaderInputContainer text="Driver's license">
                        {this.props.renderDocumentUploaderInput({
                            value: this.props.formikProps.values[
                                DENTIST_PHOTO_ID_FORM_ITEM_NAME
                            ] || [{}],
                            onChange: value =>
                                this.props.formikProps.setFieldValue(
                                    DENTIST_PHOTO_ID_FORM_ITEM_NAME,
                                    value
                                ),
                        })}
                    </Onboarding.DocumentUploaderInputContainer>

                    <Onboarding.DocumentUploaderInputContainer>
                        <Onboarding.FormItemLabelText text="Malpractice insurance" />
                        {this.props.renderDocumentUploaderInput({
                            value: this.props.formikProps.values[
                                WARRANTY_FORM_ITEM_NAME
                            ] || [{}],
                            onChange: value =>
                                this.props.formikProps.setFieldValue(
                                    WARRANTY_FORM_ITEM_NAME,
                                    value
                                ),
                        })}
                    </Onboarding.DocumentUploaderInputContainer>

                    <Onboarding.DocumentUploaderInputContainer>
                        <Onboarding.FormItemLabelText text="Dental License" />
                        {this.props.renderDocumentUploaderInput({
                            value: this.props.formikProps.values[
                                STATE_DENTAL_LICENSE_FORM_ITEM_NAME
                            ] || [{}],
                            onChange: value =>
                                this.props.formikProps.setFieldValue(
                                    STATE_DENTAL_LICENSE_FORM_ITEM_NAME,
                                    value
                                ),
                        })}
                    </Onboarding.DocumentUploaderInputContainer>

                    <Onboarding.DocumentUploaderInputContainer>
                        <Onboarding.FormItemLabelText text="Dea" />
                        {this.props.renderDocumentUploaderInput({
                            value: this.props.formikProps.values[
                                DEA_FORM_ITEM_NAME
                            ] || [{}],
                            onChange: value =>
                                this.props.formikProps.setFieldValue(
                                    DEA_FORM_ITEM_NAME,
                                    value
                                ),
                        })}
                    </Onboarding.DocumentUploaderInputContainer>
                </Box>
                <Onboarding.NextButton
                    mb={16}
                    onClick={() => {
                        this.props.formikProps.submitForm();
                    }}
                    loading={this.props.formikProps.isSubmitting}
                >
                    Save and finish
                </Onboarding.NextButton>
                {this.props.formikProps.submitCount !== 0 &&
                    Object.keys(this.props.formikProps.errors).length !== 0 && (
                        <Onboarding.RequiredFieldsMessage
                            text={Object.values(
                                this.props.formikProps.errors
                            )[0].toString()}
                        />
                    )}
            </Box>
        );
    }
}

export default PicturesView;
