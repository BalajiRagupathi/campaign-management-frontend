import { useState } from "react";

import { forgotPasswordRequest } from "../../services/AuthHttpRequest"

import Notification from "../../services/NotificationService"

/**
 * 
 * @returns Forgot Password Component
 */
const ForgotPassword = () => {
    const [validation, setValidation] = useState({})
    const [form, setForm] = useState({"email": ""})
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const validate = () => {
        const errors = {};
        const input = form;
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        errors["email"] = !input["email"] ? "": emailPattern.test(input["email"]) ? false : "Invalid Email Address"
        setValidation(errors)
        return errors["email"] === false ? true: false
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
            const response = await forgotPasswordRequest(form)
            Notification.show(response)
        }
        setForm({"email": ""});
        setIsValid(false)
        setLoading(false)
    }

    return (
        <div className="form-card linear-gradient w-26 m-auto text-start d-flex flex-column justify-content gap-4 box-shadow p-5 rounded-3">
            <h3>Forgot Password</h3>
            <div className={`${validation['email'] ? "invalid" : "" }`}>
                <label htmlFor="inputResetEmail" className="visually-hidden">Email address</label>
                <input type="text" name="email" id="inputResetEmail" value={form["email"]} className="form-control"
                    placeholder="Email address" autoFocus onChange={(e)=> handleChange(e)}/>
                { validation["email"] && <p className="error-message">{validation["email"]}</p> }
            </div>
            <p className="my-2 text-white">
                By clicking "Reset Password" you will receive otp in email
            </p>
            <button className="btn btn-light" disabled={!isValid} onClick={(e)=> handleSubmit(e)}>
                {loading ? (<i className='bx bx-loader-circle bx-spin'></i>) : "Reset Password"}
            </button>
        </div>
    )
}

export default ForgotPassword;