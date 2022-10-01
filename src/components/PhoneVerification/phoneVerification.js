import React, { Component } from 'react';
import classes from "./phoneVerification.module.css";
import axios from "axios";
import history from "../../utils/history";
import Notification from "../../services/NotificationService";
import { Link } from 'react-router-dom';
import Header from "../Header/Header";
import Http from "../../services/Variables";

class phoneVerification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            otp: "",
            loading: true
        }
    }


    componentDidMount() {
        Notification.show({ status: true, message: "checking mobile number validity" })
        let token = localStorage.getItem("currentUserToken");
        let number = JSON.parse(localStorage.getItem("currentUserDetails")).phone;
        number = "+91" + String(number);
        console.log(number)
        axios.post(Http+"/sms/generateOtp", { phoneNumber: number }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then((res) => {
            this.setState({ loading: false })
            Notification.show({ status: true, message: "Otp send to your registered Number" })
        }).catch(e => {
            Notification.show({ status: false, message: "Invalid Number please enter the valid number and save!!" })
            history.push("/profile")
        })

    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let token = localStorage.getItem("currentUserToken");
        axios.post(Http+"/sms/verifyPhoneNumber", { otp: this.state.otp }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then((res) => {
            this.setState({ loading: false });
            Notification.show({ status: true, message: "Phone verified successfully" })
            history.push("/profile")
        }).catch(e => {
            this.setState({ loading: false });
            Notification.show({ status: false, message: "Invalid OTP" })
            this.setState({ otp: "" })
        })

    }

    render() {
        return (
            <>
                <Header />
                <div style={{marginTop:'7rem'}}>
                {this.state.loading ? <h1 className="text-center d-flex justify-content-center align-items-start"><i class='bx bx-loader-circle bx-spin color5' style={{ fontSize: '80px', marginTop: '80px' }} ></i></h1> :
                    <div>
                        <h2 className="text-center mt-4" style={{ marginBottom: '50px' }}>Enter the Otp for Verification..</h2>
                        <div className={`m-auto  ${classes.phoneVerification} p-4`} >
                            <div className="form-group d-flex flex-column justify-content-center align-items-center position-relative">
                                <input
                                    type="text"
                                    className={`form-control ${classes.input}`}
                                    style={{ border: '1px solid #D3D3D3' }}
                                    required
                                    value={this.state.otp}
                                    onChange={(e) => this.setState({ otp: e.target.value })}
                                />
                                <label className={`${classes.label} text-muted align-self-start`}>Enter the otp <span className="text-danger">*</span></label>
                                <div>
                                    <button className={`${classes.button}`} onClick={this.onSubmit}>
                                        {this.state.loading ? <i className='bx bx-loader-circle bx-spin px-4'></i> : "Verify"}
                                    </button>
                                </div>
                            </div>
                            <Link to="/profile" className="d-flex justify-content-end text-capitalize" style={{ fontSize: '12px' }}>Back to profile</Link>
                        </div>
                    </div>
                    
                }
                </div>
            </>
        );
    }
}


export default phoneVerification;