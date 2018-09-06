import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Container, Text } from '../../components/';
import Menu from '../common/Menu';

const Grid = styled(Box)`
    display: grid;
    grid-template-columns: 280px 632px;
    grid-column-gap: 70px;
`;

class PaymentPageView extends Component {
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
                return (
                    <Text fontSize={4} color="inherit" lineHeight="40px">
                        user info
                    </Text>
                );
            case 'documents':
                return (
                    <Text fontSize={4} color="inherit" lineHeight="40px">
                        documents
                    </Text>
                );
            case 'patient':
                return (
                    <Text fontSize={4} color="inherit" lineHeight="40px">
                        patient
                    </Text>
                );
            case 'dentist':
                return (
                    <Text fontSize={4} color="inherit" lineHeight="40px">
                        dentist
                    </Text>
                );
            case 'host':
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
            case 'patient':
                return (
                    <Menu.Item key="patient">
                        <Text fontSize={4} color="inherit" lineHeight="40px">
                            patient
                        </Text>
                    </Menu.Item>
                );
            case 'dentist':
                return (
                    <Menu.Item key="dentist">
                        <Text fontSize={4} color="inherit" lineHeight="40px">
                            dentist
                        </Text>
                    </Menu.Item>
                );
            case 'host':
                return (
                    <Menu.Item key="host">
                        <Text fontSize={4} color="inherit" lineHeight="40px">
                            host
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
export default PaymentPageView;
