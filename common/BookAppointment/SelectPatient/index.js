import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import { Flex, Text, Box, Image, Select, Modal } from '~/components';
import Family from '~/common/Family';
import { getUserFullName, getUserId } from '~/util/userUtils';
import { getUser } from '~/util/authUtils';
import { GET_USER } from './queries';

const StyledModal = styled(Modal)`
    && .ant-modal-content {
        min-height: 100vh;
    }
`;

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

const SelectPatient = props => {
    const { onSetSelectedPatientId } = props;

    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { data, loading } = useQuery(GET_USER, {
        variables: { id: _get(getUser(), 'id', null) },
    });
    const patients = _get(data, 'getUser.family.members', []);

    const handleSelectPatient = useCallback(
        patientId => {
            setSelectedPatientId(patientId);
            if (onSetSelectedPatientId) {
                onSetSelectedPatientId(patientId);
            }
        },
        [onSetSelectedPatientId]
    );

    useEffect(() => {
        if (onSetSelectedPatientId && patients.length !== 0) {
            const user = patients.filter(
                d => d.relationshipToPrimary === 'SELF'
            )[0];
            handleSelectPatient(user.id);
        }
    }, [patients]);

    if (loading) return null;

    return (
        <Box>
            <StyledModal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                destroyOnClose
                width="100%"
                height="100%"
                style={{
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                }}
            >
                <Box
                    py={26}
                    px={[0, '', 76]}
                    textAlign="center"
                    width="100%"
                    height="100%"
                >
                    <Family hideAppointments hideDentalRecords />
                </Box>
            </StyledModal>

            <Text fontSize={1} fontWeight="500" mb="12px" color="#303549">
                Who are you making this appointment for?
            </Text>
            <Box mb="12px">
                <SelectWithBorders
                    onChange={handleSelectPatient}
                    value={selectedPatientId}
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
                                                '/static/images/defaultUserImage.svg'
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
                <Text
                    is="span"
                    color="#3481f8"
                    onClick={() => setIsModalVisible(true)}
                >
                    click here
                </Text>
            </Text>
        </Box>
    );
};

export default SelectPatient;
