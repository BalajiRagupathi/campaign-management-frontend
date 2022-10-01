import React, { Component } from "react";
import axios from "axios";
import { CSVReader } from "react-papaparse";

import Table from "../components/Table/Table";
import Header from "../components/Header/Header";
import { to_schedule_offer_columns, customer_columns, scheduled_column } from "../services/TableColumns";
import Http from "../services/Variables";
import AuthService from "../services/AuthService";
import authService from "../services/AuthService";

class Schedule extends Component {

    state = {
        user: {},
        jsonData: [],
        allOffersToSchedulesData: [],
        offersToSchedulesStatus: null,
        OffersToSchedulesMessage: "",
        isScheduled: false,
        allScheduedData: [],
        scheduledStatus: null,
        scheduledMessage: "",
        isScheduleUpdated: false,
        allCustomersData: [],
        customerStatus: null,
        customerMessage: "",
    };

    componentDidMount() {
        const userDetails = AuthService.getCurrentUserDetails();
        this.setState({ user: userDetails });
        this.getNonScheduledOffer();
        this.getScheduledData();
        this.getCustomers();
    }

    // Get non scheduled offers

    async getNonScheduledOffer() {

        this.setState({ OffersToSchedulesMessage: null, OffersToSchedulesMessage: "", });

        axios
        .get(`${Http}/offer/notScheduledOffer`, {
            headers: {
            "Content-Type": "application/json",
            Authorization: authService.getCurrentUserToken(),
            },
        })
        .then((res) => {

            if (res.data.length > 0)
                this.setState({ allOffersToSchedulesData: [...res.data], offersToSchedulesStatus: true, OffersToSchedulesMessage: "", });
            else if (res.data.length === 0)
                this.setState({ offersToSchedulesStatus: false, OffersToSchedulesMessage: "No offer to get scheduled", });
            else
                this.setState({ offersToSchedulesStatus: false, OffersToSchedulesMessage: res.data.message, });
        })
        .catch((e) => {
            console.log(e);
        });
    }

    // Update offer

