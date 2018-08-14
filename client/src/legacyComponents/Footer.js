import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from './icons/logo.svg';
import { Typography, Flex, Box } from './common';

import './css/Footer.css';

class Footer extends Component {
    constructor() {
        super();
        this.state = {
            height: window.innerHeight,
            width: window.innerWidth
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    }

    render() {
        return (
            <footer className="page-footer">
                <Flex flexDirection="column" alignItems="center">
                    <Box mb={3}>
                        <img id="footer-logo" src={logo} alt="logo" />
                    </Box>
                    <Flex
                        flexDirection="row"
                        flexWrap="wrap"
                        width="100%"
                        justifyContent="center"
                        mb={3}
                    >
                        {/* <Box mr={4}>
                            <p className="grey-text text-lighten-4 footer-item">
                                Contact
                            </p>
                        </Box>

                        <Box mr={4}>
                            <p className="grey-text text-lighten-4 footer-item">
                                Support
                            </p>
                        </Box> */}

                        <Box mr={4}>
                            <p className="grey-text text-lighten-4 footer-item">
                                <Link to={'/privacy'}>
                                    <Typography color="white">
                                        Privacy
                                    </Typography>
                                </Link>
                            </p>
                        </Box>

                        <Box>
                            <p className="grey-text text-lighten-4 footer-item">
                                <Link to={'/terms'}>
                                    <Typography color="white">Terms</Typography>
                                </Link>
                            </p>
                        </Box>
                    </Flex>
                    <Box mb={3}>© 2018 Laguro LLC. All Rights Reserved.</Box>
                </Flex>
            </footer>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default Footer;
// export default connect(mapStateToProps)(Footer);
