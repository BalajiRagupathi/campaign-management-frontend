import React from "react";
import classes from "../components/Verification/emailverification.module.css";

const EmailVerification = (props) => {


    return (
        <div className={`container ${classes.message} text-center p-5`}>
            <div className={`${classes.check}`}>
                <i className={`${classes.bx} bx bx-check`}></i>
            </div>
            <div className={`${classes.text}`}>
                <p className={`${classes.lead} lead text-capitalize mt-3`}> Hey {props.match.params.name} your Verification has been successfully done and your data has been stored in our database</p>
                <p className={`text-capitalize ${classes.para} text-muted`}>please click the below button to continue with login</p>
                <a className={`btn btn-success btn-lg px-5 `}
                    href="https://campaign-management-frontend.vercel.app/login">Login</a>
            </div>
        </div>
    )
}

export default EmailVerification;
