import { Chart } from "primereact/chart";
import { Knob } from 'primereact/knob';
import React from 'react';
import useServerStats from "../../hooks/stats";
function ServerStatsScreen() {

    const { stats } = useServerStats(20000);


    return (
        <div className="m-20">
            <h4 className="heading">Server Stats</h4>
            <div className="flex m-20 flex-center">
                <div className="m-20 flex flex-col flex-center">
                    <h2>CPU Utilization</h2>
                    <div className="m-20">
                        <Knob readOnly value={stats.cpu?.utilization || 0} size={250} valueColor={(stats.cpu?.utilization || 0) > 90 ? '#eb4034' : '#28f73c'} valueTemplate={"{value}%"} />
                    </div>
                </div>
                <div className="m-20 flex flex-col flex-center">
                    <h2>Ram</h2>
                    <div className="m-20">
                        <Knob readOnly value={stats?.memUsage || 0} size={250} valueColor={(stats?.memUsage || 0) > 90 ? '#eb4034' : '#28f73c'} valueTemplate={"{value}%"} />
                    </div>
                </div>
                <div className="m-20 flex flex-col flex-center">
                    <h2>Disk Usage</h2>
                    <div className="m-20">
                        <Knob readOnly value={stats?.diskUsage || 0} size={250} valueColor={(stats?.diskUsage || 0) > 90 ? '#eb4034' : '#28f73c'} valueTemplate={"{value}%"} />
                    </div>
                </div>
                <div className="flex flex-col flex-center">
                    <h2>CPU Temp</h2>
                    <div className="m-20">
                        <Chart type="bar" height="300px" width="300px" data={{
                            labels: ['', '', ''],
                            datasets: [{
                                label: 'Main',
                                data: [stats.cpu?.temp.main],
                                backgroundColor: "#00092C"
                            },
                            {
                                label: 'Cores',
                                data: stats.cpu?.temp.cores,
                                backgroundColor: "#FF5F00"
                            },
                            {
                                label: 'Socket',
                                data: stats.cpu?.temp.socket,
                                backgroundColor: "#EEEEEE"
                            },
                            {
                                label: 'Max',
                                data: [stats.cpu?.temp.max],
                                backgroundColor: "#B20600"
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