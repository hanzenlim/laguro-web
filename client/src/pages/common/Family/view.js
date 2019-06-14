import React from 'react';
import { Onboarding } from '../the-bright-side-components/';
import styled from 'styled-components';
import _get from 'lodash/get';
import _capitalize from 'lodash/capitalize';
import {
    Box,
    Text,
    Modal,
    Grid,
    Flex,
    Image,
    Button,
    Icon,
    FilestackImage,
    Link,
} from '../../../components/';
import AddFamilyMemberForm from './AddFamilyMemberForm';
import FamilyMemberInsuranceForm from './FamilyMemberInsuranceForm';
import FamilyMemberMedicalHistoryForm from './FamilyMemberMedicalHistoryForm';
import { getIdFromFilestackUrl } from '../../../util/imageUtil';
import defaultDentistProfileImg from '../../../components/Image/default_dentist_profile_img_square.svg';
import _isEmpty from 'lodash/isEmpty';
import PatientAppoinments from '../PatientAppointments';
import { getUserFullName } from '../../../util/userUtils';
import { width } from 'styled-system';
import { getLTMBaseUrl } from '../../../util/urls';

const MEDICAL_HISTORY_MODAL_NAME = 'medicalHistory';
const DEFAULT_MODAL_WIDTH = 630;

const StyledModal = styled(Modal)`
    &&.ant-modal {
        top: 0;
        bottom: 0;
        height: 100vh;
        max-width: 100%;
        ${width}
        margin: 0;
    }

    && .ant-modal-content {
        bottom: 0;
        position: absolute;
        width: 100%;
    }

    && .ant-modal-body {
        height: 80vh;
        overflow: scroll;
    }

    && .ant-menu-inline,
    && .ant-menu-vertical,
    && .ant-menu-vertical-left {
        border-right: none;
    }

    @media (min-width: ${props => props.theme.breakpoints[0]}) {
        &&.ant-modal {
            top: 50px;
            height: auto;
            margin: 0 auto;
        }

        && .ant-modal-content {
            bottom: unset;
            position: relative;
            width: 100%;
        }

        && .ant-modal-body {
            height: calc(100vh - 150px);
            overflow: scroll;
        }
    }
`;

