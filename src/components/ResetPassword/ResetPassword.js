import { useState } from "react";
import {Link} from "react-router-dom";

import { resetPasswordRequest } from "../../services/AuthHttpRequest"

import Notification from "../../services/NotificationService"

const ResetPassword = () => {
    const [validation, setValidation] = useState({})
    const [form, setForm] = useState({"otp": "","password": "","checkPassword": ""})
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const validate = () => {
        const errors = {}
        const input = form;
        const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/;
        const otpPattern =/^[0-9]{5}$/ 

        errors["password"] = !input["password"] ? "": passwordPattern.test(input["password"]) ? false : "Minimum 5 characters, at least one uppercase, lowercase , number and special character:"
        errors["checkPassword"] = !input["checkPassword"] ? "": input["password"]===input["checkPassword"] ? false : "Password mismatch"
        errors["otp"] = !input["otp"] ? "": otpPattern.test(input["otp"]) ? false : "5 Digit Number Only"
        setValidation(errors)
        return ( errors["otp"] === false && errors["password"] === false && errors["checkPassword"] === false ) ? true: false
    }

    const handleChange = (event) => {
        let input = form;
        input[event.target.name] = event.target.value;
        setForm(input)
        setIsValid(validate())
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if(validate() === true){
            setIsValid(false)
            const requestData = {
                "password": form["password"],
                "otp": form["otp"]
            }

            const response = await resetPasswordRequest(requestData)
            Notification.show(response)
        }
        setForm({"otp": "","password": "","checkPassword": ""});
        setIsValid(false)
        setLoading(false)
    }

    return (
        <div className="form-card linear-gradient w-26 m-auto text-start d-flex flex-column justify-content gap-4 box-shadow p-5 rounded-3">
            <h3>Reset Password</h3>
            <div className={`${validation["otp"] ? "invalid": ""}`}>
                <label htmlFor="inputResetOtp" className="visually-hidden">Enter OTP (One Time Password)</label>
                <input type="text" name="otp" id="inputResetOtp" value={form["otp"]} className="form-control" placeholder="Enter OTP" onChange={ (e) => handleChange(e) } />
                { validation["otp"] && <p className="error-message">{validation["otp"]}</p>  }
            </div>
            <div className={`${validation["password"] ? "invalid": ""}`}>
                <label htmlFor="inputResetPassword" className="visually-hidden">Enter New Password</label>
                <input type="password" name="password" id="inputResetPassword" value={form["password"]} className="form-control" placeholder="Enter New Password" onChange={ (e) => handleChange(e) } />
                { validation["password"] && <p className="error-message">{validation["password"]}</p>  }
            </div>
            <div className={`${validation["checkPassword"] ? "invalid": ""}`}>
                <label htmlFor="inputCheckResetPassword" className="visually-hidden">Confirm New Password</label>
                <input type="password" name="checkPassword" id="inputCheckResetPassword" value={form["checkPassword"]} className="form-control" placeholder="Confirm New Password" onChange={ (e) => handleChange(e) } />
                { validation["checkPassword"] && <p className="error-message">{validation["checkPassword"]}</p>  }
            </div>
            <p className="my-2 text-white">
                    By clicking "Confirm" your password will be updated
                </p>
            <button className="btn btn-light" disabled={!isValid} onClick={(e) => handleSubmit(e)}>
                {loading ? (<i className='bx bx-loader-circle bx-spin' ></i>) : "Confirm"}
            </button>
            <Link to="/forgot-password" className="align-self-end text-white">
                    Resend OTP?
            </Link>
        </div>
    )
}

export default ResetPassword;