import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GoogleLoginButton from './images/google-login-button.png';
import './css/LoginModal.css';

class LoginModal extends Component {
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /* Set the wrapper ref */
    setWrapperRef = node => {
        this.wrapperRef = node;
    };

    /* Alert if clicked on outside of element */
    handleClickOutside = event => {
        const { onClose } = this.props;

        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (onClose) {
                onClose();
            }
        }
    };

    handleClose = () => {
        const { onClose } = this.props;

        if (onClose) {
            onClose();
        }
    };

    render() {
        const { open } = this.props;

        // console.log("here");

        if (!open) return null;

        // console.log("there");

        return (
            <div>
                <div ref={this.setWrapperRef} className="modal open">
                    <a onClick={this.handleClose} className="modal-close">
                        <i className="material-icons md-38">close</i>
                    </a>
                    <div className="modal-header">
                        <div className="modal-desc">Sign In</div>
                    </div>
                    <div className="modal-content">
                        <a
                            id="googleLoginBtn"
                            href="/auth/google"
                            className="login waves-effect"
                        >
                            <img
                                alt="google login button"
                                width="300"
                                height="70"
                                src={GoogleLoginButton}
                            />
                        </a>
                    </div>
                    <div className="modal-footer" />
                </div>
                <div className="modal-overlay" />
            </div>
        );
    }
}

LoginModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default LoginModal;
