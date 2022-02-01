import "./styles.css";

import React, { useContext, useEffect, useRef, useState } from "react";

import Card from "../Card";
import Context from "../../store";
import Highlights from "../Highlights";
import { Toast } from "primereact/toast";

function HomeScreen() {
  const [movies, setMovies] = useState([]);

  const { getMovies } = useContext(Context);

  const toastRef = useRef(null);

  useEffect(() => {
    getMovies()
      .then((res) => setMovies(res))
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: "Error",
          detail: "Error Fetching Movies",
          life: 3000,
        });
      });
  }, []);

  return (
    <div className="home">
      <Toast ref={toastRef} />
      <div className="highlights">
        <h2 className="home-title">Highlights</h2>
        <Highlights />
      </div>
      <div id="explore">
        <h2 className="home-title">Movies</h2>
        <div className="container">
          {movies.length === 0 ? (
            <h3 className="warning">
              No Content Found. Add new Movies or TV Shows from Dashboard{" "}
            </h3>
          ) : (
            movies.map((movie) => <Card key={movie.id} data={movie} />)
          )}
        </div>
      </div>
      <div id="continue">
        <h2 className="home-title">Continue Watching,</h2>
        <div className="continue">
          {Array.from(Array(2).keys()).map((el) => (
            <Card key={el} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
