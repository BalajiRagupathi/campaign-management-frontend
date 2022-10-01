import { Link } from "react-router-dom";

const AdminRole = () => {
    return (
        <div className="d-flex flex-column">
            <h4 className="color5 my-3">You logged in as Admin</h4>
            <div className="d-flex flex-column flex-md-row justify-content-start align-items-center gap-4">
                <Link to="/admin/dashboard" className=" btn btn-primary">Dashboard</Link>
                <Link to="/admin/user" className=" btn btn-primary">Assign User Role</Link>
                <Link to="/admin/metrics" className=" btn btn-primary">Analytics</Link>
            </div>
        </div>
    )
}

const OfferRole = () => {
    return (
        <div className="d-flex flex-column">
            <h4 className="color5 my-3">You logged in as offer Creator</h4>
            <Link to="/offerCreation" className=" btn btn-primary align-self-start">Create Offer</Link>
        </div>
    )
}

const ScheduleRole = () => {
    return (
        <div className="d-flex flex-column">
            <h4 className="color5 my-3">You logged in as offer Schedular</h4>
            <Link to="/schedule" className="btn btn-primary align-self-start">Schedule Post</Link>
        </div>
    )
}

export {
    AdminRole,
    OfferRole,
    ScheduleRole
}