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

  const updateWatching = (body) => {
    update(body)
      .then((res) => {
        console.log(res)
        // TODO: Re-implement to prevent Duplication
        // if (watching.indexOf(res) === -1) {
        //   const temp = watching;
        //   temp.push(res);
        //   setWatching(temp);
        // } else {
        //   const temp = watching;
        //   temp[indexOf(res)] = res;
        // }
      })
      .catch((err) => {});
  };

  return {
    watching,
    updateWatching,
  };
}

export default useWatching;