    async updateOffer(schedule_update, value) {

        this.setState({ OffersToSchedulesMessage: null, OffersToSchedulesMessage: "", });

        axios
        .put(
            `${Http}/offer/${schedule_update.offer_id}`,
            { status: value },
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("currentUserToken"),
            },
            }
        )
        .then((res) => {
            this.getNonScheduledOffer();
            this.getScheduledData();
            return res;
        })
        .catch((e) => {
            console.log(e);
            this.getNonScheduledOffer();
            this.getScheduledData();
        });
    }

    // Schedule Offers

    async scheduleOffer(schedule_update) {
        this.setState({ offersToSchedulesStatus: null, OffersToSchedulesMessage: "", });

        axios
        .post(
            `${Http}/schedule/${this.state.user.id}/${schedule_update.offer_id}`,
            { scheduled_at: schedule_update.schedule_at.replaceAll("T", " ") },
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("currentUserToken"),
            },
            }
        )
        .then((res) => {
            this.updateOffer(schedule_update, "scheduled");
        })
        .catch((e) => {
            console.log(e);
            this.getNonScheduledOffer();
            this.getScheduledData();
        });

        return schedule_update;
    }

    // Get scheduled Data

    async getScheduledData() {
        this.setState({ scheduledStatus: null, scheduledMessage: "", isScheduleUpdated: false, });

        axios
        .get(`${Http}/schedule/`, {
            headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("currentUserToken"),
            },
        })
        .then((res) => {
            
            if (res.data.length > 0){
                let arr = [...res.data];                
                this.setState({ allScheduedData: arr, scheduledStatus: true, scheduledMessage: "",});
            }
            else if (res.data.length === 0)
            this.setState({ scheduledStatus: false, scheduledMessage: "Schedule is Empty", });
            else
            this.setState({ scheduledStatus: false, scheduledMessage: res.data.message, });
        });
    }

    // Update scheduled data

    async updateSchedule(scheduleUpdate) {
        this.setState({ scheduledStatus: null, scheduledMessage: "" });

        axios
        .put(
            `${Http}/schedule/update/${this.state.user.id}/${scheduleUpdate.offer_id.offer_id}/${scheduleUpdate.schedule_id}`,
            { scheduled_at: scheduleUpdate.scheduled_at.replaceAll("T", " ") },
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("currentUserToken"),
            },
            }
        )
        .then((res) => {
            this.getScheduledData();
        })
        .catch((e) => {
            console.log(e);
            this.getNonScheduledOffer();
            this.getScheduledData();
        });
    }

    // Delete scheduled data

    async deleteSchedule(scheduleDelete) {

        this.setState({ scheduledStatus: null, scheduledMessage: "" });
        this.setState({ offersToSchedulesStatus: null, OffersToSchedulesMessage: "", });

        axios
        .delete(
            `${Http}/schedule/delete/${this.state.user.id}/${scheduleDelete.offer_id.offer_id}/${scheduleDelete.schedule_id}`,
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("currentUserToken"),
            },
            }
        )
        .then((res) => {
            this.updateOffer(scheduleDelete.offer_id, "pending");
        })
        .catch((e) => {
            console.log(e);
            this.getNonScheduledOffer();
            this.getScheduledData();
        });
    }

    // Get customers data

    async getCustomers() {
        this.setState({ customerStatus: null, customerMessage: "" });

        axios
        .get(`${Http}/customer/`, {
            headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("currentUserToken"),
            },
        })
        .then((res) => {
            if (res.data.length > 0)
                this.setState({ allCustomersData: [...res.data], customerStatus: true, customerMessage: "", });
            else if (res.data.length === 0)
                this.setState({ customerStatus: false, customerMessage: "Customer is empty", });
            else
                this.setState({ customerStatus: false, customerMessage: res.data.message,});
        })
        .catch((e) => {
            console.log(e);
        });
    }

    // Add customers

    async addCustomers(customersData) {
        this.setState({ customerStatus: null });

        axios
        .post(
            `${Http}/customer/upload`,
            customersData,
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("currentUserToken"),
            },
            }
        )
        .then((res) => {
            this.getCustomers();
        })
        .catch((e) => {
            console.log(e);
            this.getCustomers();
        });
    }

    //Store converted json data into state
    updateState(data) {
        let temp = [];

        for (let i = 1; i < data.length; i++) {
            let js = {};

            for (let j = 0; j < data[i].data.length; j++)
                js[data[0].data[j] + ""] = data[i].data[j];
                
            temp.push(js);
        }

        this.setState({ jsonData: [...temp] });
        console.log("------------State stored---------------");
        console.log(this.state.jsonData);
        console.log("------------State stored---------------");
        this.addCustomers(this.state.jsonData);
    }

    //Drop csv
    handleOnDrop = (data) => {
        console.log("------------Converted---------------");
        console.log(data);
        this.updateState(data);
        console.log("------------Converted---------------");
    };

    //Errors
    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };

    //Removing File
    handleOnRemoveFile = (data) => {
        console.log("-------------Remove--------------");
        console.log(data);
        console.log("-------------Remove--------------");
    };

    render() {

        // Non Schedule's custom colum
        const customColumn = [
        {
            id: "Schedule_At",
            Header: "Schedule At",
            accessor: "schedule_at",
            Cell: ({ row }) => {
            let today = new Date();

            let month =
                today.getMonth().toString().length === 1
                ? "0" + (today.getMonth() + 1)
                : today.getMonth();
            let maxDate =
                today.getFullYear() +
                5 +
                "-" +
                month +
                "-" +
                today.getDate() +
                "T" +
                "00:00:00";

            return (
                <input
                type="datetime-local"
                min={today.toISOString().split(".")[0]}
                onChange={(e) => {
                    row.original.schedule_at = e.target.value;

                    this.setState({ isScheduled: true });
                }}
                max={maxDate}
                />
            );
            },
        },
        {
            id: "Trigger",
            Header: "Trigger",
            Cell: ({ row }) => {
            let today = new Date();
            return (
                <button
                onClick={(e) => {
                    this.scheduleOffer(row.original)
                    .then((res) => res)
                    .catch((e) => console.log(e));
                }}
                className={
                    !this.state.isScheduled ||
                    today.toISOString() >= row.original.schedule_at
                    ? "btn btn-danger"
                    : "btn btn-primary"
                }
                disabled={
                    !this.state.isScheduled ||
                    today.toISOString() >= row.original.schedule_at
                    ? true
                    : false
                }
                >
                Schedule
                </button>
            );
            },
        },
        ];

        // Schedule's custom column

        const customColumnScheduled = [
        {
            id: "Edit_Schedule_At",
            Header: "Edit Schedule",
            accessor: "scheduled_at",
            Cell: ({ row }) => {
            let today = new Date();
            let rowDate = new Date(row.original.scheduled_at);
            let month =
                today.getMonth().toString().length === 1
                ? "0" + (today.getMonth() + 1)
                : today.getMonth();

            let maxDate =
                today.getFullYear() +
                5 +
                "-" +
                month +
                "-" +
                today.getDate() +
                "T" +
                "00:00:00";
            return (
                <input
                type="datetime-local"
                value={row.original.scheduled_at.replaceAll(" ", "T")}
                min={today.toISOString().split(".")[0]}
                disabled={
                    today.getFullYear() > rowDate.getFullYear() ||
                    (today.getMonth() > rowDate.getMonth() &&
                    today.getFullYear() === rowDate.getFullYear()) ||
                    (today.getDate() >= rowDate.getDate() &&
                    today.getMonth() === rowDate.getMonth() &&
                    today.getFullYear() === rowDate.getFullYear()) ||
                    row.original.status === "sent"
                    ? true
                    : false
                }
                onChange={(e) => {
                    row.original.scheduled_at = e.target.value;
                    this.setState({ isScheduleUpdated: true });
                }}
                max={maxDate}
                />
            );
            },
        },
        {
            id: "Update",
            Header: "Update",
            Cell: ({ row }) => {
            let today = new Date();
            let rowDate = new Date(row.original.scheduled_at);
            return (
                <button
                onClick={(e) => {
                    this.updateSchedule(row.original)
                    .then((res) => console.log(res))
                    .catch((e) => console.log(e));
                }}
                className={
                    !this.state.isScheduleUpdated ||
                    today.getFullYear() > rowDate.getFullYear() ||
                    (today.getMonth() > rowDate.getMonth() &&
                    today.getFullYear() === rowDate.getFullYear()) ||
                    (today.getDate() >= rowDate.getDate() &&
                    today.getMonth() === rowDate.getMonth() &&
                    today.getFullYear() === rowDate.getFullYear()) ||
                    row.original.status === "sent"
                    ? "btn btn-danger"
                    : "btn btn-primary"
                }
                disabled={
                    !this.state.isScheduleUpdated ||
                    today.getFullYear() > rowDate.getFullYear() ||
                    (today.getMonth() > rowDate.getMonth() &&
                    today.getFullYear() === rowDate.getFullYear()) ||
                    (today.getDate() >= rowDate.getDate() &&
                    today.getMonth() === rowDate.getMonth() &&
                    today.getFullYear() === rowDate.getFullYear()) ||
                    row.original.status === "sent"
                    ? true
                    : false
                }
                >
                Schedule
                </button>
            );
            },
        },
        {
            id: "Delete",
            Header: "Delete",
            Cell: ({ row }) => {
            let today = new Date();
            let rowDate = new Date(row.original.scheduled_at);
            return (
                <button
                onClick={(e) => {

                    this.deleteSchedule(row.original)
                    .then((res) => console.log(res))
                    .catch((e) => console.log(e));
                }}
                className={"btn btn-danger"}
                disabled={
                    today.getFullYear() > rowDate.getFullYear() ||
                    (today.getMonth() > rowDate.getMonth() &&
                    today.getFullYear() === rowDate.getFullYear()) ||
                    (today.getDate() >= rowDate.getDate() &&
                    today.getMonth() === rowDate.getMonth() &&
                    today.getFullYear() === rowDate.getFullYear()) ||
                    row.original.status === "sent"
                    ? true
                    : false
                }
                >
                Delete
                </button>
            );
            },
        },
        ];

        return (
            <div style={{marginTop:'7rem'}}>
                {/* Header */}
                <Header />
                <div className="container-fluid">

                    {/* Non scheduled table */}
                    <div className="my-5">
                        {
                            this.state.offersToSchedulesStatus ? 
                            (
                                <Table title="OFFERS TABLE" data={this.state.allOffersToSchedulesData} columns={to_schedule_offer_columns} customCells={customColumn}/>
                            ) : 
                            (
                                [
                                    this.state.OffersToSchedulesMessage !== "" ? 
                                    (
                                        <h1 className="text-center">
                                            {this.state.OffersToSchedulesMessage}
                                        </h1>
                                    ) : 
                                    (
                                        <h1 className="text-center">
                                            <i className="bx bx-loader-circle bx-spin"></i>
                                        </h1>
                                    ),
                                ]
                            )
                        }
                    </div>
                    <hr/>
                    {/* Schedule table */}
                    <div className="my-5">
                        {
                            this.state.scheduledStatus ? 
                            (
                                <Table
                                    title="SCHEDULED TABLE"
                                    data={this.state.allScheduedData}
                                    columns={scheduled_column}
                                    customCells={customColumnScheduled}
                                />
                            ) : 
                            (
                                [
                                    this.state.scheduledMessage !== "" ? 
                                    (
                                        <h1 className="text-center">{this.state.scheduledMessage}</h1>
                                    ) : 
                                    (
                                        <h1 className="text-center">
                                            <i className="bx bx-loader-circle bx-spin"></i>
                                        </h1>
                                    ),
                                ]
                            )
                        }
                    </div>
                    <hr/>
                    {/* Customers section */}
                    <div className="my-5">
                        <h1>CUSTOMERS TABLE</h1>
                        {/* Drop box */}
                        <div className="container-fluid my-5">
                            <CSVReader onDrop={this.handleOnDrop} onError={this.handleOnError} addRemoveButton removeButtonColor="#659cef" onRemoveFile={this.handleOnRemoveFile}>
                            <span>Drop CSV file here or click to upload.</span>
                            </CSVReader>
                        </div>
                        {/* Customers table */}
                        {
                            this.state.customerStatus ? 
                            (
                                <Table title="" data={this.state.allCustomersData} columns={customer_columns} customCells={[]}/>
                            ) : 
                            (
                                [
                                    this.state.customerMessage !== "" ? 
                                    (
                                        <h1 className="text-center">{this.state.customerMessage}</h1>
                                    ) : 
                                    (
                                        <h1 className="text-center">
                                            <i className="bx bx-loader-circle bx-spin"></i>
                                        </h1>
                                    ),
                                ]
                            )
                        }
                    </div>
                    <hr/>
                </div>
            </ div>
        );
    }
}

export default Schedule;
