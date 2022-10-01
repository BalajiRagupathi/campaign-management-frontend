import React, { useEffect, useState } from "react";
import Chart from "../components/chart/chart";
import Table from "../components/Table/Table";
import Header from "../components/Header/Header";

import { scheduled_column } from "../services/TableColumns";
import { getAllSchedules } from "../services/AuthHttpRequest";
import axios from "axios";
import "../components/chart/chart.scss"

const Metrics = () => {

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  const [startDate, setStartDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState({})


  useEffect(() => {

    axios.get("https://api.sendgrid.com/v3/stats", {
      params: {
        "aggregated_by": "day",
        "start_date": startDate
      },
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer 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`
      }
    }).then((res) => {
      setSelectedDate(res.data[0].stats[0].metrics)
    })


  }, [startDate])

  const [allSchedulesData, setAllSchedulesData] = useState([]);
  const [isscheduleLoading, setisscheduleLoading] = useState(Boolean);
  const [isscheduleMessage, setisscheduleMessage] = useState("");

  useEffect(() => {
    getAllSchedulesRequest();
  }, []);

  // Get all schedules
  const getAllSchedulesRequest = async () => {

    setisscheduleLoading(false);
    setisscheduleMessage("");

    getAllSchedules().then((data) => {
      console.log(data);
      if( data.length > 0 ){
       
        console.log(data);
        let arr = [...data];
        setAllSchedulesData(arr);
        setisscheduleLoading(true);
        setisscheduleMessage("");
      }
      else if( data.length == 0 ){

        setAllSchedulesData([]);
        setisscheduleLoading(false);
        setisscheduleMessage("No schedules found");
      }
      else{

        setAllSchedulesData([]);
        setisscheduleLoading(false);
        setisscheduleMessage("Internal Error");
      }
      
    });
  };

  return (
    <>
      {/* Header */}
      <Header />
      <div className="container-fluid" style={{marginTop:'7rem'}}>
        
        <h4 className="text-center mt-4 mb-5" style={{ fontSize: "30px" }}>ANALYSIS</h4>

        <div className="container" style={{marginBottom:"50px"}}>
          <div className="row my-3 d-flex align-items-center">
            <label className="date text-uppercase col-5 col-sm-4 col-md-3 col-lg-2 form-control-label">Select the date : </label>
            <input type="date" className="col-5 col-sm-4  col-md-4  col-lg-3 form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
        </div>

        {/* Analysis Chart */}
        {
          selectedDate ?
            <div className="container">
              <Chart selectedDate={selectedDate} />
            </div> : null
        }
        <div className="my-5">
          {
            isscheduleLoading ? 
            (
              <Table title="METRICS TABLE" data={allSchedulesData} columns={scheduled_column} customCells={[]}/>
            ) : 
            (
              [
                isscheduleMessage != "" ? ( <h1 className="text-center">{isscheduleMessage}</h1> ) : 
                ( <h1 className="text-center"> <i className="bx bx-loader-circle bx-spin"></i> </h1>),
              ]
            )
          }
        </div>
      </div>
    </>
  );
};

export default Metrics;
