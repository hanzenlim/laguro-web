import * as materialize from 'materialize-css/dist/js/materialize';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './icons/logo.svg';
import Icon from './Icon';
import Footer from './Footer';

import './css/Header.css';

const SideNavLink = styled(Link)`
    width: 83%;
    height: 5%;
    color: black;
    display: inline-block;
    line-height: 40px;
`;

const SideNavLinkArrow = SideNavLink.extend`
    width: 13%;
`;

const SideNavX = styled(Icon)`
    float: right;
    margin-right: 5%;
`;


class Header extends Component {
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
        const elements = document.getElementsByClassName('sidenav');
        for (const el of elements) {
            materialize.Sidenav.init(el, {
                preventScrolling: true
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });

        const elements = document.getElementsByClassName('sidenav');
        for (const el of elements) {
            materialize.Sidenav.init(el, {
                preventScrolling: true
            });
        }
    }

    renderLogin() {
        const { auth } = this.props;

        if (auth === null) {
            return (
                <a
                    id="login"
                    className="login waves-effect btn lighten-2 modal-trigger"
                    onClick={this.props.toggleShowModal}
                >
                    {' '}
                    Sign in{' '}
                </a>
            );
        }
        // user IS logged in
        return (
            <a
                id="logout"
                className="logout waves-effect btn lighten-2"
                href="/api/logout"
            >
                Sign out
            </a>
        );
    }

    profileButton() {
        const { auth } = this.props;

        if (auth != null) {
            const firstName = auth && auth.firstName;
            const lastName = auth && auth.lastName;

            return (
                <li>
                    <Link to={'/profile'}>{`${firstName} ${lastName}`}</Link>
                </li>
            );
        }
    }

    render() {
        const { auth } = this.props;
        const isMobile = window.innerWidth <= 540;

        if (!isMobile) {
            return (
                <nav className="nav-extended">
                    <div className="nav-wrapper">
                        <a href="/">
                            <div className="title-logo brand-logo">
                                <img src={logo} className="logo" alt="logo" />
                                Laguro
                            </div>
                        </a>
                        <ul className="right">
                            <li>
                                <Link to={'/landlord-onboarding/add-office'}>
                                    Rente your dental office
                                </Link>
                            </li>
                            <li>
                                <Link to={'#'}>How it works?</Link>
                            </li>
                            {this.profileButton()}
                            <li>{this.renderLogin()}</li>
                        </ul>
                    </div>
                </nav>
            );
        } else {
        
            return (
                <div>
                    <nav className="nav-extended">
                        <div className="nav-wrapper">
                            <a
                                data-target="slide-out"
                                className="sidenav-trigger"
                            >
                                <i className="material-icons">menu</i>
                            </a>

                            <a href="/" className="brand-logo">
                                <img src={logo} className="logo" alt="logo" />
                                Laguro
                            </a>
                            <ul className="right">
                                {this.profileButton()}
                                <li>{this.renderLogin()}</li>
                            </ul>
                        </div>
                    </nav>

                    <ul id="slide-out" className="sidenav">
                        <Icon
                            icon="logo"
                            width="39px"
                            background="#0AD5B1"
                            tooth="#FFFFFF"
                        />
                        <SideNavX
                            className="sidenav-close"
                            icon="sideNavX"
                            width="15px"
                        />
                        <hr />

                        <SideNavLink to={'/landlord-onboarding/add-office'}>
                            Rent your dental office
                        </SideNavLink>
                        <SideNavLinkArrow
                            to={'/landlord-onboarding/add-office'}
                        >
                            {'>'}
                        </SideNavLinkArrow>

                        <hr />

                        <SideNavLink to={'#'}>How it works?</SideNavLink>
                        <SideNavLinkArrow to={'#'}>{'>'}</SideNavLinkArrow>

                        <hr />

                        <SideNavLink to={'/profile'}>
                            {auth && auth.name ? auth.name : 'Profile'}
                        </SideNavLink>
                        <SideNavLinkArrow to={'/profile'}>
                            {'>'}
                        </SideNavLinkArrow>

                        <hr />

                        <Footer />
                    </ul>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
