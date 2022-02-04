import {useEffect, useState} from 'react';

function useHighlights() {
    const [highlights,setHighlights] = useState([]);

    useEffect(()=>{
        //Fetch Highlights here
        setHighlights([
            {
                title: "Shang Chi and the Legend of the Ten Rings",
                date: 2021,
            },
            {
                title: "Spiderman: No Way Home",
                date: 2021,
            }
        ]);
    },[]);

    return {
        highlights
    };

}

export default useHighlights;
