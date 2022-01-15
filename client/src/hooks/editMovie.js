import React, { useState } from "react";

function useEditMovie(data) {
  const [poster, setPoster] = useState(data.poster);
  const [file, setFile] = useState(data.file);
  const [title, setTitle] = useState(data.title);
  const [tagline, setTagline] = useState(data.tagline);
  const [description, setDescription] = useState(data.description);
  const [trailer, setTrailer] = useState(data.trailer);
  const [language, setLanguage] = useState(data.lang);
  const [rating, setRating] = useState(data.rating);
  const [adult, setAdult] = useState(data.adult);
  const [releaseDate, setReleaseDate] = useState(data.releaseDate);
  const [runtime, setRuntime] = useState(data.runtime);

  const editMovie = () => {};

  return {
    poster,
    file,
    title,
    tagline,
    description,
    trailer,
    language,
    rating,
    adult,
    releaseDate,
    runtime,
    setPoster,
    setFile,
    setTitle,
    setTagline,
    setDescription,
    setTrailer,
    setLanguage,
    setRating,
    setAdult,
    setReleaseDate,
    setRuntime,
    editMovie,
  };
}

export default useEditMovie;
