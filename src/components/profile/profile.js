import React, { Component } from "react";
import classes from "./profile.module.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header"
import Firebase from "../firebase/firebase_configure";
import Http from "../../services/Variables";
import Notification from "../../services/NotificationService";

class Profile extends Component {

    state = {
        selectedDate: null,
        data: {},
        loading: true,
        edit: false
    }


    onCalendarChange = (date) => {
        this.setState({ selectedDate: date });
    }

    onToggle = (e) => {
        e.preventDefault();
        this.setState({ display: !this.state.display })
    }

    componentDidMount() {

        let token = localStorage.getItem("currentUserToken");
        let id = JSON.parse(localStorage.getItem("currentUserDetails")).id;

        axios.get(Http + "/user/" + id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then((res) => {
            this.setState({ selectedDate: res.data['dob'] })
            this.setState({ data: res.data, loading: false })
        })
    }

    onImageUpload = (url) => {
        let newObj = { ...this.state.data }
        newObj['image'] = url;
        this.setState({ data: newObj, edit: true });
    }

    onEventHandler = (e) => {
        let newObj = { ...this.state.data }
        newObj[e.target.name] = e.target.value
        this.setState({ data: newObj });
    }

    onSubmit = (e) => {
        this.setState({ loading: true })
        e.preventDefault();
        let newObj = { ...this.state.data }
        newObj['dob'] = this.state.selectedDate;
        this.setState({ data: newObj });
        console.log(newObj)

        let token = localStorage.getItem("currentUserToken");
        let id = JSON.parse(localStorage.getItem("currentUserDetails")).id;

        axios.put(Http + "/user/" + id, newObj, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then((res) => {
            // console.log(res.data)
            Notification.show({ status: true, message: "profile updated successfully!!" })
            this.setState({ selectedDate: res.data['dob'] })
            this.setState({ data: res.data, loading: false, edit: false })
        })

    }

    render() {
        return (
            <div className="margin-top">
                <Header />

                    {this.state.loading ? <h1 className="text-center d-flex justify-content-center align-items-start"><i className='bx bx-loader-circle bx-spin color5' style={{ fontSize: '80px', marginTop: '80px' }} ></i></h1> :


                        <div className={`${classes.profile}`} >
                            <div className="my-4  text-center d-flex flex-column justify-content-center align-items-center" style={{ display: 'block' }}>
                                <Firebase img={this.state.data['image']} onChange={this.onImageUpload} />
                            </div>

                            <div className="px-5">
                                <form>
                                    <div className="row mt-2">

                                        <div className="col-md form-group">
                                            <lablel className="text-muted">First Name</lablel>
                                            <input
                                                type="text" className="form-control mt-2 disabled"
                                                style={{ border: "1px solid #D3D3D3", backgroundColor: '#fff' }}
                                                value={this.state.data['name']}
                                                disabled={!this.state.edit}
                                                name="name"
                                                onChange={this.onEventHandler}
                                            />
                                        </div>

                                        <div className="col-md form-group">
                                            <lablel className="text-muted">Last Name</lablel>
                                            <input
                                                type="text"
                                                className="form-control  mt-2"
                                                style={{ border: "1px solid #D3D3D3", backgroundColor: '#fff' }}
                                                value={this.state.data['name']}
                                                disabled={!this.state.edit}
                                                name="name"
                                                onChange={this.onEventHandler}
                                            />
                                        </div>
                                    </div>


                                    <div className="row mt-2">
                                        <div className="col-md form-group">
                                            <lablel className="text-muted">Email</lablel>
                                            <input
                                                type="email"
                                                className="form-control mt-2 is-valid"
                                                style={{ border: "1px solid #D3D3D3" }}
                                                value={this.state.data['email']}
                                                readOnly
                                            />
                                            <span className="d-flex justify-content-end text-success text-right" style={{ fontSize: '10px' }}>Verified</span>
                                        </div>
                                        <div className="col-md form-group">
                                            <lablel className="text-muted">Mobile Number</lablel>
                                            <input
                                                type="number"
                                                className={`form-control  mt-2 is-${this.state.data["mbverify"] ? "valid" : "invalid"}`}
                                                style={{ border: `1px solid ${this.state.data["mbverify"] ? "#D3D3D3" : "salamon"}`, backgroundColor: '#fff' }}
                                                value={this.state.data['phone']}
                                                disabled={!this.state.edit}
                                                name="phone"
                                                onChange={this.onEventHandler}

                                            />
                                            <span className="" style={{ fontSize: '12px' }}>
                                                {this.state.data["mbverify"] ? <span className="d-flex justify-content-end text-success text-right" style={{ fontSize: '10px' }}>Verified</span>
                                                    :
                                                    <Link to="/phoneVerification" className=" ml-2 text-danger text-capitalize"> Please verify the phone number <span className="badge badge-danger p-1 ">Click here</span>
                                                    </Link>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md form-group">
                                            <lablel className="text-muted"> Gender</lablel>
                                            <select
                                                for="gender" className="form-control mt-2"
                                                id="gender"
                                                disabled={!this.state.edit}
                                                style={{ border: "1px solid #D3D3D3", backgroundColor: '#fff' }}
                                                name="gender"
                                                onChange={this.onEventHandler}
                                                value={this.state.data['gender']}
                                            >
                                                <option value="">Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                            <span className="d-flex justify-content-between">
                                                <div></div>
                                                <i className='bx bxs-down-arrow text-muted position-relative cursor-pointer align-self-end' style={{ top: '-29px', left: '-8px' }}></i>
                                            </span>
                                        </div>
                                        <div className="col-md form-group">
                                            <lablel className="text-muted d-block">DOB
                                        <i className='bx bx-calendar ml-2'></i>
                                            </lablel>
                                            <DatePicker
                                                isClearable
                                                showYearDropdown
                                                scrollableMonthYearDropdown
                                                className="form-control border border-secondary mt-2"
                                                selected={this.state.selectedDate}
                                                onChange={(date) => this.setState({ selectedDate: date })}
                                                disabled={!this.state.edit}
                                            />
                                        </div>
                                    </div>

                                    <div className="my-4 row justify-content-between">

                                        <div className="col-md-6 p-2">
                                            {this.state.edit ?
                                                <div>
                                                    <button className={`btn btn-outline-secondary mr-3 text-uppercase rounded px-4 ${this.state.edit ? "" : "disabled"}`} onClick={() => this.setState({ edit: false })}>
                                                        <i className="fa fa-times mr-2" aria-hidden="true"></i>
                                                   Cancel
                                                </button>

                                                    <button className="btn btn-success text-uppercase rounded px-4" disabled={!this.state.edit} onClick={this.onSubmit} >
                                                        <i className='bx bx-badge-check mr-2'></i>
                                                     Save
                                                </button>
                                                </div> :
                                                <button className="btn btn-info text-uppercase rounded px-4" onClick={() => this.setState({ edit: true })}>
                                                    <i className='bx bxs-edit mr-2'></i>
                                            Edit
                                        </button>

                                            }
                                        </div>
                                        <div className="col-md-6 p-2">
                                            <Link to="/profile/changePassword"
                                                className=" text-right btn btn-secondary text-capitalize rounded py-2 "
                                            >
                                                <i className='bx bx-log-out mr-2'></i>
                                        Change password
                                    </Link>
                                        </div>

                                    </div>

                                </form>
                            </div>

                        </div>

                    }
            </div>
        )
    }
}


export default Profile;
