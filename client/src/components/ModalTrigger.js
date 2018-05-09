import React from 'react';
import Modal from './Modal';

import './ModalTrigger.css';

class ModalTrigger extends React.Component{
  constructor(){
      super();
      this.state = {
          view: {showModal: false}
      }
      this.handleHideModal = this.handleHideModal.bind(this);
      this.handleShowModal = this.handleShowModal.bind(this);

  }
  handleHideModal(){
      this.setState({view: {showModal: false}})
  }
  handleShowModal(){
      this.setState({view: {showModal: true}})
  }

  render(){
    return(
        <div id="login-modal">
          <a className="waves-effect waves-light btn modal-trigger" onClick={this.handleShowModal} >Login</a>
          <Modal handleHideModal={this.handleHideModal} show={this.state.view.showModal}/>
        </div>
    );
  }
};

export default ModalTrigger;
