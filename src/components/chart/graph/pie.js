import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Doughnut } from 'react-chartjs-2';

const Pies = () => {


    const [lastWeekData, setLastWeekData] = useState({})

    let lastWeek = new Date().setDate(new Date().getDate() - 7);
    let date = new Date(lastWeek);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    lastWeek = `${year}-${month}-${day}`;


    useEffect(() => {
        axios.get("https://api.sendgrid.com/v3/stats", {
            params: {
                "aggregated_by": "week",
                "start_date": lastWeek
            },
            headers: {
                'Content-Type': "application/json",
                "Authorization": "Bearer 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"
            }
        }).then((res) => {
            let arr = res.data;
            setLastWeekData(arr[0].stats[0].metrics)
        })
    }, [])

    const chartData = {
        labels: ["clicks", "delivered", "opens", "processed", "requestd", "unique_clicks", "unique_opens"],
        datasets: [
            {
                label: 'Info',
                backgroundColor: ['#6A1B4D','#50DBB4','#DDD101','#E07C24','#8D3DAF','#FF6666'],
                borderColor: '#fff',
                borderWidth: 1,
                data: [lastWeekData['clicks'], lastWeekData['delivered'], lastWeekData['opens'], lastWeekData['processed'], lastWeekData['requests'], lastWeekData['unique_clicks'], lastWeekData['unique_opens']],

            }
        ]
    };
    return (
        <div >

            {   lastWeekData ?
                <Doughnut data={chartData}
                    options={{
                        title: {
                            display: true,
                            text: "Last Week Analysis",
                            fontSize: 15
                        },
                        legend: {
                            display: false
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0
                            }
                        },
                    }} /> : null
            }
        </div>
    )
}

export default Pies
