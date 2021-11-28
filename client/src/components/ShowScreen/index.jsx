import "./styles.css";

import { Badge } from "primereact/badge";
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
          <Badge value="PG-13" />
          <p className="overview">
            Shang-Chi must confront the past he thought he left behind when he
            is drawn into the web of the mysterious Ten Rings organization.
          </p>
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
