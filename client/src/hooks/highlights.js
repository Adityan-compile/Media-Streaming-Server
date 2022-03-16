import { useContext, useEffect, useState } from "react";

import Context from "../store";

function useHighlights() {
  const [highlights, setHighlights] = useState([]);

  const { fetchHighlights, createHighlight: create } = useContext(Context);

  useEffect(() => {
    fetchHighlights()
      .then((res) => setHighlights(res))
      .catch((err) => {});
  }, []);

  const createHighlight = (
    id,
    highlightType,
    successHandler = () => {},
    onError = () => {}
  ) => {
    create(id, highlightType)
      .then((data) => {
        let temp = highlights;
        temp.unshift(data);
        setHighlights(temp);
        successHandler();
      })
      .catch((e) => onError(e));
  };
  return {
    highlights,
    createHighlight,
  };
}

export default useHighlights;
