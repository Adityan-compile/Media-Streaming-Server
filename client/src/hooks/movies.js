import { useContext, useState } from "react";
import Context from "../store";

const useMovies = (onError)=>{
    const [movies, setMovies] = useState([]);
    const { getMovies } = useContext(Context);

    const fetchMovies = ()=>{
        getMovies()
        .then((res) => setMovies(res)).catch(err=>onError(err))
    };
    return {fetchMovies, movies};
};

export default useMovies;