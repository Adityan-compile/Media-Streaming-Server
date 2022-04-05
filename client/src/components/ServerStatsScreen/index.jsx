import { Chart } from "primereact/chart";
import { Knob } from 'primereact/knob';
import React from 'react';
import useServerStats from "../../hooks/stats";
function ServerStatsScreen() {

    const { stats } = useServerStats();


    return (
        <div className="m-20">
            <h4 className="heading">Server Stats</h4>
            <div className="flex m-20">
                <div className="flex flex-col flex-center">
                    <h2>CPU Utilization</h2>
                    <div className="m-20">
                        <Knob readOnly value={stats.cpu?.utilization || 0} size={250} valueColor={(stats.cpu?.utilization || 0) > 90 ? '#eb4034' : '#28f73c'} valueTemplate={"{value}%"} />
                    </div>
                </div>
                <div className="flex flex-col flex-center">
                    <h2>Ram</h2>
                    <div className="m-20">
                        <Knob readOnly value={stats?.memUsage || 0} size={250} valueColor={(stats?.memUsage || 0) > 90 ? '#eb4034' : '#28f73c'} valueTemplate={"{value}%"} />
                    </div>
                </div>
                <div className="flex flex-col flex-center">
                    <h2>Disk Usage</h2>
                    <div className="m-20">
                        <Chart type="pie" data={{
                            labels: ['Free Space(GB)', 'Occupied Space(GB)'],
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
        </div>
    )
}

export default ServerStatsScreen;