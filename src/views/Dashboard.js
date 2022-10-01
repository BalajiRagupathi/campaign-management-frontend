import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table/Table";
import Header from "../components/Header/Header";

import Http from "../services/Variables";
import { user_columns,customer_columns } from "../services/TableColumns";
import { getAllUsers } from "../services/AuthHttpRequest";

// Custom column for staff table
const customColumn = [
    {
      id: "Role",
      Header: "Role",
      accessor: "role",
      Cell: ({ row }) => {
        if (row.original.role) {
          return (
            <>{row.original.role}</>
          );
        } else {
          return (
            <>Null</>
          );
        }
      },
    },
  ];

  const Dashboard = () => {

      const [allUsersData, setAllUsersData] = useState([]);
      const [allCustomerData, setAllCustomersData] = useState([]);
      const [allOffersData, setOffersData] = useState([]);
      const [allSchedulesData, setSchedulesData] = useState([]);
      const [isallUsersLoded, setisallUsersLoded] = useState(null);
      const [isallCustomerLoded, setisallCustomerLoded] = useState(null);
      const [isallUsersMessage, setisallUsersMessage] = useState("");
      const [isallCustomerMessage, setisallCustomerMessage] = useState("");

      useEffect(
        () => {

          getAllUserRequest();
          getAllCustomerRequest();
          getAllOfferRequest();
          getAllSchedulesRequest();

        },[]
      )

      // Get all users
      const getAllUserRequest = async () => {

        setisallUsersLoded(null);
        setisallUsersMessage("");

        getAllUsers()
        .then(
          (data) => {

            if( data.length > 0 ){

              setAllUsersData(data)
              setisallUsersLoded(true);
            }
            else if( data.length == 0 ){

              setAllUsersData([]);
              setisallUsersLoded(false);
              setisallUsersMessage("No users found");
            }
            else{

              setAllUsersData([]);
              setisallUsersLoded(false);
              setisallUsersMessage("Internal error");
            }
        })
        .catch(e => {

          console.log(e);
          setAllUsersData([]);
          setisallUsersLoded(false);
          setisallUsersMessage("Internal error");
        })
      }

      // Get all customers
      const getAllCustomerRequest = async () => {

        setisallCustomerLoded(null);
        setisallCustomerMessage("");

        axios
        .get(`${Http}/customer/`, {
            headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("currentUserToken"),
            },
        })
        .then((res) => {

          if(res.data.length > 0){

            setAllCustomersData(res.data);
            setisallCustomerLoded(true);
            setisallCustomerMessage("");
          }
          else if( res.data.length == 0 ){

            setAllCustomersData([]);
            setisallCustomerLoded(false);
            setisallCustomerMessage("No customers found");
          }
          else{

            setAllCustomersData([]);
            setisallCustomerLoded(false);
            setisallCustomerMessage("Internal Error");
          }
        })
        .catch(e => {

          console.log(e);
          setAllCustomersData([]);
          setisallCustomerLoded(false);
          setisallCustomerMessage("Internal Error");
        })
      }

      // Get all schedules
      const getAllSchedulesRequest = async () => {
        
        axios
        .get(`${Http}/offer/`, {
            headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("currentUserToken"),
            },
        })
        .then((res) => {
            setOffersData(res.data);
        })
      }

      const getAllOfferRequest = async () => {

        axios
        .get(`${Http}/schedule/`, {
            headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("currentUserToken"),
            },
        })
        .then((res) => {

          setSchedulesData(res.data);
        })
      }
    return (
      <div >
        {/* Header component */}
        <Header />
        {/* Top boxes for count */}
        <div className="container-fluid mb-5 " style={{marginTop:'7rem'}}>
          <div className="d-md-flex flex-row justify-content-evenly">
            <div className="card border border-danger mx-auto box-shadow" style={{ width: "18rem" }}>
              <div className="d-flex flex-row justify-content-evenly">
                <div className="card-body">
                  <h5 className="card-title">TOTAL OFFERS</h5>
                  {
                    allOffersData.length > 0 ? (<p className="card-text">{allOffersData.length}</p>) : (<p className="card-text">0</p>)
                    
                  }
                </div>
                <div className="m-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    style={{ color: "red" }}
                    fill="currentColor"
                    className="bi bi-megaphone-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-11zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25.222 25.222 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56V3.224zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009a68.14 68.14 0 0 1 .496.008 64 64 0 0 1 1.51.048zm1.39 1.081c.285.021.569.047.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a65.81 65.81 0 0 1 1.692.064c.327.017.65.037.966.06z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="card border border-success mx-auto box-shadow" style={{ width: "18rem" }}>
              <div className="d-flex flex-row justify-content-evenly">
                <div className="card-body">
                  <h5 className="card-title">TOTAL SCHEDULES</h5>
                  {allSchedulesData.length > 0 ? (<p className="card-text">{allSchedulesData.length}</p>) : (<p className="card-text">0</p>)}
                </div>
                <div className="m-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    style={{ color: "green" }}
                    className="bi bi-calendar-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="card border border-primary mx-auto box-shadow" style={{ width: "18rem" }}>
              <div className="d-flex flex-row justify-content-evenly">
                <div className="card-body">
                  <h5 className="card-title">TOTAL USERS</h5>
                  {allCustomerData.length > 0 ? (<p className="card-text">{allCustomerData.length}</p>) : (<p className="card-text">0</p>)}
                </div>
                <div className="m-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    style={{ color: "blue" }}
                    fill="currentColor"
                    className="bi bi-person-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                    />
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Staff Table */}
        <div className="container-fluid my-5">
          {
            isallUsersLoded ? 
              (<Table
                title="STAFFS TABLE"
                data={allUsersData}
                columns={user_columns}
                customCells={customColumn}
              />) : 
              [ 
                isallUsersMessage != "" ? 
                  (<h1 className="text-center">{isallUsersMessage}</h1>) : 
                  (<h1 className="text-center"><i className='bx bx-loader-circle bx-spin' ></i></h1>)  
              ]
          }
        </div>
        {/* Customers Table */}
        <div className="container-fluid my-5">
          {
            isallCustomerLoded ? 
              (<Table
                  title="USERS TABLE"
                  data={allCustomerData}
                  columns={customer_columns}
                  customCells={[]}
                />
              ) : 
              [ 
                isallCustomerMessage != "" ? 
                (<h1 className="text-center">{isallCustomerMessage}</h1>) : 
                (<h1 className="text-center"><i class='bx bx-loader-circle bx-spin' ></i></h1>) 
              ]
          }
        </div>
      </div>
    );
};

export default Dashboard;
