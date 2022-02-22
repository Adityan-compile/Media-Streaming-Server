import { useContext, useState } from "react";
import Context from "../store";

const useRating = (onError) => {
  const [topRated, setTopRated] = useState({
    movies: [],
    shows: [],
  });

  const { fetchTopRated: fetch } = useContext(Context);

  const fetchTopRated = () => {
    fetch()
      .then((res) => setTopRated(res))
      .catch((err) => onError(err));
  };

  return { topRated, fetchTopRated };
};

export default useRating;
