import React, { Component } from 'react';
import styled from 'styled-components';

import { Box, Container, Text } from '../../components/';
import UpdateProfileForm from '../../pages/common/Forms/UpdateProfileForm';
import Menu from '../common/Menu';
import { DENTIST, HOST, PATIENT } from '../../util/strings';

const Grid = styled(Box)`
    display: grid;
    grid-template-columns: 280px 632px;
    grid-column-gap: 70px;
`;

class ProfileView extends Component {
    constructor() {
        super();
        this.state = { panel: this.renderPanel('user-info') };
    }

    handleClick = ({ key }) => {
        this.setState({ panel: this.renderPanel(key) });
    };

    renderPanel = key => {
        switch (key) {
            case 'user-info':
                return <UpdateProfileForm />;
            case 'documents':
                return (
                    <Text fontSize={4} color="inherit" lineHeight="40px">
                        documents
                    </Text>
                );
            case PATIENT:
                return (
                    <Text fontSize={4} color="inherit" lineHeight="40px">
                        patient
                    </Text>
                );
            case DENTIST:
                return (
                    <Text fontSize={4} color="inherit" lineHeight="40px">
                        dentist
                    </Text>
                );
            case HOST:
                return (
                    <Text fontSize={4} color="inherit" lineHeight="40px">
                        host
                    </Text>
                );
            default:
        }

        return '';
    };
    renderPersonaMenu = () => {
        const { persona } = this.props;
        switch (persona) {
            case DENTIST:
                return (
                    <Menu.Item key={DENTIST}>
                        <Text fontSize={4} color="inherit" lineHeight="40px">
                            dentist
                        </Text>
                    </Menu.Item>
                );
            case HOST:
                return (
                    <Menu.Item key={HOST}>
                        <Text fontSize={4} color="inherit" lineHeight="40px">
                            host
                        </Text>
                    </Menu.Item>
                );
            case PATIENT:
                return (
                    <Menu.Item key={PATIENT}>
                        <Text fontSize={4} color="inherit" lineHeight="40px">
                            patient
                        </Text>
                    </Menu.Item>
                );
            default:
        }

        return '';
    };

    render() {
        const { panel } = this.state;
        return (
            <Container maxWidth="1050px">
                <Grid mt={70}>
                    <Box>
                        <Menu
                            defaultSelectedKeys={['user-info']}
                            onClick={this.handleClick}
                        >
                            <Menu.Item key="user-info">
                                <Text
                                    fontSize={4}
                                    color="inherit"
                                    lineHeight="40px"
                                >
                                    user info
                                </Text>
                            </Menu.Item>
                            <Menu.Item key="documents">
                                <Text
                                    fontSize={4}
                                    color="inherit"
                                    lineHeight="40px"
                                >
                                    documents
                                </Text>
                            </Menu.Item>
                            {this.renderPersonaMenu()}
                        </Menu>
                    </Box>
                    {panel}
                </Grid>
            </Container>
        );
    }
}
export default ProfileView;
