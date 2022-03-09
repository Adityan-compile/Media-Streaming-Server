import {useContext, useEffect, useState} from 'react';

import Context from '../store';

function useHighlights() {
    const [highlights,setHighlights] = useState([]);

    const { fetchHighlights, createHighlight:create } = useContext(Context);

    useEffect(()=>{
        fetchHighlights().then(res=>setHighlights(res)).catch(err=>{});
    },[]);

    const createHighlight = (id, type, successHandler=()=>{},onError=()=>{})=>{
        create(id,type).then(data=>successHandler(data)).catch(e=>onError(e));
    };
    return {
        highlights,
        createHighlight
    };

}

export default useHighlights;
