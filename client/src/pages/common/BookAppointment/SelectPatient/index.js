import React from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import { Flex, Text, Box, Image, Select } from '../../../../components';
import { PATIENT_DASHBOARD_PAGE_URL_BASE } from '../../../../util/urls';
import { getUserFullName, getUserId } from '../../../../util/userUtils';
import { FAMILY_PLAN_MENU_TEXT } from '../../../../util/strings';
import DefaultUserImage from '../../../../components/Image/defaultUserImage.svg';
import { NewTabLink } from '../../Links';

const SelectWithBorders = styled(Select)`
    && {
        .ant-select-selection {
            border-radius: 2px;
            border: solid 1px ${props => props.theme.colors.divider.blue};
            height: 58px;

            .ant-select-arrow {
                font-weight: regular;
                color: ${props => props.theme.colors.arrow.blue};
                font-size: ${props => props.theme.fontSizes[0]};
                margin-right: 10px;
            }
        }
    }
`;

const familyMemberSelectOptionSortOrder = ['SELF', 'SPOUSE', 'CHILD'];

export const SelectPatient = ({
    onPatientSelect = () => {},
    patients = [],
    currentPatientId,
}) => {
    return (
        <Box>
            <Text fontSize={1} fontWeight="500" mb="12px" color="#303549">
                Who are you making this appointment for?
            </Text>
            <Box mb="12px">
                <SelectWithBorders
                    onChange={onPatientSelect}
                    value={currentPatientId}
                    width="100%"
                    trigger={['click']}
                >
                    {_sortBy(patients, item =>
                        familyMemberSelectOptionSortOrder.indexOf(
                            _get(item, 'relationshipToPrimary')
                        )
                    ).map((p, index) => (
                        <Select.Option value={getUserId(p)} key={index}>
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                height="58px"
                                px="18px"
                                py="12px"
                            >
                                <Flex alignItems="center">
                                    <Box
                                        width="34px"
                                        height="34px"
                                        borderRadius="50%"
                                    >
                                        <Image
                                            src={
                                                _get(p, 'imageUrl') ||
                                                DefaultUserImage
                                            }
                                            width={34}
                                            height={34}
                                            borderRadius="50%"
                                        />
                                    </Box>
                                    <Text
                                        fontSize={1}
                                        fontWeight="500"
                                        ml="13px"
                                        color="rgba(0, 0, 0, 0.5)"
                                    >
                                        {getUserFullName(p)}{' '}
                                        {_get(p, 'relationshipToPrimary') ===
                                        'SELF'
                                            ? '(Myself)'
                                            : ''}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Select.Option>
                    ))}
                </SelectWithBorders>
            </Box>

            <Text fontSize={0} mb="12px" color="#303549" textAlign="right">
                If you want to add a new family member,{' '}
                <NewTabLink
                    to={`${PATIENT_DASHBOARD_PAGE_URL_BASE}${FAMILY_PLAN_MENU_TEXT}`}
                >
                    <Text is="span" color="#3481f8">
                        click here
                    </Text>
                </NewTabLink>
            </Text>
        </Box>
    );
};
