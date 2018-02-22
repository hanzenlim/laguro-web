import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

  renderLogin() {
    const { auth } = this.props;
    switch (auth) {
      default:
        return <li><a className="login waves-effect btn light-blue lighten-2" href="/auth/google">Login</a></li>;
      // default:  //user IS logged in
      //   return (
      //     <ul>
      //       <li>
      //         <a className="logout waves-effect waves-light btn" href="/api/logout">
      //           Logout
      //         </a>
      //       </li>
      //     </ul>
      //   )
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper blue darken-1">
          <Link
            className="left brand-logo valign-wrapper"
            to={this.props.auth ? '/dashboard' : '/'}
          >
            <img className="logo" src="/logo-white.png"/>
            Swap-Op
          </Link>

          <ul className="right">
            <li><Link to={'#'}>About Us</Link></li>
            <li><Link to={'#'}>Help</Link></li>
            <li><Link to={'#'}>Sign Up</Link></li>
            <li>{this.renderLogin()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return { auth: state.auth, points: state.points };
};

export default connect(mapStateToProps)(Header);
