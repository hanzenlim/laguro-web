import React, { Component } from 'react';
import Modal from './Modal';

import './css/ModalTrigger.css';

class ModalTrigger extends Component{
  constructor(){
    super()

    this.state = {
        isModalOpen: false
    }
    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  handleShowModal(){
    this.setState({ isModalOpen: true });
  }

  handleHideModal(){
    this.setState({ isModalOpen: false })
  }


  render(){
    return(
      <div id="login-modal">
        <a className="waves-effect waves-light btn modal-trigger" onClick={this.handleShowModal} >Login</a>
        <Modal handleHideModal={this.handleHideModal} show={this.state.isModalOpen}/>
      </div>
    );
  }
};

export default ModalTrigger;
