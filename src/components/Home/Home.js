import { useState } from "react"
import authService from "../../services/AuthService"
import {AdminRole, OfferRole, ScheduleRole} from "./UserRole";

/* Style */
import "./Home.css";

/**
 * 
 * @returns Home Component
 */

const Home = () => {

    const [userRole, setUserRole] = useState(authService.getCurrentUserRole())

    return (
        <div className="margin-top">
            <div className="campaign-container p-4 d-flex flex-column flex-md-row justify-content-center align-items-center gap-4">
                <div className="text-container">
                    <h3 className="color5 font-weight-bold fs-7">Campaign Management</h3>
                    <p className="w-75">Campaign management is the planning, execution, tracking, and analysis of a marketing
                        initiative; sometimes centered on a new product launch or an event. Campaigns normally involve multiple
                        pushes to potential buyers through email, social media, surveys, print materials, giveaways, etc</p>
                    <div className="">
                        {
                        userRole === "admin" ? (
                        <AdminRole />) : userRole === "offer" ? (
                        <OfferRole />) : userRole === "schedule" ? (
                        <ScheduleRole />) : (<h1>Currently you don't assigned for any role</h1>)
                        }
                    </div>
                </div>
                <div className="img-fluid">
                    <img src="/assets/images/campaign_management.svg" alt="campaign_management" className=" w-100" />
                </div>
            </div>
            <div className="showcase-card grid-3 gap-5 align-items-center justify-content-center my-5 text-center">
                <div className="col d-flex flex-column p-3 box-shadow border rounded-3 justify-content-center align-items-center gap-3">
                    <img className="w-10" src="/assets/images/analytics.svg" alt="analytics" />
                    <h4>Analytics</h4>
                    <p>Realtime Analytics with graphical visualization with high accuracy</p>
                    <div className="btn btn-primary">
                        Read More
                    </div>
                </div>
                <div className="col d-flex flex-column p-3 box-shadow border rounded-3 justify-content-center align-items-center gap-3">
                    <img className="w-10" src="/assets/images/sms_marketing.svg" alt="sms_marketing" />
                    <h4>SMS Marketing</h4>
                    <p>Send instant sms messages without wasting time. </p>
                    <div className="btn btn-primary">
                        Read More
                    </div>
                </div>
                <div className="col d-flex flex-column p-3 box-shadow border rounded-3 justify-content-center align-items-center gap-3">
                    <img className="w-10" src="/assets/images/email_marketing.svg" alt="email_marketing" />
                    <h4>Email Marketing</h4>
                    <p>Send emails for bulk clients with html responsive template</p>
                    <div className="btn btn-primary">
                        Read More
                    </div>
                </div>
                <div
                    className="col d-flex flex-column p-3 box-shadow border rounded-3 justify-content-center align-items-center gap-3">
                    <img className="w-10" src="/assets/images/create.svg" alt="create offer" />
                    <h4>Create Offer</h4>
                    <p>Create new marketing post quickly.</p>
                    <div className="btn btn-primary">
                        Read More
                    </div>
                </div>
                <div className="col d-flex flex-column p-3 box-shadow border rounded-3 justify-content-center align-items-center gap-3 ">
                    <img className="w-10" src="/assets/images/schedule.svg" alt="schedule offer" />
                    <h4>Schedule Offer</h4>
                    <p>Scheduled marketing in a particular time </p>
                    <div className="btn btn-primary">
                        Read More
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-md-row  p-4 align-items-center justify-content-center mx-auto bg-4">
                <div className=" d-flex flex-column gap-5 align-items-start justify-content-start">
                    <h1 className=" text-sm-medium">
                        Let’s talk about what Marketing Campaign Management can do for your business.
                    </h1>
                    <button className="btn btn-primary rounded">Request Demo</button>
                </div>
                <img className="w-75" src="/assets/images/lets_talk.svg" alt="lets_talk" />
            </div>
        </div>
    )
};

export default Home; 