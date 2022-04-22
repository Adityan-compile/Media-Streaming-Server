import { useContext, useState } from "react";

import Context from "../store";

function useEditShow(data, onDelete = () => {}, onError = () => {}) {
  console.log(data);
  const [poster, setPoster] = useState(data.poster);
  const [seasons, setSeasons] = useState(data.seasons);
  const [title, setTitle] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [trailer, setTrailer] = useState(data.trailer);
  const [language, setLanguage] = useState(data.lang);
  const [studio, setStudio] = useState(data.studio);
  const [rating, setRating] = useState(data.rating);
  const [adult, setAdult] = useState(data.adult);
  const [releaseDate, setReleaseDate] = useState(
    new Date(data.createdAt).getFullYear()
  );
  const [runtime, setRuntime] = useState(data.runtime);

  const { deleteShow: deleteShowService } = useContext(Context);

  const editShow = () => {};

  const deleteShow = () => {
    deleteShowService(data.id)
      .then((res) => onDelete(res))
      .catch((err) => onError(err));
  };

  return {
    state: {
      poster,
      title,
      description,
      trailer,
      language,
      rating,
      adult,
      releaseDate,
      runtime,
      studio,
      seasons,
    },
    methods: {
      setPoster,
      setTitle,
      setDescription,
      setTrailer,
      setLanguage,
      setRating,
      setAdult,
      setReleaseDate,
      setRuntime,
      setStudio,
      setSeasons,
      editShow,
      deleteShow,
    },
  };
}

export default useEditShow;
