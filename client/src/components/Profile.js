import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Landing extends Component {
  loginMessage(){
    const { auth } = this.props;
    return(
      auth && auth.data === "" ? <Link
        to={'/auth/google'}
      >Login to see your profile</Link> : ""
    )
  }

  render() {
    return (
      <div>
        <div>{this.loginMessage()}</div>
        <div>Profile Page</div>
        <div>
          <Link
            to={'/offices/new'}
          >Create a new office</Link>
          <br/>
          <Link
            to={'/listings/new'}
          >Create a new listing for existing office</Link>
          <br/>
          <Link
            to={'/offices/search'}
          >Browse listings</Link>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
  return { auth: state.auth }
}
export default connect(mapStateToProps)(Landing);
