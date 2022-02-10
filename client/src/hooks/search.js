import {useContext, useState} from 'react';

import Context from "../store";

function useSearch() {
 
     const {search:searchMedia} = useContext(Context);

     const [results,setResults] = useState({});
     const [error,setError] = useState("");

    const search = (query)=>{
        searchMedia(query).then(res=>setResults(res)).catch(err=>setError(err));
    }

    return {
        search,
        results,
        error
    }

}

export default useSearch;