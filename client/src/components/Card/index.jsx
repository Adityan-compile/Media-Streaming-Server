import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

function Card({ data, admin = false, type = "m" }) {

  const navigate = useNavigate();

  if (admin) {
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          if (type === "m") {
            navigate(`/movies/edit/`, {
              state: {
                data
              }
            });
          } else {
            navigate(`/shows/edit/`, {
              state: {
                data
              }
            });
          }
        }}
      >
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${data?.poster}'), url('https://media.comicbook.com/files/img/default-movie.png')`,
          }}
          className={styles.card}
        >
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={(e) => {
          e.preventDefault(); 
          if (type === "m") {
            navigate("/movies/view", {
              state: {
                data
              }
            });
          } else {
            navigate("/shows/view", {
              state: {
                data
              }
            });
          }

        }}
      >
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${data?.poster}'), url('https://media.comicbook.com/files/img/default-movie.png')`,
          }}
          className={styles.card}
        >
        </div>
      </div>
    );
  }
}

export default Card;
