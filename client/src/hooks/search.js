import Context from "../store";
import {useContext} from 'react';

function useSearch() {
 
     const {search:searchMedia} = useContext(Context);

    const search = (query)=>{
        return new Promise((resolve,reject)=>{
            searchMedia(query).then(res=>resolve(res)).catch(err=>reject(err));
        });
    }

    return search;

}

export default useSearch;