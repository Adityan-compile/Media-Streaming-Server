import {useContext, useEffect, useState} from 'react';

import Context from '../store';

function useHighlights() {
    const [highlights,setHighlights] = useState([]);

    const { fetchHighlights } = useContext(Context);

    useEffect(()=>{
        fetchHighlights().then(res=>setHighlights(res)).catch(err=>{});
    },[]);

    const createHighlight = (id)=>{};
    return {
        highlights,
        createHighlight
    };

}

export default useHighlights;
