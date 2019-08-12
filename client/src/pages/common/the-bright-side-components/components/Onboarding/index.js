import {
    Box,
    Button,
    Checkbox as LaguroCheckbox,
    Flex,
    Grid,
    Image,
    Rating,
    Select as BasicComponentsSelect,
    Text,
} from '@laguro/basic-components';
import _get from 'lodash/get';
import * as React from 'react';
import styled from 'styled-components';
import PreviousIcon from './Assets/previousIcon';
import BasicComponentsInput from './Input';
import { getFormatTextFromProps } from '../../../../../util/intlUtils';
import { injectIntl } from 'react-intl';

export const LastMargin = 43;
const InputSelectHeight = 46;
const FormItemMarginBottom = 15;
const NextButtonMarginTop = LastMargin - FormItemMarginBottom;

const FormItem = ({ children }) => (
    <Box mb={FormItemMarginBottom} width={['100%', 'auto', 'auto']}>
        {children}
    </Box>
);

const StyledFlex = props => (
    <Flex
        width="100%"
        borderRadius=" 4px"
        boxShadow="0 2px 7px 0 rgba(207, 218, 235, 0.25)"
        height="100%"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        bg="white"
        {...props}
    />
);

const StyledTruncatedText = styled(Text)`
    text-overflow: clip;
    white-space: pre-line;
`;

const StyledDocumentUploaderFlex = styled(Flex)`
    && {
        .documentSelect-documentPreview {
            width: 184px;
        }

        .documentSelect-documentUploadSelector {
            margin: 0;
        }
    }
`;

const StyledLaguroCheckbox = styled(LaguroCheckbox)`
    && {
        .ant-checkbox-disabled .ant-checkbox-inner {
            background-color: #f5f5f5;
        }
        .ant-checkbox-inner:after {
            /* top: 44%;
          left: 3px;
          * commenting this out will generate misaligned
          * checkbox in storybook but correct on laguro app
          */
        }
    }
`;

const StyledNavButtonText = styled(Text)`
    && {
        width: 99px;
        height: 17px;
        font-family: Silka;
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #3481f8;
    }
`;

const OnboardingCheckbox = props => {
    const { field, value, onClick, width } = props;

    return (
        <Button
            key="key"
            type="ghost"
            height="auto"
            onClick={onClick}
            style={{ textAlign: 'left' }}
            width={['100%', 'auto', 'auto']}
        >
            <Box
                width={['100%', width || '329px', width || '329px']}
                height="auto"
                min-height="46px"
                border-radius="4px"
                box-shadow="0 2px 7px 0 rgba(207, 218, 235, 0.25)"
                border="1px solid"
                borderColor="#dfe0e2"
                background="white"
                pt={12}
                pl={14}
                pb={8}
            >
                <Flex height="100%" alignItems="center">
                    <Box height="18px" width="18px">
                        <StyledLaguroCheckbox checked={value} />
                    </Box>
                    <Text ml="20px" mb={5} width="80%" lineHeight="1.2">
                        <StyledTruncatedText>{field}</StyledTruncatedText>
                    </Text>
                </Flex>
            </Box>
        </Button>
    );
};

const Choices = props => {
    const {
        formKey,
        namesAndTexts,
        size = 'large',
        submitOnClick = true,
    } = props;
    const hasError =
        props.formikProps.touched[formKey] && props.formikProps.errors[formKey];

    return (
        <fieldset>
            <FormItem>
                <Flex>
                    <Box m="auto">
                        <Grid
                            m="auto"
                            gridTemplateColumns={
                                namesAndTexts.length > 2
                                    ? [
                                          'auto',
                                          'auto '.repeat(namesAndTexts.length),
                                      ]
                                    : 'auto '.repeat(namesAndTexts.length)
                            }
                            gridColumnGap="11px"
                            gridRowGap="10px"
                        >
                            {namesAndTexts.map(nameAndText => (
                                <Button
                                    height={size === 'large' ? '104px' : '46px'}
                                    width="159px"
                                    type="ghost"
                                    onClick={async () => {
                                        await props.formikProps.setFieldValue(
                                            formKey,
                                            nameAndText.name
                                        );
                                        if (submitOnClick) {
                                            props.formikProps.submitForm();
                                        }
                                    }}
                                >
                                    <StyledFlex
                                        borderColor={
                                            hasError
                                                ? 'red'
                                                : props.formikProps.values[
                                                      formKey
                                                  ] === nameAndText.name
                                                ? '#3481f8'
                                                : '#dfe0e2'
                                        }
                                    >
                                        <Text
                                            width={100}
                                            fontSize={[1, 2, '']}
                                            color="#9b9b9b"
                                            lineHeight="1.2"
                                        >
                                            <StyledTruncatedText>
                                                {nameAndText.text}
                                            </StyledTruncatedText>
                                        </Text>
                                    </StyledFlex>
                                </Button>
                            ))}
                        </Grid>
                        {hasError && (
                            <Onboarding.ValidationMessage
                                text={props.formikProps.errors[formKey]}
                            />
                        )}
                    </Box>
                </Flex>
            </FormItem>
        </fieldset>
    );
};

