import React from 'react';
import PropType from 'prop-types';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Flex, Responsive, Text } from '../../../components';
import styled from 'styled-components';
import {
    PROCEDURE_LIST,
    LANGUAGE_LIST,
    DAY_AVAILABILITY_LIST,
    TIME_AVAILABILITY_LIST,
    INSURANCE_LIST,
} from '../../../util/dentistUtils';
import { Onboarding } from '../the-bright-side-components';

const { TabletMobile } = Responsive;

const StyledForm = styled(Form)`
    width: 100%;
`;

const SearchFilterView = props => {
    const { onSelect } = props;

    return (
        <StyledForm>
            <Flex
                width="100%"
                flexDirection={['column', '', 'row']}
                bg={['#f7f8fc', '', 'white']}
                p={[30, '', 0]}
            >
                <TabletMobile>
                    <Text fontSize={0} mb={8}>
                        Filters
                    </Text>
                </TabletMobile>
                <Box width={['100%', '', '167px']} mr={[0, '', 10]}>
                    <Field
                        name="procedure"
                        placeholder="Procedures"
                        component={props => (
                            <Onboarding.SelectField
                                {...props}
                                options={PROCEDURE_LIST.map(i => (
                                    <Onboarding.SelectOption value={i}>
                                        {i}
                                    </Onboarding.SelectOption>
                                ))}
                                onChange={value => {
                                    onSelect(props.field.name, value);
                                }}
                            />
                        )}
                    />
                </Box>
                <Box width={['100%', '', '167px']} mr={[0, '', 10]}>
                    <Field
                        name="language"
                        placeholder="Languages"
                        component={props => (
                            <Onboarding.SelectField
                                {...props}
                                options={LANGUAGE_LIST.map(i => (
                                    <Onboarding.SelectOption value={i}>
                                        {i}
                                    </Onboarding.SelectOption>
                                ))}
                                onChange={value => {
                                    onSelect(props.field.name, value);
                                }}
                            />
                        )}
                    />
                </Box>
                <Box width={['100%', '', '171px']} mr={[0, '', 10]}>
                    <Field
                        name="dayAvailability"
                        placeholder="Day availability"
                        component={props => (
                            <Onboarding.SelectField
                                {...props}
                                options={DAY_AVAILABILITY_LIST.map(i => (
                                    <Onboarding.SelectOption value={i}>
                                        {i}
                                    </Onboarding.SelectOption>
                                ))}
                                onChange={value => {
                                    onSelect(props.field.name, value);
                                }}
                            />
                        )}
                    />
                </Box>
                <Box width={['100%', '', '181px']} mr={[0, '', 10]}>
                    <Field
                        name="timeAvailability"
                        placeholder="Time availability"
                        component={props => (
                            <Onboarding.SelectField
                                {...props}
                                options={TIME_AVAILABILITY_LIST.map(i => (
                                    <Onboarding.SelectOption value={i}>
                                        {i}
                                    </Onboarding.SelectOption>
                                ))}
                                onChange={value => {
                                    onSelect(props.field.name, value);
                                }}
                            />
                        )}
                    />
                </Box>
                <Box width={['100%', '', '189px']} mr={[0, '', 10]}>
                    <Field
                        name="insurance"
                        placeholder="Insurance"
                        component={props => (
                            <Onboarding.SelectField
                                {...props}
                                options={INSURANCE_LIST.map(i => (
                                    <Onboarding.SelectOption value={i}>
                                        {i}
                                    </Onboarding.SelectOption>
                                ))}
                                onChange={value => {
                                    onSelect(props.field.name, value);
                                }}
                            />
                        )}
                    />
                </Box>
            </Flex>
        </StyledForm>
    );
};

SearchFilterView.propTypes = {
    current: PropType.number,
    total: PropType.number,
    onChange: PropType.func,
};

export default withFormik({
    validationSchema: Yup.object().shape({}),
    mapPropsToValues: props => {
        const { data } = props;
        return { ...data };
    },
})(SearchFilterView);
