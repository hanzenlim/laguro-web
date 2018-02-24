import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

  renderLogin() {
    const { auth } = this.props;

    if(auth != null){
      switch (auth.data) {
        case "":
        return (
          <a className="login waves-effect btn light-blue lighten-2" href="/auth/google">Login</a>
        );
        default:  //user IS logged in
        return (
          <a className="logout waves-effect btn light-blue lighten-2" href="/api/logout">Logout</a>
        )
      }
    }
  }

  profileButton() {
    const { auth } = this.props;

    if(auth != null){
      switch (auth.data) {
        case "":
        return null;
        default:  //user IS logged in
        return (
          <li><Link to={'/profile'}>{auth.data.name}</Link></li>
        )
      }
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper blue darken-1">
          <Link
            className="left brand-logo valign-wrapper"
            to={'/'}
          >
            <img
              className="logo"
              alt="Logo"
              src="/logo-white.png"
            />
            <h3>LAGURO</h3>
          </Link>

          <ul className="right">
            <li><Link to={'#'}>Become a Host</Link></li>
            <li><Link to={'#'}>About Us</Link></li>
            <li><Link to={'#'}>Help</Link></li>
            {this.profileButton()}
            <li>{this.renderLogin()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);
