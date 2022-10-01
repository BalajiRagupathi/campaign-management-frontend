import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'

const Bars = (props) => {


    const obj = props.selectedDate

    const chartData = {
        labels: ["clicks", "delivered", "opens", "processed", "requestd", "unique_clicks", "unique_opens"],
        datasets: [
            {
                label: 'Info',
                backgroundColor: '#383CC1',
                borderColor: '#3944F7',
                borderWidth: 1,
                hoverBackgroundColor: '#2827CC',
                hoverBorderColor: '383CC1',
                data: [obj['clicks'], obj['delivered'], obj['opens'], obj['processed'], obj['requests'], obj['unique_clicks'], obj['unique_opens']],
            }
        ]
    };
    return (
        <div >

            <Bar data={chartData}
                options={{

                    legend: {
                        display: false
                    }
                }}

            />

        </div>
    )
}

export default Bars
