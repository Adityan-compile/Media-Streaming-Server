import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import React from "react";
import { Tag } from "primereact/tag";
import styles from "./styles.module.css";
import trailerNotFound from "../../assets/trailer-not-found.png";

function ViewMovieScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state.data;

  return (
    <div className={styles.screenContainer}>
      <div className="info-grid">
        <div>
          <img
            src={`https://www.themoviedb.org/t/p/original${data.poster}`}
            alt="Poster"
            className="poster"
          ></img>
        </div>
        <div>
          <h1 className={styles.title}>{data.name}</h1>
          <div className={styles.flex}>
            <h5 className={styles.date}>{new Date(data.createdAt).getFullYear()}</h5>
            <h5 className={styles.time}>{data.runtime} min</h5>
          </div>
          <div className={styles.flex}>
            {data.adult ? (
              <Tag
                className={styles.badge}
                severity="danger"
                icon="pi pi-exclamation-circle"
                value="18+"
              />
            ) : (
              <Tag
                className={styles.badge}
                severity="success"
                icon="pi pi-heart"
                value="Family Friendly"
              ></Tag>
            )}
            <Tag
              className={styles.badge}
              severity="info"
              icon="pi pi-paperclip"
              value={data.lang}
            />
            <Tag
              className={styles.badge}
              severity="warning"
              icon="pi pi-camera"
              value={data.studio}
            />
            <Tag
              className={styles.badge}
              severity="success"
              icon="pi pi-star"
              value={data.rating}
            />
          </div>
          <p className={styles.tagline}> --- {data.tagline}</p>
          <p className={styles.overview}>{data.description}</p>
          <div className={styles.genres}>
            <h3>Genres</h3>
            <div className={styles.flex}>
              {data.genres.map((genre) => (
                <Chip className={styles.badge} label={genre} key={genre} />
              ))}
            </div>
          </div>
          <div className={styles.crewInfo}>
            <h3>Crew</h3>
            <div className={styles.flex}>
              {data.crew.map((elem, index) => (
                <div className={styles.crew} key={index}>
                  <h5>{elem.name}</h5>
                  <h6>{elem.character}</h6>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.play}>
            <Button
              label="Play"
              iconPos="left"
              icon="pi pi-play"
              disabled={data.file.length === 0 ? true : false}
              className={["p-button-secondary p-button-outlined", styles.btnPlay]}
              onClick={() =>
                navigate("/player", {
                  state: { data },
                })
              }
            ></Button>
          </div>
          <div className={styles.trailer}>
            <h3 className={styles.trailerTitle}>Trailer</h3>
            {data.trailer.length !== 0 ? (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${data.trailer}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen={true}
              ></iframe>
            ) : (
              <img src={trailerNotFound} width="560" height="315"></img>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMovieScreen;
