import { useState } from "react";
import { Link } from "react-router-dom";

import authService from "../../services/AuthService";

import Notification from "../../services/NotificationService"

/**
 * 
 * @returns Login Component
 */
const Login = () => {
    const [validation, setValidation] = useState({})
    const [form, setForm] = useState({ "email": "", "password": "" })
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const validate = () => {
        const input = form;
        const errors = {};
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/;

        errors["email"] = !input["email"] ? "" : emailPattern.test(input["email"]) ? false : "Invalid Email Address"
        errors["password"] = !input["password"] ? "" : passwordPattern.test(input["password"]) ? false : "Minimum 5 characters, at least one uppercase, lowercase , number and special character:"

        setValidation(errors)
        return (errors["email"] === false && errors["password"] === false) ? true : false
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
            const response = await authService.login(form)
            Notification.show(response)
        }
        setForm({ "email": "", "password": "" });
        setIsValid(false)
        setLoading(false)
    }
    return (
        <div className="d-flex justify-content-between flex-wrap px-3">
            <div className="col-md-6">
                <div className="mb-3 mg-l">
                    <div className="d-flex align-items-center justify-content-center">
                        <img className="w-3 ml-2" src="/assets/images/logo1.png" alt="campaign logo" />
                        <h2 className="ml-2 h1-text font-weight-bold">Campaign Management</h2>
                    </div>
                </div>
                <img className="d-none d-md-block" src="/assets/images/login_1.svg" alt="campaign sigin" style={{width:'92%'}} />
            </div>
             <div className="col-md-6 mt-3">
                <div className="m-auto col-12" style={{ width: '450px' }}>
                    <form onSubmit={(e) => handleSubmit(e)} className="text-start d-flex flex-column gap-4 box-shadow px-5 py-5 border-radius linear-gradient form-card ">
                        <div className="h3 mb-3 fw-normal d-flex justify-content-center align-items-center text-white">
                            <h1  className="title">Login</h1>
                            <i className='bx bx-log-in fs-7' ></i>
                        </div>
                        <div className={`${validation['email'] ? "invalid" : ""}`}>
                            <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
                            <input type="text" autoComplete="off" name="email" id="inputEmail" className="form-control text-white" value={form["email"]} placeholder="Email address" autoFocus onChange={(e) => handleChange(e)} />
                            {validation["email"] && <span className="error-message">{validation["email"]}</span>}
                        </div>
                        <div className={`${validation["password"] ? "invalid" : ""}`}>
                            <label htmlFor="inputPassword" className="visually-hidden">Password</label>
                            <input type="password" autoComplete="off" name="password" id="inputPassword" className="form-control text-white" value={form["password"]} placeholder="Password" onChange={(e) => handleChange(e)} />
                            {validation["password"] && <span className="error-message">{validation["password"]}</span>}
                        </div>
                        <Link to="/forgot-password" className="align-self-end text-white">
                            Forgot Password?
                        </Link>
                        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                            <button className="w-50 btn btn-lg btn-light" type="submit" disabled={!isValid}>
                                {loading ? <i className='bx bx-loader-circle bx-spin' ></i> : "Signin"}
                            </button>
                            <p className="text-black">Don't have an account ? <Link to="/signup" className="color1">Signup</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Login;