const ChoicesField = props => {
    const { field, form, namesAndTexts, size } = props;
    const hasError = form.touched[field.name] && form.errors[field.name];
    const errorMessage = form.errors[field.name];

    return (
        <Box className={hasError ? 'has-error' : ''} mb={FormItemMarginBottom}>
            <Grid
                m="auto"
                gridTemplateColumns={
                    namesAndTexts.length > 2
                        ? ['auto', 'auto '.repeat(namesAndTexts.length)]
                        : 'auto '.repeat(namesAndTexts.length)
                }
                gridColumnGap="11px"
                gridRowGap="10px"
            >
                {namesAndTexts.map(nameAndText => (
                    <Button
                        height={size === 'large' ? '104px' : '60px'}
                        width={['100%', '', '159px']}
                        type="ghost"
                        onClick={() =>
                            form.setFieldValue(field.name, nameAndText.name)
                        }
                    >
                        <StyledFlex
                            borderColor={
                                hasError
                                    ? 'red'
                                    : field.value === nameAndText.name
                                    ? '#3481f8'
                                    : '#dfe0e2'
                            }
                        >
                            <StyledTruncatedText
                                width={100}
                                fontSize={1}
                                color="#9b9b9b"
                                lineHeight="1.2"
                            >
                                {nameAndText.text}
                            </StyledTruncatedText>
                        </StyledFlex>
                    </Button>
                ))}
            </Grid>
            {hasError && <Onboarding.ValidationMessage text={errorMessage} />}
        </Box>
    );
};

const StyledNextButton = styled(Button)`
    && {
        border-radius: 29.5px;
        border: 1px solid;
        font-size: 16px;
    }
`;

class OnboardingNextButton extends React.Component {
    render() {
        const { children, onClick, disabled, loading, ...rest } = this.props;
        const formatText = getFormatTextFromProps(this.props);

        return (
            <FormItem>
                <Flex
                    {...rest}
                    width="100%"
                    justifyContent="center"
                    mt={NextButtonMarginTop}
                >
                    <StyledNextButton
                        loading={loading}
                        width={329}
                        height={50}
                        ghost={true}
                        onClick={onClick}
                        disabled={disabled}
                    >
                        {children || formatText('general.next')}
                    </StyledNextButton>
                </Flex>
            </FormItem>
        );
    }
}

class OnboardingNoneButton extends React.Component {
    render() {
        const { list, onClick } = this.props;
        const values = Object.values(list);
        const formatText = getFormatTextFromProps(this.props);

        if (values.includes(true)) {
            const count = values.filter(v => v === true).length;
            return (
                <OnboardingNextButton onClick={onClick}>
                    {`${formatText('general.next')} (${count})`}
                </OnboardingNextButton>
            );
        }
        return (
            <OnboardingNextButton onClick={onClick}>
                {formatText('general.none')}
            </OnboardingNextButton>
        );
    }
}

class PreviousButtonClass extends React.Component {
    render() {
        const formatText = getFormatTextFromProps(this.props);
        return (
            <Box
                className="onboarding-previous-button"
                position="absolute"
                top="51px"
                left="22px"
            >
                <Button
                    type="ghost"
                    height="auto"
                    onClick={() => this.props.goToPreviousStep()}
                >
                    <Flex alignItems="center">
                        <PreviousIcon />
                        <Text
                            ml="6px"
                            fontWeight="medium"
                            fontSize={[0, 1, '']}
                            color="text.blue"
                        >
                            {formatText('general.previousPage')}
                        </Text>
                    </Flex>
                </Button>
            </Box>
        );
    }
}

export const SkipButton = ({ onSkip, text }) => (
    <Box position="absolute" top="51px" right="22px">
        <Button type="ghost" height="auto" onClick={onSkip}>
            <Flex alignItems="center">
                <Box style={{ transform: 'rotateZ(180deg)' }}>
                    <PreviousIcon />
                </Box>
                <Text
                    ml="6px"
                    fontWeight="medium"
                    fontSize={[0, 1, '']}
                    color="text.blue"
                >
                    {text || 'Skip'}
                </Text>
            </Flex>
        </Button>
    </Box>
);

const StepTitleText = ({ text = '' }) => (
    <Text
        fontSize={[2, 3, '']}
        fontWeight="medium"
        textAlign="center"
        mt={8}
        mb={8}
    >
        {text}
    </Text>
);

