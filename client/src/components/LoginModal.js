import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                    <a
                        href="#"
                        onClick={this.handleClose}
                        className="modal-close"
                    >
                        X
                    </a>
                    <div className="modal-content">
                        <a
                            id="googleLoginBtn"
                            href="/auth/google"
                            className="login waves-effect"
                        >
                            Log in with Google
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
    open: PropTypes.bool.isRequired,
};

export default LoginModal;
