import { Chart } from "primereact/chart";
import React from 'react'
function ServerStatsScreen() {
    return (
        <div className="m-20">
            <h4 className="heading">Server Stats</h4>
            <div className="grid m-20">
                <div className="">
                    <h4>Ram</h4>
                    <Chart type="pie" data={{
                        labels: ['Free Space', 'Occupied Space'],
                        datasets: [
                            {
                                data: [1000, 1000],
                                backgroundColor: [
                                    "#03fc0b",
                                    "#ff1212"
                                ],
                                hoverBackgroundColor: [
                                    "#59ff5f",
                                    "#ff3838"
                                ]
                            }
                        ]
                    }} />
                </div>
            </div>
        </div>
    )
}

export default ServerStatsScreen;