const FamilyView = ({
    familyMembers = [],
    activeModal = '',
    userId = '',
    refetch = () => {},
    openModal = () => {},
    closeModal = () => {},
    viewDentalRecords = () => {},
    currentFamilyMember = {},
}) => {
    const currentFamilyMemberName = getUserFullName(currentFamilyMember);
    let modal = null;
    const getModalTitle = activeModal => {
        switch (activeModal) {
            case 'addMemberToFamily':
                modal = (
                    <AddFamilyMemberForm
                        onSuccess={async () => {
                            await refetch();
                            await closeModal();
                        }}
                    />
                );
                return 'Add a family member';
            case 'editFamilyMember':
                modal = (
                    <AddFamilyMemberForm
                        userId={userId}
                        onSuccess={async () => {
                            await refetch();
                            await closeModal();
                        }}
                    />
                );
                return 'Edit family member';
            case 'appointments':
                modal = <PatientAppoinments user={currentFamilyMember} />;
                return `${currentFamilyMemberName}'s appointments`;
            case 'medicalHistory':
                modal = (
                    <FamilyMemberMedicalHistoryForm
                        userId={userId}
                        onSuccess={async () => {
                            await refetch();
                            await closeModal();
                        }}
                    />
                );
                return `${currentFamilyMemberName}'s medical history`;
            case 'insurance':
                modal = (
                    <FamilyMemberInsuranceForm
                        userId={userId}
                        onSuccess={async () => {
                            await refetch();
                            await closeModal();
                        }}
                    />
                );
                return `${currentFamilyMemberName}'s insurance information`;
            default:
                return 'Add a family member';
        }
    };

    return (
        <div>
            {!_isEmpty(activeModal) && (
                <StyledModal
                    destroyOnClose
                    width={
                        activeModal === MEDICAL_HISTORY_MODAL_NAME
                            ? [DEFAULT_MODAL_WIDTH, '', 1000]
                            : DEFAULT_MODAL_WIDTH
                    }
                    title={getModalTitle(activeModal)}
                    visible={!_isEmpty(activeModal)}
                    onCancel={closeModal}
                >
                    {modal}
                </StyledModal>
            )}
            {familyMembers && familyMembers.length !== 0 ? (
                <Box>
                    <Flex justifyContent="space-between" mb="12px">
                        <Box>
                            <Text fontSize={2}>Manage family members</Text>
                        </Box>
                        <Box>
                            <Button
                                onClick={() =>
                                    openModal({ modal: 'addMemberToFamily' })
                                }
                                type="ghost"
                                height="auto"
                            >
                                <Text fontSize={2} color="#3481f8">
                                    Add a family member
                                </Text>
                            </Button>
                        </Box>
                    </Flex>
                    <Grid
                        gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr']}
                        gridColumnGap="18px"
                        gridRowGap="18px"
                    >
                        {familyMembers.map(member => (
                            <Box
                                width="100%"
                                position="relative"
                                height="339px"
                                borderColor="#ececec"
                                border="1px solid"
                                boxShadow="2px 2px 4px 0 #f7f8fc"
                                p="30px"
                            >
                                <Box
                                    position="absolute"
                                    top="18px"
                                    right="18px"
                                >
                                    <Button
                                        onClick={() =>
                                            openModal({
                                                modal: 'editFamilyMember',
                                                userId: member.id,
                                            })
                                        }
                                        type="ghost"
                                        height="auto"
                                    >
                                        <Text color="text.black">edit</Text>
                                    </Button>
                                </Box>
                                <Flex justifyContent="center">
                                    <Flex
                                        position="relative"
                                        width="90px"
                                        height="90px"
                                        borderRadius="50%"
                                        justifyContent="center"
                                    >
                                        {member.imageUrl &&
                                        member.imageUrl.includes(
                                            'filestack'
                                        ) ? (
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
                                                {_capitalize(
                                                    _get(
                                                        member,
                                                        'relationshipToPrimary'
                                                    )
                                                )}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    mb="22px"
                                >
                                    <Text
                                        mt="10px"
                                        fontSize={3}
                                        fontWeight="500"
                                    >
                                        {`${member.firstName} ${
                                            member.lastName
                                        }`}
                                    </Text>
                                </Flex>

                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid
                                        gridTemplateColumns="1fr 1fr"
                                        gridColumnGap="18px"
                                        gridRowGap="18px"
                                    >
                                        <Button
                                            onClick={() =>
                                                openModal({
                                                    modal: 'appointments',
                                                    userId: member.id,
                                                })
                                            }
                                            type="ghost"
                                            height="auto"
                                        >
                                            <Flex
                                                border="1px solid"
                                                borderColor="#ececec"
                                                borderRadius="30px"
                                                height="62px"
                                                width="132px"
                                                alignItems="center"
                                                justifyContent="center"
                                                flexDirection="column"
                                            >
                                                <Box opacity="0.63" mb="8px">
                                                    <Icon type="clock" />
                                                </Box>
                                                <Text
                                                    color="#3481f8"
                                                    fontSize={0}
                                                >
                                                    APPOINTMENTS
                                                </Text>
                                            </Flex>
                                        </Button>

                                        <Button
                                            onClick={() =>
                                                openModal({
                                                    modal: MEDICAL_HISTORY_MODAL_NAME,
                                                    userId: member.id,
                                                })
                                            }
                                            type="ghost"
                                            height="auto"
                                        >
                                            <Flex
                                                border="1px solid"
                                                borderColor="#ececec"
                                                borderRadius="30px"
                                                height="62px"
                                                width="132px"
                                                alignItems="center"
                                                justifyContent="center"
                                                flexDirection="column"
                                            >
                                                <Box opacity="0.63" mb="8px">
                                                    <Icon type="medicalDocument" />
                                                </Box>
                                                <Text
                                                    color="#3481f8"
                                                    fontSize={0}
                                                >
                                                    MEDICAL HISTORY
                                                </Text>
                                            </Flex>
                                        </Button>

                                        <Button
                                            onClick={() =>
                                                openModal({
                                                    modal: 'insurance',
                                                    userId: member.id,
                                                })
                                            }
                                            type="ghost"
                                            height="auto"
                                        >
                                            <Flex
                                                border="1px solid"
                                                borderColor="#ececec"
                                                borderRadius="30px"
                                                height="62px"
                                                width="132px"
                                                alignItems="center"
                                                justifyContent="center"
                                                flexDirection="column"
                                            >
                                                <Box opacity="0.63" mb="8px">
                                                    <Icon type="umbrella" />
                                                </Box>
                                                <Text
                                                    color="#3481f8"
                                                    fontSize={0}
                                                >
                                                    INSURANCE
                                                </Text>
                                            </Flex>
                                        </Button>

                                        <Link
                                            isExternal
                                            target="_blank"
                                            rel="noopener"
                                            to={`${getLTMBaseUrl()}/go?to=/chart&patientId=${_get(
                                                member,
                                                'id'
                                            )}`}
                                        >
                                            <Button type="ghost" height="auto">
                                                <Flex
                                                    border="1px solid"
                                                    borderColor="#ececec"
                                                    borderRadius="30px"
                                                    height="62px"
                                                    width="132px"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    flexDirection="column"
                                                >
                                                    <Box
                                                        opacity="0.63"
                                                        mb="8px"
                                                    >
                                                        <Icon type="dentalRecords" />
                                                    </Box>
                                                    <Text
                                                        color="#3481f8"
                                                        fontSize={0}
                                                    >
                                                        DENTAL RECORDS
                                                    </Text>
                                                </Flex>
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Flex>
                            </Box>
                        ))}
                    </Grid>
                </Box>
            ) : (
                <Box>
                    <Box mt="40px">
                        <Text textAlign="center">
                            You currently do not have any family members linked
                            with this account
                        </Text>
                    </Box>
                    <Box mt="22px">
                        <Onboarding.NextButton
                            onClick={() =>
                                openModal({ modal: 'addMemberToFamily' })
                            }
                        >
                            Add a family member
                        </Onboarding.NextButton>
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default FamilyView;
