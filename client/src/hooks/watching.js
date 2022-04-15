import { useContext, useEffect, useState } from "react";

import Context from "../store";

function useWatching(onError = () => {}) {
  const [watching, setWatching] = useState([]);
  const { fetchWatching, updateWatching: update } = useContext(Context);

  useEffect(() => {
    fetchWatching()
      .then((res) => setWatching(res))
      .catch((err) => onError("fetch-error"));
  }, []);

  const updateWatching = async (body) => {
    await update(body);
    // .then((res) =>{})
    // .catch((err) => {});
  };

  return {
    watching,
    updateWatching,
  };
}

export default useWatching;
