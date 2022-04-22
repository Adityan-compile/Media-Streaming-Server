import { useContext, useState } from "react";

import Context from "../store";

function useEditMovie(data, onDelete = () => {}, onError = () => {}, onEdit=()=>{}) {
  const [poster, setPoster] = useState(data.poster);
  const [file, setFile] = useState(data.file);
  const [title, setTitle] = useState(data.name);
  const [tagline, setTagline] = useState(data.tagline);
  const [description, setDescription] = useState(data.description);
  const [trailer, setTrailer] = useState(data.trailer);
  const [language, setLanguage] = useState(data.lang);
  const [rating, setRating] = useState(data.rating);
  const [releaseDate, setReleaseDate] = useState(
    new Date(data.createdAt).getFullYear()
  );
  const [runtime, setRuntime] = useState(data.runtime);

  const { deleteMovie: deleteService, editMovie: editService } =
    useContext(Context);

  const editMovie = () => {
    const body = {
      id: data.id,
      updatedFields: {
        poster,
        file,
        title,
        tagline,
        description,
        trailer,
        lang: language,
        rating,
        releaseDate,
        runtime,
      },
    };
    editService(body)
      .then((res) => onEdit())
      .catch((err) => onError(err));
  };

  const deleteMovie = () => {
    deleteService(data.id)
      .then((res) => onDelete(res))
      .catch((err) => onError(err));
  };

  return {
    state: {
      poster,
      file,
      title,
      tagline,
      description,
      trailer,
      language,
      rating,
      releaseDate,
      runtime,
    },
    methods: {
      setPoster,
      setFile,
      setTitle,
      setTagline,
      setDescription,
      setTrailer,
      setLanguage,
      setRating,
      setReleaseDate,
      setRuntime,
      editMovie,
      deleteMovie,
    },
  };
}

export default useEditMovie;
