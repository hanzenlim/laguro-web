import React, { Component, Fragment } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import styled from 'styled-components';
import get from 'lodash/get';
import { Alert } from 'antd';
import {
    Modal,
    Flex,
    Button,
    Icon,
    Box,
    Responsive,
    Text,
} from '../../../../components';
import UpdateDentistProfileForm from '../../../common/Forms/UpdateDentistProfileForm';
import { getActiveUserQuery, getUserQuery } from './queries';
import UserVerification from '../../UserVerification';
import { DENTIST } from '../../../../util/strings';
import { withScreenSizes } from '../../../../components/Responsive';

const { Desktop, TabletMobile } = Responsive;
const DENTIST_PROFILE_STEP = 'dentist_profile_step';
const DENTIST_VERIFICATION_STEP = 'dentist_verification_step';

const StyledModal = styled(Modal)`
    .ant-modal-body {
        padding: 0;
    }

    .ant-modal-header {
        border-bottom: none;
    }

    .ant-alert {
        margin-bottom: 20px;
    }

    .anticon-right {
        position: absolute;
        left: 50%;
        align-self: center;
        font-size: 23px;
        margin-left: -16px;
        color: #000000;
    }
`;

const ContentWrap = styled.div`
    padding: 20px;
`;

const DentistProfileStepContent = ({ onComplete, completed }) => (
    <ContentWrap>
        <Text fontSize={[2, '', 4]} mb={[18, '', 20]} fontWeight="medium">
            Step 1: Let&#39;s create your dentist profile
        </Text>

        {completed ? (
            <Fragment>
                <Alert
                    message="A dentist profile exists for you. Feel free to review and update any information."
                    type="warning"
                />
            </Fragment>
        ) : (
            <Fragment>
                <Text fontSize={[0, '', 2]} mb={[10, '', 12]}>
                    You need to be a dentist to continue.
                </Text>
            </Fragment>
        )}
        <UpdateDentistProfileForm onComplete={onComplete} />
    </ContentWrap>
);

const DentistVerificationStepContent = ({ onComplete }) => (
    <ContentWrap>
        <h2>Step 2: Let&#39;s verify some details</h2>
        <UserVerification onComplete={onComplete} persona={DENTIST} />
    </ContentWrap>
);

class DentistVerificationModal extends Component {
    state = {
        currentStep: null,
        completedSteps: {},
    };

    constructor(props) {
        super(props);

        this.fetchData();
    }

    componentDidUpdate = prevProps => {
        // TODO: Refactor this.
        // If a user logs in while this component is active, we refetch
        // the activeUser again to fetch the relevant data.
        if (
            get(prevProps, 'data.activeUser') !==
            get(this.props, 'data.activeUser')
        ) {
            this.fetchData();
        }

        return null;
    };

    fetchData = async () => {
        const {
            client,
            data: { activeUser },
        } = this.props;

        if (activeUser) {
            const { data } = await client.query({
                query: getUserQuery,
                variables: { id: this.props.data.activeUser.id },
            });

            if (get(data, 'getUser.dentist')) {
                return this.setState({
                    currentStep: DENTIST_VERIFICATION_STEP,
                    completedSteps: {
                        ...this.state.completedSteps,
                        [DENTIST_PROFILE_STEP]: true,
                    },
                });
            }

            return this.setState({ currentStep: DENTIST_PROFILE_STEP });
        }

        return null;
    };

    // onComplete does not execute for cached queries
    // https://github.com/apollographql/react-apollo/issues/2177
    // onCompleted = data => {
    //     if (data.getUser.dentist) {
    //         return this.setState({
    //             currentStep: DENTIST_VERIFICATION_STEP,
    //             completedSteps: {
    //                 ...this.state.completedSteps,
    //                 [DENTIST_PROFILE_STEP]: true,
    //             },
    //         });
    //     }

    //     return this.setState({ currentStep: DENTIST_PROFILE_STEP });
    // };

    handleStepComplete = step => () => {
        if (step === DENTIST_PROFILE_STEP) {
            this.setState({
                currentStep: DENTIST_VERIFICATION_STEP,
                completedSteps: {
                    ...this.state.completedSteps,
                    [DENTIST_PROFILE_STEP]: true,
                },
            });
        }

        if (step === DENTIST_VERIFICATION_STEP) {
            this.setState({
                currentStep: DENTIST_VERIFICATION_STEP,
                completedSteps: {
                    ...this.state.completedSteps,
                    [DENTIST_PROFILE_STEP]: true,
                },
            });

            if (this.props.onComplete) {
                this.props.onComplete({ verified: true });
            }
        }
    };

    handleChangeStep = step => () => {
        if (DENTIST_PROFILE_STEP in this.state.completedSteps) {
            this.setState({ currentStep: step });
        }
    };

