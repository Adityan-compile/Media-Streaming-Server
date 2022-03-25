import { useContext, useEffect, useState } from "react";

import Context from "../store";

function useSettings() {
    
    const [settings,setSettings] = useState({});
    
    const { fetchServerSettings } = useContext(Context);
      
    useEffect(()=>{
          fetchServerSettings().then(res=>setSettings(res)).catch(err=>{});
    },[]);

    const updateSettings = ()=>{};

    return {
        settings,
        updateSettings
    };
}

export default useSettings;