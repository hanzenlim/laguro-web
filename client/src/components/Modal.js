import React, { Component} from 'react';
import Login from './Login';
import ClickDetector from './ClickDetector'

import './Modal.css'

class Modal extends Component {


  render() {
    let overlay;

    if (this.props.show) {
      overlay = (<div className='modal-overlay'></div>);
    }

    let ret = (
      <div>
        <ClickDetector action={this.props.handleHideModal}>
          <div id="modal1" className={this.props.show ? 'modal open' : 'modal'}>
              <a href="#!" onClick={this.props.handleHideModal} className="modal-close">X</a>
              <div className="modal-content">
                  <Login />
              </div>
              <div className="modal-footer"></div>
          </div>
        </ClickDetector>
        {overlay}
      </div>
    );

    if (ret) {
      return ret;
    } else {
      return null;
    }
  }
    propTypes:{
        handleHideModal: React.PropTypes.func.isRequired,
        show: React.PropTypes.bool.isRequired,
    }
};

export default Modal;
