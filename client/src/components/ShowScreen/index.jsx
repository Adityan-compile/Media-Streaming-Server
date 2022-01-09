import "./styles.css";

import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import React from "react";
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router-dom";

function ShowScreen() {

  const navigate = useNavigate();
  
  return (
    <div className="screen-container">
      <div className="info-grid">
        <div>
          <img
            src="https://www.themoviedb.org/t/p/original/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg"
            alt="Poster"
            className="poster"
          ></img>
        </div>
        <div>
          <h1 className="title">Shang-Chi and The Legend of The Ten Rings</h1>
          <div className="flex">
            <h5 className="date">2021</h5>
            <h5 className="time">2h 12min</h5>
          </div>
          <div className="flex">
            <Tag className="badge" severity="danger" value="PG-13" />
            <Tag className="badge" severity="info" value="English" />
            <Tag className="badge" severity="warning" value="Marvel Studios" />
            <Tag
              className="badge"
              severity="success"
              icon="pi pi-star"
              value={7.2}
            />
          </div>
          <p className="tagline"> --- You Can't Outrun Your Destiny</p>
          <p className="overview">
            Shang-Chi must confront the past he thought he left behind when he
            is drawn into the web of the mysterious Ten Rings organization.
          </p>
          <div className="genres">
            <h3>Genres</h3>
            <div className="flex">
              <Chip className="badge" label="Action" />
              <Chip className="badge" label="Adventure" />
              <Chip className="badge" label="Fantasy" />
              <Chip className="badge" label="Superhero" />
              <Chip className="badge" label="Science Fiction" />
            </div>
          </div>
          <div className="crew-info">
            <h3>Crew</h3>
            <div className="flex">
              <div className="crew">
                <h5>Destin Daniel Cretton</h5>
                <h6>Director, Screenplay</h6>
              </div>
              <div className="crew">
                <h5>Andrew Lanham</h5>
                <h6>Screenplay</h6>
              </div>
              <div className="crew">
                <h5>Steve Englehart</h5>
                <h6>Characters</h6>
              </div>
              <div className="crew">
                <h5>Jim Starlin</h5>
                <h6>Characters</h6>
              </div>
              <div className="crew">
                <h5>Dave Callaham</h5>
                <h6>Characters</h6>
              </div>
            </div>
          </div>
          <div className="play">
            <Button
              label="Play"
              iconPos="left"
              icon="pi pi-play"
              className="p-button-secondary p-button-outlined btn-play"
              onClick={()=>navigate('/player')}
            ></Button>
          </div>
          <div className="trailer">
            <h3 className="trailer-title">Trailer</h3>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/8YjFbMbfXaQ"
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen="true"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowScreen;