    renderStepContent = () => {
        const { currentStep } = this.state;

        if (currentStep === DENTIST_PROFILE_STEP) {
            return (
                <DentistProfileStepContent
                    onComplete={this.handleStepComplete(DENTIST_PROFILE_STEP)}
                    completed={
                        DENTIST_PROFILE_STEP in this.state.completedSteps
                    }
                />
            );
        }

        if (currentStep === DENTIST_VERIFICATION_STEP) {
            return (
                <DentistVerificationStepContent
                    onComplete={this.handleStepComplete(
                        DENTIST_VERIFICATION_STEP
                    )}
                />
            );
        }

        return null;
    };

    render() {
        const { visible, desktopOnly, tabletMobileOnly } = this.props;
        const { currentStep, completedSteps } = this.state;

        return (
            <StyledModal
                title="Verification"
                visible={visible}
                footer={null}
                width={desktopOnly ? 620 : '100%'}
                style={
                    desktopOnly
                        ? null
                        : {
                              top: '0',
                              left: '0',
                              right: '0',
                              bottom: '0',
                              margin: '0',
                              height: '100%',
                          }
                }
                {...this.props}
            >
                <Flex
                    flexDirection="row"
                    flexWrap="wrap"
                    borderTop="2px solid #f2f2f2"
                >
                    <Button width="50%" type="ghost">
                        <Flex
                            textAlign="center"
                            py={14}
                            px={0}
                            fontSize={16}
                            height={[52, '', 50]}
                            alignItems="center"
                            justifyContent="center"
                            bg={
                                currentStep === DENTIST_PROFILE_STEP ||
                                tabletMobileOnly
                                    ? '#ffffff'
                                    : '#f2f2f2'
                            }
                            color={
                                currentStep === DENTIST_PROFILE_STEP ||
                                tabletMobileOnly
                                    ? 'text.black'
                                    : '#727272'
                            }
                            onClick={this.handleChangeStep(
                                DENTIST_PROFILE_STEP
                            )}
                            status={
                                DENTIST_PROFILE_STEP in completedSteps
                                    ? 'finished'
                                    : null
                            }
                        >
                            {DENTIST_PROFILE_STEP in completedSteps ? (
                                <Desktop>
                                    <Icon
                                        fontSize={24}
                                        fontWeight="normal"
                                        color={
                                            currentStep === DENTIST_PROFILE_STEP
                                                ? '#393939'
                                                : '#727272'
                                        }
                                        mr={12}
                                        type="check-circle"
                                        theme="twoTone"
                                        twoToneColor="#3481F8"
                                    />
                                </Desktop>
                            ) : (
                                <Desktop>
                                    <Icon
                                        fontSize={24}
                                        color={
                                            currentStep === DENTIST_PROFILE_STEP
                                                ? '#393939'
                                                : '#727272'
                                        }
                                        mr={12}
                                        fontWeight="normal"
                                        type="user"
                                    />
                                </Desktop>
                            )}
                            <Text
                                is="span"
                                fontWeight={['medium', '', 'regular']}
                                fontSize={[1, '', 2]}
                            >
                                1. Dentist Profile
                            </Text>
                        </Flex>
                    </Button>
                    <Button width="50%" type="ghost">
                        <Flex
                            textAlign="center"
                            py={14}
                            px={0}
                            height={[52, '', 50]}
                            fontSize={16}
                            alignItems="center"
                            justifyContent="center"
                            bg={
                                currentStep === DENTIST_VERIFICATION_STEP ||
                                tabletMobileOnly
                                    ? '#ffffff'
                                    : '#f2f2f2'
                            }
                            color={
                                currentStep === DENTIST_VERIFICATION_STEP ||
                                tabletMobileOnly
                                    ? 'text.black'
                                    : '#727272'
                            }
                            onClick={this.handleChangeStep(
                                DENTIST_VERIFICATION_STEP
                            )}
                            status={
                                currentStep === DENTIST_VERIFICATION_STEP
                                    ? 'active'
                                    : null
                            }
                        >
                            <Desktop>
                                <Icon
                                    fontSize={24}
                                    fontWeight="normal"
                                    mr={12}
                                    type="solution"
                                    style={{ color: '#727272' }}
                                />
                            </Desktop>
                            <Text
                                is="span"
                                fontWeight={['medium', '', 'regular']}
                                fontSize={[1, '', 2]}
                            >
                                2. Dentist Verification
                            </Text>
                        </Flex>
                    </Button>
                    <TabletMobile>
                        <Box
                            borderBottom={`solid 3px 
                            ${
                                currentStep === DENTIST_PROFILE_STEP
                                    ? '#3481f8'
                                    : '#dbdbdb'
                            }
                        `}
                            width="50%"
                        />
                        <Box
                            borderBottom={`solid 3px 
                            ${
                                currentStep === DENTIST_VERIFICATION_STEP
                                    ? '#3481f8'
                                    : '#dbdbdb'
                            }
                        `}
                            width="50%"
                        />
                    </TabletMobile>
                </Flex>

                {this.renderStepContent()}
            </StyledModal>
        );
    }
}

export default compose(
    withApollo,
    graphql(getActiveUserQuery),
    withScreenSizes
)(DentistVerificationModal);
