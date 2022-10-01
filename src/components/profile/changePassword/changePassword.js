import React, { Component } from 'react';
import classes from "./modal.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import history from "../../../utils/history";
import Notification from "../../../services/NotificationService";
import Header from '../../Header/Header';
import Http from "../../../services/Variables";




class ChangePassword extends Component {


    state = {
        oldPass: "",
        newPass: "",
        confirmPass: "",
        loading: false,
        error: {},
        confirmError: false,
        valid: false
    }

    validation = (key, value) => {

        const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/;

        let newObj = { ...this.state.error }

        if (key[0] === "oldPass") {
            newObj[key[0]] = passwordPattern.test(value) ? false : true;
        }
        else if (key[0] === "newPass") {
            newObj[key[0]] = passwordPattern.test(value) ? false : true;
        }
        else if (key[0] === "confirmPass") {
            newObj[key[0]] = passwordPattern.test(value) ? false : true;
        }
        this.setState({ error: newObj })
    }

    onEventHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.validation([e.target.name], e.target.value)
            this.onPasswordConfirmation()
        });

        if (e.target.value === "") {
            let newObj = { ...this.state.error }
            newObj[e.target.name] = false
            this.setState({ error: newObj, confirmError: false })
        }
        this.onValid()

    }


    onValid = () => {
        console.log(this.state.error['oldPass'], this.state.error['newPass'], this.state.error['confirmPass'], this.state.confirmError)
        if (this.state.error['oldPass'] === false
            && this.state.error['newPass'] === false
            && this.state.error['confirmPass'] === false
            && !this.state.confirmError) {
            this.setState({ valid: true })
        }
        else {
            this.setState({ valid: false })
        }
    }

    onPasswordConfirmation() {
        if (this.state.confirmPass !== "" && this.state.newPass !== "") {
            if (this.state.confirmPass !== this.state.newPass) {
                this.setState({ confirmError: true })
            } else {
                this.setState({ confirmError: false }, () => {
                    this.onValid()
                })
            }
        }
    }


    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        let token = localStorage.getItem("currentUserToken");
        let email = localStorage.getItem("currentUserEmail");

        let newData = {
            "email": email,
            "oldPassword": this.state.oldPass,
            "newPassword": this.state.newPass
        }

        console.log(newData)

        axios.post(Http + "/user/newpassword", newData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then((res) => {
            this.setState({ loading: false, error: {} })
            history.push("/profile")
            Notification.show({ status: true, message: "password changed successfully" })
        }).catch(e => {
            this.setState({
                oldPass: "",
                newPass: "",
                confirmPass: "",
                loading: false,
                error: {},
                confirmError: false,
                valid: false
            })
            Notification.show({ status: false, message: "old password wrong" })
        })


    }






    render() {
        return (
            <>
                <Header />
                <div className={`card  card-form`} style={{ border: 'none', marginTop: '7rem' }}>
                    <div className={`card-body align-self-center ${classes.card} `} style={{ width: '70%' }}>
                        <div className="d-flex justify-content-between">
                            <div style={{ fontSize: '18px' }}>Change Password</div>
                            <Link to="/profile">
                                <i className='bx bx-x text-white bg-secondary rounded-circle' style={{ fontSize: '35px' }}></i>
                            </Link>
                        </div>


                        <form>
                            <div className="form-group mt-3">
                                <lablel className="text-muted">Old Password <span className="text-danger">*</span> </lablel>
                                <input
                                    type="password"
                                    className="mt-2 form-control"
                                    style={{ border: "1px solid #D3D3D3" }}
                                    name="oldPass"
                                    value={this.state.oldPass}
                                    onChange={this.onEventHandler}
                                />
                                {this.state.error['oldPass'] && <span className="text-danger text-capitalize" style={{ fontSize: '12px' }}>Minimum 5 characters, at least one uppercase, lowercase , number and special character:</span>}
                            </div>
                            <div className="form-group mt-3">
                                <lablel className="text-muted">New Password <span className="text-danger">*</span></lablel>
                                <input
                                    type="password"
                                    className="mt-2 form-control"
                                    style={{ border: "1px solid #D3D3D3" }}
                                    name="newPass"
                                    value={this.state.newPass}
                                    onChange={this.onEventHandler}
                                />
                                {this.state.error['newPass'] && <span className="text-danger text-capitalize" style={{ fontSize: '12px' }}>Minimum 5 characters, at least one uppercase, lowercase , number and special character:</span>}

                            </div>
                            <div className="form-group mt-3">
                                <lablel className="text-muted">Retype New Password <span className="text-danger">*</span></lablel>
                                <input
                                    type="password"
                                    className="mt-2 form-control"
                                    style={{ border: "1px solid #D3D3D3" }}
                                    name="confirmPass"
                                    value={this.state.confirmPass}
                                    onChange={this.onEventHandler}
                                    disabled={this.state.newPass === ""}
                                />
                                {this.state.confirmError && <span className="text-danger text-capitalize" style={{ fontSize: '12px' }}>Password Mismatch</span>}
                            </div>

                            <button
                                className="btn btn-primary py-2 px-2 text-uppercase"
                                onClick={this.onSubmit} style={{ opacity: `${this.state.loading || !this.state.valid ? '0.5' : '1'}` }}
                                disabled={!this.state.valid}
                            >
                                {this.state.loading ? <i className='bx bx-loader-circle bx-spin px-4'></i> : "change"}

                            </button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default ChangePassword;