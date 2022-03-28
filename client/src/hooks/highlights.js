import { useContext, useEffect, useState } from "react";

import Context from "../store";

function useHighlights() {
  const [highlights, setHighlights] = useState([]);

  const {
    fetchHighlights,
    createHighlight: create,
    deleteHighlight: deletehighlight,
  } = useContext(Context);

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

  const deleteHighlight = (
    id,
    successHandler = () => {},
    onError = () => {}
  ) => {
    deletehighlight(id)
      .then(() => {
        let temp = highlights.filter((el) => el.id !== id);
        setHighlights(temp);
        return successHandler();
      })
      .catch((e) => onError(e));
  };

  return {
    highlights,
    createHighlight,
    deleteHighlight,
  };
}

export default useHighlights;
