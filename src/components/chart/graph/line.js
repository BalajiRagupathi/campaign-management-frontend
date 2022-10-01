import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import axios from "axios";

const Lines = () => {

    const [lastMonthData, setLastMonthData] = useState({})

    let lastMonth = new Date().setDate(new Date().getDate() - 30);

    let date = new Date(lastMonth);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    lastMonth = `${year}-${month}-${day}`;


    useEffect(() => {
        axios.get("https://api.sendgrid.com/v3/stats", {
            params: {
                "aggregated_by": "month",
                "start_date": lastMonth
            },
            headers: {
                'Content-Type': "application/json",
                "Authorization": "Bearer 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"
            }
        }).then((res) => {
            let arr = res.data;
            setLastMonthData(arr[arr.length - 1].stats[0].metrics)
        })
    }, [])

    const chartData = {
        labels: ["clicks", "delivered", "opens", "processed", "requestd", "unique_clicks", "unique_opens"],
        datasets: [
            {
                label: 'Info',
                backgroundColor: '#CAD5E2',
                borderColor: '#3944F7',
                borderWidth: 1,
                hoverBackgroundColor: '#2827CC',
                hoverBorderColor: '383CC1',
                data: [lastMonthData['clicks'], lastMonthData['delivered'], lastMonthData['opens'], lastMonthData['processed'], lastMonthData['requests'], lastMonthData['unique_clicks'], lastMonthData['unique_opens']],

            }
        ]
    };
    return (
        <div >

            {lastMonthData ?
                <Line data={chartData}
                    options={{
                        title: {
                            display: true,
                            text: "Last Month Analysis",
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

export default Lines
