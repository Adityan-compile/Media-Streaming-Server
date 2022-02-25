import { useContext, useState } from "react";

import Context from "../store";

const useShows = (onError)=>{
    const [shows, setShows] = useState([]);
    const { getShows } = useContext(Context);

    const fetchShows = ()=>{
        getShows()
        .then((res) => setShows(res)).catch(err=>onError(err))
    };
    return {fetchShows, shows};
};

export default useShows;