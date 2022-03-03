import React, { useEffect, useRef } from "react";

import Card from "../Card";
import Highlights from "../Highlights";
import { Toast } from "primereact/toast";
import styles from "./styles.module.css";
import useRating from "../../hooks/rating";

function HomeScreen() {

  const toastRef = useRef(null);

  const onError = (err) => {
    toastRef.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error Fetching Movies",
      life: 3000,
    });
  };
  const {fetchTopRated, topRated} = useRating(onError)


  useEffect(() => {
    fetchTopRated();
  }, []);

  return (
    <div className={styles.home}>
      <Toast ref={toastRef} />
      <div>
        <h2 className={styles.homeTitle}>Highlights</h2>
        <Highlights />
      </div>
      <div id="explore">
        <h2 className={styles.homeTitle}>Top Rated Movies</h2>
        <div className="container">
          {topRated.movies.length === 0 ? (
            <h3 className="warning">
              No Content Found. Add new Movies or TV Shows from Dashboard{" "}
            </h3>
          ) : (
            topRated.movies.map((movie) => <Card key={movie.id} data={movie} />)
          )}
        </div>
        <h2 className={styles.homeTitle}>Top Rated TV</h2>
        <div className="container">
          {topRated.shows.length === 0 ? (
            <h3 className="warning">
              No Content Found. Add new Movies or TV Shows from Dashboard{" "}
            </h3>
          ) : (
            topRated.shows.map((movie) => <Card key={movie.id} data={movie} type="s" />)
          )}
        </div>
      </div>
      <div id="continue">
        <h2 className={styles.homeTitle}>Continue Watching,</h2>
        <div className="continue container">
          {Array.from(Array(2).keys()).map((el) => (
            <Card key={el} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
