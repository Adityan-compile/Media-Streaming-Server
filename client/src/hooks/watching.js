import {useContext, useEffect, useState} from 'react';

import Context from "../store";

function useWatching({ onError=()=>{} }) {
    const [watching,setWatching] = useState([]);
    const { fetchWatching } = useContext(Context);

    useEffect(()=>{
        fetchWatching().then(res=>setWatching(res)).catch(err=>onError("fetch-error"));
    },[]);

    const updateWatching = (body)=>{};

 return {
     watching,
     updateWatching
 };
}

export default useWatching;