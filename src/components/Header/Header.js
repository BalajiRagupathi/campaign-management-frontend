import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/AuthService";
import history from "../../utils/history";
import "./Header.css";
import axios from "axios";
import Http from "../../services/Variables";

class Header extends Component {

  state = {
    isLoggedIn: authService.getCurrentUserDetails(),
    image: "",
    navbar: false,
    handleClick: (e) => {
      if (this.state.isLoggedIn) {
        authService.logout();
        this.setState({ isLoggedIn: null });
      } else {
        history.push("/login");
      }
    },
  };

  componentDidMount() {

    this.setState({ isLoggedIn: authService.getCurrentUserDetails() });
    let token = localStorage.getItem("currentUserToken");

    let id = JSON.parse(localStorage.getItem("currentUserDetails")).id;

    axios
      .get(Http + "/user/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        this.setState({ image: res.data["image"] });
      });
    window.addEventListener('scroll', this.handleScroll);

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY >= 1) {
      this.setState({ navbar: true });
    }
    else {
      this.setState({ navbar: false });
    }
  }



  render() {

    return (
      <div className={`navbars ${this.state.navbar ? "active" : null}`}>
        {this.state.isLoggedIn ? 
        (
          <div>
            <div className="container-fluid py-2" style={{ borderBottom: "2px solid #2827CC" }}>
              <div className="d-flex justify-content-between align-items-center px-4">
                <div>
                  <Link to="/" className="d-flex align-items-center" style={{ textDecoration: "none" }}>
                    <img src="/assets/images/logo1.png" className="img-fluid" style={{ width: "50px" }} alt="home"/>
                    <div className={`ml-2 font-weight-bold color5 ${this.state.navbar ? "text-white" : null}`} style={{ fontSize: "14px" }}>
                      CAMPAIGN <br /> MANAGEMENT{" "}
                    </div>
                  </Link>
                </div>
                <div className="d-flex align-items-center">
                  <div className="mx-3">
                    {
                      this.state.isLoggedIn.role !== "" ||
                      this.state.isLoggedIn.role !== undefined ||
                      this.state.isLoggedIn.role !== null ? 
                      (
                        <span className="fs-large text-capitalize" style={{ fontSize: "20px" }}>
                          {this.state.isLoggedIn.name}
                        </span>
                      ) : 
                      (
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          <button type="button" className="btn btn-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-box-arrow-left mr-2 align-content-center" viewBox="0 0 17 17">
                              <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                              <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                            </svg>
                            Logout
                          </button>
                        </Link>
                      )
                    }
                  </div>
                  <div className="header-dropdown">
                    {
                      this.state.image ? 
                      (
                        <img src={this.state.image} className="image-fluid w-2 h-2 rounded-circle" alt="image"/>
                      ) : 
                      (
                        <i className="bx bxs-user-circle fs-8  w-2 h-2  cursor-pointer"></i>
                      )
                    }
                    <div className="flex-column header-dropdown-content text-start">
                      <Link to="/profile" className="link" style={{ textDecoration: "none" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"></path>
                        </svg>
                        <span className="ml-1">Profile</span>
                      </Link>
                      {
                      this.state.isLoggedIn.role === "admin" ? 
                      (
                        <>
                          <Link to="/admin/dashboard" className="link" style={{ textDecoration: "none" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-speedometer2" viewBox="0 0 16 16" >
                              <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z" />
                              <path fillRule="evenodd"d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/>
                            </svg>{" "}
                            <span className="ml-1">Dashboard</span>
                          </Link>
                          <Link to="/admin/metrics" className="link" style={{ textDecoration: "none" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-graph-up" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"/>
                            </svg>{" "}
                            <span className="ml-1">Metrics</span>
                          </Link>
                          <Link to="/admin/user" className="link mt-2" style={{ textDecoration: "none" }} >
                            <i className="bx bx-user-plus" style={{ fontSize: "22px" }}></i>
                            <span className="ml-1"> Role Assign</span>
                          </Link>
                        </>
                      ) : 
                      (
                        [
                          this.state.isLoggedIn.role === "offer" ? 
                          (
                            <Link to="/offerCreation" className="link" style={{ textDecoration: "none" }}>
                              <i className="bx bx-category-alt" style={{ fontSize: "20px" }}></i>
                              <span className="ml-1"> Offer Creation</span>
                            </Link>
                          ) : 
                          (
                            [
                              this.state.isLoggedIn.role === "schedule" ? 
                              (
                                <Link to="/schedule" className="link" style={{ textDecoration: "none" }} >
                                  <i className="bx bx-calendar-check" style={{ fontSize: "20px" }}></i>
                                  <span className="ml-1"> Scheduling</span>
                                </Link>
                              ) : null,
                            ]
                          ),
                        ]
                      )}
                      <Link to="/login" className="link" style={{ textDecoration: "none" }} onClick={(e) => this.state.handleClick(e)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                          <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>{" "}
                        <span className="ml-1">
                          {" "}
                          {this.state.isLoggedIn ? " Logout" : " Login"}{" "}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Header;
