import "./styles.css";
import "video.js/dist/video-js.css";

import { Button } from 'primereact/button';
import React from "react";
import ReactPlayer from "react-player";
import videojs from "video.js";

function VideoPlayerScreen() {
  return (
    <div className="player-container">
      <div className="overlay-btn">
      <Button icon="pi pi-arrow-left" className="p-button-rounded p-button-outlined p-button-secondary"  />
      </div>

      <div className="player">
        <ReactPlayer
          url="https://youtu.be/SmqeO5mj0ec"
          playing={true}
          controls={true}
          height="100vh"
          width="100%"
          pip={true}
        />
      </div>
    </div>
  );
}

export default VideoPlayerScreen;