const StepBlurbText = ({ text = '' }) => (
    <Flex justifyContent="center">
        <Text
            fontSize={[0, 1, '']}
            width={['100%', '430px', '430px']}
            textAlign="center"
            mb={50}
        >
            <StyledTruncatedText>{text}</StyledTruncatedText>
        </Text>
    </Flex>
);

const FormItemLabelText = ({ text = '', hasError = false, ...rest }) => (
    <Text color={hasError ? 'red' : ''} fontSize={[1, 2, '']} mb={10} {...rest}>
        {text}
    </Text>
);

const StepBlurbTextLogin = ({ text = '' }) => (
    <Flex justifyContent="center">
        <Text fontSize={[0, 1, '']} width="100%" textAlign="center" mb={50}>
            <StyledTruncatedText>{text}</StyledTruncatedText>
        </Text>
    </Flex>
);

const StyledBasicComponentsInput = styled(BasicComponentsInput)`
    && {
        font-family: 'Silka';

        ::placeholder {
            font-size: 16px;
        }
    }
`;

const StyledBasicComponentsSelect = styled(BasicComponentsSelect)`
    &&.ant-select {
        width: 100%;
    }

    && {
        .ant-select-selection {
            height: ${InputSelectHeight}px;
        }
        .ant-select-selection__placeholder {
            font-family: Silka;
            font-size: 16px;
        }
    }
`;

const Input = props => (
    // has-error classname is from ant design
    <Box
        className={props.error ? 'has-error' : ''}
        width="100%"
        mb={FormItemMarginBottom}
    >
        <StyledBasicComponentsInput height={InputSelectHeight} {...props} />
        {props.error && <Onboarding.ValidationMessage text={props.error} />}
    </Box>
);

const InputField = props => {
    const {
        field,
        form,
        placeholder,
        autoFocus,
        onKeyPress,
        disabled,
        type,
        setRef = () => {},
    } = props;
    const fieldName = field.name;
    const hasError =
        _get(form.touched, fieldName) && _get(form.errors, fieldName);
    const errorMessage = _get(form.errors, fieldName);

    return (
        <Box className={hasError ? 'has-error' : ''} mb={FormItemMarginBottom}>
            <StyledBasicComponentsInput
                {...field}
                type={type}
                placeholder={placeholder}
                height={InputSelectHeight}
                autoFocus={autoFocus}
                disabled={disabled}
                onKeyPress={onKeyPress}
                setRef={setRef}
            />
            {hasError && <Onboarding.ValidationMessage text={errorMessage} />}
        </Box>
    );
};

const Select = props => {
    const { value, ...rest } = props;
    return (
        <Box
            className={props.error ? 'has-error' : ''}
            mb={FormItemMarginBottom}
        >
            <StyledBasicComponentsSelect
                mb={FormItemMarginBottom}
                value={value || undefined}
                {...rest}
            />
            {props.error && <Onboarding.ValidationMessage text={props.error} />}
        </Box>
    );
};

const SelectField = props => {
    const {
        options,
        field,
        form,
        placeholder,
        onChange,
        onSelect,
        disabled,
    } = props;
    const fieldName = field.name;
    const hasError =
        _get(form.touched, fieldName) && _get(form.errors, fieldName);
    const errorMessage = hasError;

    const handleSelect = value => {
        form.setFieldValue(field.name, value);
    };

    const wrapperRef = React.createRef();

    return (
        <Box
            className={hasError ? 'has-error' : ''}
            mb={FormItemMarginBottom}
            position="relative"
            ref={wrapperRef}
        >
            <StyledBasicComponentsSelect
                placeholder={placeholder}
                value={field.value || undefined}
                mb={FormItemMarginBottom}
                onBlur={() => form.setFieldTouched(field.name, true)}
                onSelect={onSelect || handleSelect}
                onChange={onChange || null}
                children={options}
                disabled={disabled}
                getPopupContainer={() => wrapperRef.current}
                showSearch={props.showSearch}
            />
            {hasError && <Onboarding.ValidationMessage text={errorMessage} />}
        </Box>
    );
};

const SelectOption = BasicComponentsSelect.Option;

const DocumentUploaderInputContainer = ({ text, children }) => (
    <StyledDocumentUploaderFlex justifyContent="center" mb={8}>
        <Box>
            <Onboarding.FormItemLabelText text={text} width={190} />
            {children}
        </Box>
    </StyledDocumentUploaderFlex>
);

const FixedBox = ({ children, width }) => (
    <Box position="fixed" bottom={20} left="50%" ml={-(width / 2)}>
        {children}
    </Box>
);

const StyledButton = styled(Button)`
    && {
        border-radius: 29.5px;
    }
`;

