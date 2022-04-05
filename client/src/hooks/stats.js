import {useContext, useEffect, useState} from "react";

import Context from "../store";

const useServerStats = () => {
    const [stats,setStats] = useState({});
    
    const {pingServer} = useContext(Context);

    useEffect(()=>{
        pingServer().then(res=>{setStats(res)}).catch(err=>{});
        const intervalId = setInterval(()=>{
            pingServer().then(res=>{setStats(res)}).catch(err=>{});
        },30000);
        return ()=>clearInterval(intervalId);
    },[]);
    
    return {stats};
};

export default useServerStats;
