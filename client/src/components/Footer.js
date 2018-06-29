import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from './icons/logo.svg';
import { Typography } from './common';

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
                <div className="footer-container">
                    <div className="row">
                        <div className="col l4 s12">
                            <div className="row">
                                <div className="col s12">
                                    <img
                                        id="footer-logo"
                                        src={logo}
                                        alt="logo"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col l4 s6">
                            <p className="grey-text text-lighten-4 footer-item">
                                Contact
                            </p>
                            <p className="grey-text text-lighten-4 footer-item">
                                Support
                            </p>
                        </div>
                        <div className="col l4 s6">
                            <p className="grey-text text-lighten-4 footer-item">
                                <Link to={'/privacy'}><Typography color="white">Privacy</Typography></Link>
                            </p>
                            <p className="grey-text text-lighten-4 footer-item">
                                <Link to={'/terms'}><Typography color="white">Terms</Typography></Link>
                            </p>
                        </div>
                        <div className="col offset-l4 l8 s12 footer-copyright">
                            © 2018 Laguro LLC. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Footer);
