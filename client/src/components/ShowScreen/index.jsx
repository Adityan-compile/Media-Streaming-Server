import "./styles.css";

import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import React from "react";
import { Tag } from "primereact/tag";
import trailerNotFound from "../../assets/trailer-not-found.png";

function ShowScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state.data;

  return (
    <div className="screen-container">
      <div className="info-grid">
        <div>
          <img
            src={`https://www.themoviedb.org/t/p/original${data.poster}`}
            alt="Poster"
            className="poster"
          ></img>
        </div>
        <div>
          <h1 className="title">{data.name}</h1>
          <div className="flex">
            <h5 className="date">{new Date(data.createdAt).getFullYear()}</h5>
            <h5 className="time">{data.runtime} min</h5>
          </div>
          <div className="flex">
            {data.adult ? (
              <Tag
                className="badge"
                severity="danger"
                icon="pi pi-exclamation-circle"
                value="18+"
              />
            ) : (
              <Tag
                className="badge"
                severity="success"
                icon="pi pi-heart"
                value="Family Friendly"
              ></Tag>
            )}
            <Tag
              className="badge"
              severity="info"
              icon="pi pi-paperclip"
              value={data.lang}
            />
            <Tag
              className="badge"
              severity="warning"
              icon="pi pi-camera"
              value={data.studio}
            />
            <Tag
              className="badge"
              severity="success"
              icon="pi pi-star"
              value={data.rating}
            />
          </div>
          <p className="tagline"> --- {data.tagline}</p>
          <p className="overview">{data.description}</p>
          <div className="genres">
            <h3>Genres</h3>
            <div className="flex">
              {data.genres.map((genre) => (
                <Chip className="badge" label={genre} key={genre} />
              ))}
            </div>
          </div>
          <div className="crew-info">
            <h3>Crew</h3>
            <div className="flex">
              {data.crew.map((elem,index) => (
                <div className="crew" key={index}>
                  <h5>{elem.name}</h5>
                  <h6>{elem.character}</h6>
                </div>
              ))}
            </div>
          </div>
          <div className="play">
            <Button
              label="Play"
              iconPos="left"
              icon="pi pi-play"
              disabled={data.file.length === 0 ? true : false}
              className="p-button-secondary p-button-outlined btn-play"
              onClick={() => navigate(`/player?videoId=${data.file}`)}
            ></Button>
          </div>
          <div className="trailer">
            <h3 className="trailer-title">Trailer</h3>
            {data.trailer.length!==0?(
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${data.trailer}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen={true}
            ></iframe>
            ):(
              <img src={trailerNotFound} width="560" height="315"></img>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowScreen;