const StartQuestionaireButton = ({ onNext, children }) => (
    <Flex justifyContent="center" mt={LastMargin} mb="50px">
        <StyledButton width={329} onClick={onNext}>
            {/* Doesn't support if hasSubmittedHealthHistoryForm:true and hasGoneThroughInsurancePage:false */}
            <Text fontSize={[1, 2, '']} color="text.white">
                {children}
            </Text>
        </StyledButton>
    </Flex>
);

const SkipForNow = ({ onClick }) => (
    <Flex justifyContent="center" mb={39}>
        <Button type="ghost" onClick={onClick}>
            <Text width={100} textAlign="center">
                Skip for now
            </Text>
        </Button>
    </Flex>
);

export const AppointmentCard = ({
    imageUrl,
    doctorName,
    rating,
    numReviews,
    date,
    time,
}) => (
    <Box
        m="auto"
        width="260px"
        height="241px"
        borderRadius="10px"
        boxShadow="0 2px 7px 0 #cfdaeb"
    >
        <Flex
            height="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            {imageUrl ? (
                // TODO: Optimize image size
                <Image
                    src={imageUrl}
                    alt={doctorName}
                    width={58}
                    height={58}
                    borderRadius="50%"
                />
            ) : (
                <Box
                    width="58px"
                    height="58px"
                    background="#d8d8d8"
                    borderRadius="50%"
                    mb="14px"
                />
            )}
            <Box>
                <Text textAlign="center">{doctorName}</Text>

                <Flex mb={33} justifyContent="center">
                    {rating !== 0 && (
                        <DentistRating
                            rating={rating}
                            numReviews={numReviews}
                        />
                    )}
                </Flex>

                <Flex flexDirection="column">
                    <Text textAlign="center">{date}</Text>
                    <Text
                        fontWeight="bold"
                        fontSize={[3, 4, '']}
                        textAlign="center"
                    >
                        {time}
                    </Text>
                </Flex>
            </Box>
        </Flex>
    </Box>
);

export const DentistRating = ({ rating = 0, numReviews = 0 }) => (
    <Flex alignItems="center">
        <Rating disabled={true} fontSize="16px" value={rating} />
        <Text textAlign="center" ml={6} mt={4} fontSize={0} lineHeight="22.5px">
            {numReviews.toString()}
        </Text>
    </Flex>
);

const OnboardingProcedureCheckbox = props => {
    const { field, value, onClick, disabled } = props;

    return (
        <Button
            width="fit-content"
            height="fit-content"
            type="ghost"
            onClick={disabled ? null : onClick}
        >
            <Box height={25} border="none" background="white">
                <Flex height="100%" alignItems="center">
                    <StyledLaguroCheckbox checked={value} disabled={disabled} />
                    <Text ml="20px" lineHeight="1.2">
                        {field}
                    </Text>
                </Flex>
            </Box>
        </Button>
    );
};

const OnboardingNavButton = props => {
    const { label, onClick } = props;

    return (
        <Button
            width="fit-content"
            height="fit-content"
            type="ghost"
            onClick={onClick}
        >
            <StyledNavButtonText>{label}</StyledNavButtonText>
        </Button>
    );
};

const RequiredFieldsMessage = ({
    text = 'Please fill out all the required fields.',
}) => (
    <Text color="#f5222d" fontSize="12px" textAlign="center">
        {text}
    </Text>
);

const ValidationMessage = ({ text = 'Required' }) => (
    <Text
        color="#f5222d"
        fontSize="12px"
        textAlign="left"
        mb="0px"
        mt="10px"
        lineHeight="1"
    >
        {text}
    </Text>
);

export default class Onboarding extends React.Component {
    static RequiredFieldsMessage = RequiredFieldsMessage;
    static Checkbox = OnboardingCheckbox;
    static PreviousButton = injectIntl(PreviousButtonClass);
    static SkipButton = SkipButton;
    static Choices = Choices;
    static NextButton = injectIntl(OnboardingNextButton);
    static NoneButton = injectIntl(OnboardingNoneButton);
    static StepTitleText = StepTitleText;
    static StepBlurbText = StepBlurbText;
    static FormItemLabelText = FormItemLabelText;
    static DocumentUploaderInputContainer = DocumentUploaderInputContainer;
    static Input = Input;
    static Select = Select;
    static SelectOption = SelectOption;
    static FixedBox = FixedBox;
    static StartQuestionaireButton = StartQuestionaireButton;
    static ProcedureCheckbox = OnboardingProcedureCheckbox;
    static NavButton = OnboardingNavButton;
    static StepBlurbTextLogin = StepBlurbTextLogin;
    static SkipForNow = SkipForNow;
    static ValidationMessage = ValidationMessage;
    static SelectField = SelectField;
    static InputField = InputField;
    static ChoicesField = ChoicesField;
}

export const PreviousButton = injectIntl(PreviousButtonClass);
