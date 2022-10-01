import { useState } from "react";
import { Link } from "react-router-dom";

import Notification from "../../services/NotificationService";

import authService from "../../services/AuthService";

/**
 * 
 * @returns Signup Component
 */
const Signup = () => {
    const [validation, setValidation] = useState({
        "username": "",
        "email": "",
        "password": "",
        "checkPassword": "",
        "phone": ""
    })
    const [form, setForm] = useState({})
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)

    const validate = () => {
        const input = form;
        const errors = {};
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/;
        const phonePattern = /^[5-9]{1}[0-9]{9}$/
        const usernamePattern = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/

        errors["username"] = !input["username"] ? "" : usernamePattern.test(input["username"]) ? false : "Minimum 5 characters without empty space "
        errors["email"] = !input["email"] ? "" : emailPattern.test(input["email"]) ? false : "Invalid Email Address"
        errors["password"] = !input["password"] ? "" : passwordPattern.test(input["password"]) ? false : "Minimum 5 characters, at least one uppercase, lowercase , number and special character:"
        errors["checkPassword"] = !input["checkPassword"] ? "" : input["password"] === input["checkPassword"] ? false : "Password mismatch"
        errors["phone"] = !input["phone"] ? "" : phonePattern.test(input["phone"]) ? false : "Invalid phone Number"

        setValidation(errors)
        return (errors["email"] === false && errors["password"] === false && errors["checkPassword"] === false && errors["phone"] === false) ? true : false
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
        if (validate() === true) {
            setIsValid(false)
            const requestBody = {
                "name": form["username"],
                "email": form["email"],
                "phone": form["phone"],
                "password": form["password"],
                "role": "user"
            }
            const response = await authService.signup(requestBody);
            Notification.show(response)
        }
        setForm({
            "username": "",
            "email": "",
            "password": "",
            "checkPassword": "",
            "phone": ""
        });
        setIsValid(false)
        setLoading(false)
    }


    return (
        <div className="d-flex justify-content-between flex-wrap px-2">
            <div className="col-md-6 mt-3">
                <div className="mg-l">
                    <div className="d-flex align-items-center justify-content-center">
                        <img className="w-3 ml-2" src="/assets/images/logo1.png" alt="campaign logo" />
                        <h2 className="ml-2 h1-text font-weight-bold">Campaign Management</h2>
                    </div>
                </div>
                <img className="mt-10 d-none d-md-block" src="/assets/images/key_signup.svg" alt="campaign sigin" style={{ width: '100%' }} />
            </div>
            <div className="col-md-6 mt-3" >
                <div className="m-auto col-12 border-radius" style={{ width: '450px' }}>
                    <form onSubmit={(e) => handleSubmit(e)} className="signup-card w-100 text-start d-flex flex-column gap-4 box-shadow px-5 py-4 border-radius linear-gradient form-card">
                        <div className="text-white h3 mb-3 fw-normal d-flex justify-content-center align-items-center">
                            <h1 className="title">Signup</h1>
                            <i className='bx bx-log-in fs-7' ></i>
                        </div>
                        <div className={`${validation['username'] ? "invalid" : ""}`}>
                            <label htmlFor="inputUsername" className="visually-hidden">Username</label>
                            <input type="text" autoComplete="off" name="username" id="inputUsername" value={form["username"]} className="form-control  text-white" placeholder="Username" autoFocus onChange={(e) => handleChange(e)} />
                            {validation["username"] && <span className="error-message">{validation["username"]}</span>}
                        </div>
                        <div className={`${validation['email'] ? "invalid" : ""}`}>
                            <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
                            <input type="text" autoComplete="off" name="email" id="inputEmail" value={form["email"]} className="form-control text-white" placeholder="Email address" onChange={(e) => handleChange(e)} />
                            {validation["email"] && <span className="error-message">{validation["email"]}</span>}
                        </div>
                        <div className={`${validation["phone"] ? "invalid" : ""}`}>
                            <label htmlFor="inputPhone" className="visually-hidden">Phone Number</label>
                            <input type="text" autoComplete="off" name="phone" id="inputPhone" value={form["phone"]} className="form-control text-white" placeholder="Phone Number" onChange={(e) => handleChange(e)} />
                            {validation["phone"] && <span className="error-message">{validation["phone"]}</span>}
                        </div>
                        <div className={`${validation["password"] ? "invalid" : ""}`}>
                            <label htmlFor="inputPassword" className="visually-hidden">Password</label>
                            <input type="password" autoComplete="off" name="password" id="inputPassword" value={form["password"]} className="form-control text-white" placeholder="Password" onChange={(e) => handleChange(e)} />
                            {validation["password"] && <span className="error-message">{validation["password"]}</span>}
                        </div>
                        <div className={`${validation["checkPassword"] ? "invalid" : ""}`}>
                            <label htmlFor="inputCheckPassword" className="visually-hidden">Re enter Password</label>
                            <input type="password" autoComplete="off" name="checkPassword" id="inputCheckPassword" value={form["checkPassword"]} className="form-control text-white" placeholder="Re enter Password" onChange={(e) => handleChange(e)} />
                            {validation["checkPassword"] && <span className="error-message">{validation["checkPassword"]}</span>}
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                            <button className="cursor-disabled w-50 btn btn-lg btn-light btn-sm-block" type="submit" disabled={!isValid}>
                                {loading ? (<i className='bx bx-loader-circle bx-spin' ></i>) : "Signup"}
                            </button>
                            <p className="text-black">Already have an account ?
                            <Link to="/login" className="text-white" >
                                        Login
                            </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Signup;