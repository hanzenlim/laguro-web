import React, { Component, Fragment } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import styled from 'styled-components';
import get from 'lodash/get';
import { Icon, Alert } from 'antd';
import { Modal } from '../../../../components';
import UpdateDentistProfileForm from '../../../common/Forms/UpdateDentistProfileForm';
import { getActiveUserQuery, getUserQuery } from './queries';
import UserVerification from '../../UserVerification';
import { DENTIST } from '../../../../util/strings';

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

const TabContainer = styled.div`
    display: flex;
    border-top: 2px solid #f2f2f2;
`;

const Tab = styled.div`
    text-align: center;
    flex: 1;
    text-align: center;
    padding: 14px 0;
    font-size: 16px;
    cursor: pointer;

    align-items: center;
    display: flex;
    justify-content: center;

    background: ${props => (props.active ? '#ffffff' : '#f2f2f2')};
    color: ${props => (props.active ? '#ffffff' : '#727272')};

    > span {
        color: #727272;
        color: ${props => (props.active ? '#393939' : '#727272')};
    }

    .anticon {
        font-size: 24px;
        font-weight: normal;
        margin-right: 12px;
    }
`;

const ContentWrap = styled.div`
    padding: 20px;
`;

const DentistProfileStepContent = ({ onComplete, completed }) => (
    <ContentWrap>
        <h2>Step 1: Let&#39;s create your dentist profile</h2>

        {completed ? (
            <Fragment>
                <Alert
                    message="A dentist profile exists for you. Feel free to review and update any information."
                    type="warning"
                />
            </Fragment>
        ) : (
            <Fragment>
                <p>You need to be a dentist to continue.</p>
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
        const { visible } = this.props;
        const { currentStep, completedSteps } = this.state;

        return (
            <StyledModal
                title="Verification"
                width={620}
                visible={visible}
                footer={null}
                {...this.props}
            >
                <TabContainer>
                    <Tab
                        onClick={this.handleChangeStep(DENTIST_PROFILE_STEP)}
                        status={
                            DENTIST_PROFILE_STEP in completedSteps
                                ? 'finished'
                                : null
                        }
                        active={currentStep === DENTIST_PROFILE_STEP}
                    >
                        {DENTIST_PROFILE_STEP in completedSteps ? (
                            <Icon
                                type="check-circle"
                                theme="twoTone"
                                twoToneColor="#3481F8"
                            />
                        ) : (
                            <Icon type="user" />
                        )}
                        <span>1. Dentist Profile</span>
                    </Tab>
                    <Tab
                        onClick={this.handleChangeStep(
                            DENTIST_VERIFICATION_STEP
                        )}
                        status={
                            currentStep === DENTIST_VERIFICATION_STEP
                                ? 'active'
                                : null
                        }
                        active={currentStep === DENTIST_VERIFICATION_STEP}
                    >
                        <Icon type="solution" style={{ color: '#727272' }} />
                        <span>2. Dentist Verification</span>
                    </Tab>
                </TabContainer>
                {this.renderStepContent()}
            </StyledModal>
        );
    }
}

export default compose(
    withApollo,
    graphql(getActiveUserQuery)
)(DentistVerificationModal);
