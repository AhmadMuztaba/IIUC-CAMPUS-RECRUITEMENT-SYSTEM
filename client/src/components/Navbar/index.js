import React, { Component } from "react";
import "./navbar.css";
import { connect } from "react-redux";
import { AdminSignOut } from "../actions/admin/index";
import { UserSignOut } from "../actions/user/index";
import { AlumniSignOut } from "../actions/alumni/index";
import { CompanySignOut } from "../actions/company/index";
import history from "../History/index";
class index extends Component {
  state = { admin: false, user: false, alumni: false, company: false };
  render() {
    if (this.props.adminAuth.isAuthenticated && !this.props.adminAuth.loading) {
      return (
        <div className="navbar">
          <img
            className="logo"
            src="https://cdn.logo.com/hotlink-ok/logo-social.png"
            alt="logo"
          />
          <div className="nav-option">
            {this.props.adminAuth.isAuthenticated ? (
              <ion-icon
                name="chevron-down-outline"
                onClick={() => {
                  this.setState({
                    admin: !this.state.admin,
                  });
                }}
              ></ion-icon>
            ) : null}
          </div>
          <div>
            {this.state.admin ? (
              <div className="nav-each-option">
                <ul>
                  <li
                    onClick={() => {
                      this.setState({ admin: false });
                      history.push("/");
                      this.props.AdminSignOut();
                    }}
                  >
                    <ion-icon name="log-in-outline"></ion-icon>sign Out
                  </li>
                  <li>
                    <ion-icon name="create-outline"></ion-icon>Edit
                  </li>
                  <li>
                    <ion-icon name="body-outline"></ion-icon>My Posts
                  </li>
                  <li>
                    <ion-icon name="build-outline"></ion-icon>Settings
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    if (this.props.userAuth.isAuthenticated && !this.props.userAuth.loading) {
      return (
        <div className="navbar">
          <img
            className="logo"
            src="https://cdn.logo.com/hotlink-ok/logo-social.png"
            alt="logo"
          />
          <div className="nav-option">
            {this.props.userAuth.isAuthenticated ? (
              <ion-icon
                name="chevron-down-outline"
                onClick={() => {
                  this.setState({
                    user: !this.state.user,
                  });
                }}
              ></ion-icon>
            ) : null}
          </div>
          <div>
            {this.state.user ? (
              <div className="nav-each-option">
                <ul>
                  <li
                    onClick={() => {
                      this.setState({ user: false });
                      history.push("/");
                      this.props.UserSignOut();
                    }}
                  >
                    <ion-icon name="log-in-outline"></ion-icon>sign Out
                  </li>
                  <li>
                    <ion-icon name="create-outline"></ion-icon>Edit
                  </li>
                  <li>
                    <ion-icon name="body-outline"></ion-icon>My Posts
                  </li>
                  <li>
                    <ion-icon name="build-outline"></ion-icon>Settings
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    if (
      this.props.alumniAuth.isAuthenticated &&
      !this.props.alumniAuth.loading
    ) {
      return (
        <div className="navbar">
          <img
            className="logo"
            src="https://cdn.logo.com/hotlink-ok/logo-social.png"
            alt="logo"
          />
          <div className="nav-option">
            {this.props.alumniAuth.isAuthenticated ? (
              <ion-icon
                name="chevron-down-outline"
                onClick={() => {
                  this.setState({
                    alumni: !this.state.alumni,
                  });
                }}
              ></ion-icon>
            ) : null}
          </div>
          <div>
            {this.state.alumni ? (
              <div className="nav-each-option">
                <ul>
                  <li
                    onClick={() => {
                      this.setState({ alumni: false });
                      history.push("/");
                      this.props.AlumniSignOut();
                    }}
                  >
                    <ion-icon name="log-in-outline"></ion-icon>sign Out
                  </li>
                  <li>
                    <ion-icon name="create-outline"></ion-icon>Edit
                  </li>
                  <li>
                    <ion-icon name="body-outline"></ion-icon>My Posts
                  </li>
                  <li>
                    <ion-icon name="build-outline"></ion-icon>Settings
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    if (
      this.props.companyAuth.isAuthenticated &&
      !this.props.companyAuth.loading
    ) {
      return (
        <div className="navbar">
          <img
            className="logo"
            src="https://cdn.logo.com/hotlink-ok/logo-social.png"
            alt="logo"
          />
          <div className="nav-option">
            {this.props.companyAuth.isAuthenticated ? (
              <ion-icon
                name="chevron-down-outline"
                onClick={() => {
                  this.setState({
                    company: !this.state.company,
                  });
                }}
              ></ion-icon>
            ) : null}
          </div>
          <div>
            {this.state.admin ? (
              <div className="nav-each-option">
                <ul>
                  <li
                    onClick={() => {
                      this.setState({ company: false });
                      history.push("/");
                      this.props.CompanySignOut();
                    }}
                  >
                    <ion-icon name="log-in-outline"></ion-icon>sign Out
                  </li>
                  <li>
                    <ion-icon name="create-outline"></ion-icon>Edit
                  </li>
                  <li>
                    <ion-icon name="body-outline"></ion-icon>My Posts
                  </li>
                  <li>
                    <ion-icon name="build-outline"></ion-icon>Settings
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      );
    } else {
      return (
    //     <div className="navbar">
    //       <img
    //         className="logo"
    //         src="https://cdn.logo.com/hotlink-ok/logo-social.png"
    //         alt="logo"
    //       />
    //     </div>
    //   );
    null
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userAuth: state.UserAuth,
    alumniAuth: state.AlumniAuth,
    companyAuth: state.CompanyAuth,
    adminAuth: state.AdminAuth,
  };
};
export default connect(mapStateToProps, {
  AdminSignOut,
  UserSignOut,
  CompanySignOut,
  AlumniSignOut,
})(index);
