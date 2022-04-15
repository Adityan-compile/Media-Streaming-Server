import { useContext, useEffect, useState } from "react";

import Context from "../store";

function useWatching(onError = () => {}) {
  const [watching, setWatching] = useState([]);
  const {
    fetchWatching,
    updateWatching: update,
    resetWatching: reset,
  } = useContext(Context);

  useEffect(() => {
    fetchWatching()
      .then((res) => setWatching(res))
      .catch((err) => onError("fetch-error"));
  }, []);

  const updateWatching = async (body) => {
    await update(body);
  };

  const resetWatching = async (mediaId) => {
    await reset(mediaId);
  };

  return {
    watching,
    updateWatching,
    resetWatching,
  };
}

export default useWatching;
