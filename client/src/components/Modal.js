import React, { Component} from 'react';


import './css/Modal.css'

class Modal extends Component {

  constructor() {
    super();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /* Set the wrapper ref */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /* Alert if clicked on outside of element */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {

      this.props.handleHideModal();

    }
  }

  render() {
    let overlay;

    if (this.props.show) {
      overlay = (<div className='modal-overlay'></div>);
    }

    let ret = (
      <div>
        <div ref={this.setWrapperRef} className={this.props.show ? 'modal open' : 'modal'}>
          <a href="#!" onClick={this.props.handleHideModal} className="modal-close">X</a>
          <div className="modal-content">
              <a id="googleLoginBtn" className="login waves-effect">Log in with Google</a>
          </div>
          <div className="modal-footer"></div>
        </div>
        {overlay}
      </div>
    );

    // change
    if (ret) {
      return ret;
    } else {
      return null;
    }
  }
    propTypes:{
      handleHideModal: React.PropTypes.func.isRequired,
      show: React.PropTypes.bool.isRequired
    }
};

export default Modal;
