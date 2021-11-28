import "./styles.css";

import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import React from "react";

function ShowScreen() {
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
            <Badge className="badge" severity="danger" value="PG-13" />
            <Badge className="badge" severity="info" value="English" />
            <Badge
              className="badge"
              severity="success"
              value={
                <div className="flex">
                  <i
                    className="pi pi-star"
                    style={{
                      padding: "2.5px",
                    }}
                  ></i>
                  <span>7.2/10</span>
                </div>
              }
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
            ></Button>
          </div>
          <div className="trailer">
            <h3 className="trailer-title">Trailer</h3>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/8YjFbMbfXaQ"
              title="Trailer"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowfullscreen="true"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowScreen;
