import React from 'react';
import { Box, Text, Flex, Image, FilestackImage } from '~/components';
import { getIdFromFilestackUrl } from '~/util/imageUtil';
import defaultDentistProfileImg from '~/components/Image/default_dentist_profile_img_square.svg';
import { getUserRelationshipToPrimary } from '~/util/userUtils';
import moment from 'moment';
import _get from 'lodash/get';
import Onboarding from '~/common/the-bright-side-components/components/Onboarding';
import DentistIcon from '~/common/the-bright-side-components/components/Onboarding/Assets/dentistIcon';

const SelectAppointmentForCheckInView = ({
    familyMembers = [],
    setSelectedUserId = () => {},
    selectedUserId = '',
    onSubmit = () => {},
}) => (
    <Box width="100%">
        <Flex justifyContent="center">
            <DentistIcon />
        </Flex>
        <Onboarding.StepTitleText text="Check-in" />
        <Onboarding.StepBlurbText text="Who are you checking in for?" />
        <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection={['column', '', 'row']}
        >
            {familyMembers.map((member, index) => (
                <Box
                    onClick={() => setSelectedUserId(member.id)}
                    width={['100%', '', '300px']}
                    position="relative"
                    height="300px"
                    mr={familyMembers.length - 1 === index ? 0 : '13px'}
                    borderColor={
                        selectedUserId === member.id ? '#3481f8' : '#ececec'
                    }
                    border="1px solid"
                    boxShadow="2px 2px 4px 0 #f7f8fc"
                    p="30px"
                >
                    <Flex justifyContent="center">
                        <Flex
                            position="relative"
                            width="90px"
                            height="90px"
                            borderRadius="50%"
                            justifyContent="center"
                        >
                            {member.imageUrl &&
                            member.imageUrl.includes('filestack') ? (
                                <Box
                                    position="absolute"
                                    width="100%"
                                    height="100%"
                                    borderRadius="50%"
                                    overflow="hidden"
                                >
                                    <FilestackImage
                                        handle={getIdFromFilestackUrl(
                                            member.imageUrl
                                        )}
                                        alt={member.firstName}
                                        sizes={{
                                            fallback: '90px',
                                        }}
                                        formats={['webp', 'pjpg']}
                                    />
                                </Box>
                            ) : (
                                <Image
                                    borderRadius="50%"
                                    src={defaultDentistProfileImg}
                                    width={90}
                                    height={90}
                                    alt={member.firstName}
                                />
                            )}
                            <Flex
                                position="absolute"
                                height="20px"
                                px="13px"
                                py="3px"
                                bg="#f5a623"
                                borderRadius="10px"
                                bottom="-10px"
                                alignItems="center"
                                justifyContent="center"
                                mx="auto"
                            >
                                <Text
                                    fontSize={1}
                                    color="white"
                                    fontWeight="500"
                                >
                                    {getUserRelationshipToPrimary(member)}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex alignItems="center" justifyContent="center" mb="22px">
                        <Text mt="10px" fontSize={3} fontWeight="500">
                            {`${member.firstName} ${member.lastName}`}
                        </Text>
                    </Flex>

                    <Flex
                        mt="38px"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text fontSize={1} mb="7px">
                            Dr.{' '}
                            {_get(
                                member,
                                'appointments[0].dentist.user.firstName'
                            )}{' '}
                            {_get(
                                member,
                                'appointments[0].dentist.user.lastName'
                            )}
                        </Text>

                        <Text fontSize={1}>
                            {moment(
                                _get(member, 'appointments[0].localStartTime')
                            ).format('ddd, M/D, YYYY')}
                        </Text>
                        <Text fontSize={1} mt="2px">
                            {moment(
                                _get(member, 'appointments[0].localStartTime')
                            ).format('h:mm A')}
                        </Text>
                    </Flex>
                </Box>
            ))}
        </Flex>

        <Onboarding.NextButton disabled={!selectedUserId} onClick={onSubmit}>
            Check-in
        </Onboarding.NextButton>
    </Box>
);

export default SelectAppointmentForCheckInView;
