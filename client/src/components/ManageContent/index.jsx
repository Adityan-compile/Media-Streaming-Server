import "./styles.css";

import React, { useContext, useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import Card from "../Card";
import Context from "../../store";
import NewMovie from "../NewMovie";
import { Toast } from "primereact/toast";
import NewShow from "../NewShow";

function ManageContent() {
  const toastRef = useRef(null);

  const [movieModal, setMovieModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  const { getMovies } = useContext(Context);

  useEffect(() => {
    getMovies().then(res => {
      if (res.length === 0) {
        toastRef.current.show({
          severity: "warning",
          summary: "Info",
          detail: "No Movies Found",
          life: 3000,
        });
      }
      setMovies(res);
    }).catch(e => {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "Cannot Load Movies",
        life: 3000,
      });
    });
  }, []);

  const onMovieSuccess = (newMovie) => {
    let temp = movies;
    temp.unshift(newMovie);
    setMovies(temp);
    setMovieModal(false);
    toastRef.current.show({
      severity: "success",
      summary: "Success",
      detail: "Movie Created Successfully",
      life: 3000,
    });
  };
  const onMovieError = (e) => {
    setMovieModal(false);
    toastRef.current.show({
      severity: "error",
      summary: "Error",
      detail: "Movie Creation Error",
      life: 3000,
    });
  };

  const onShowSuccess = (newShow) => {
    let temp = shows;
    temp.unshift(newShow);
    setShows(temp);
    setShowModal(false);
    toastRef.current.show({
      severity: "success",
      summary: "Success",
      detail: "Show Created Successfully",
      life: 3000,
    });
  };
  const onShowError = (e) => {
    setMovieModal(false);
    toastRef.current.show({
      severity: "error",
      summary: "Error",
      detail: "Show Creation Error",
      life: 3000,
    });
  };

  return (
    <div className="manage">
      <Toast ref={toastRef} />
      <Button
        label="New Movie"
        icon="pi pi-plus-circle"
        className="btn"
        onClick={() => setMovieModal(true)}
      />
      <Button label="New Show" icon="pi pi-plus-circle" className="btn" onClick={() => setShowModal(true)} />
      <NewMovie
        visible={movieModal}
        setVisible={setMovieModal}
        onSuccess={onMovieSuccess}
        onError={onMovieError}
      />
      <NewShow
        visible={showModal}
        setVisible={setShowModal}
        onSuccess={onShowSuccess}
        onError={onShowError}
      />
      <h3>Movies</h3>
      <div className="content">
        {movies.map((movie, index) => (
          <Card key={index} admin={true} data={movie} />
        ))}
      </div>
    </div>
  );
}

export default ManageContent;
