import "./styles.css";
import "video-react/dist/video-react.css";

import {
  ControlBar,
  ForwardControl,
  LoadingSpinner,
  PlayToggle,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  VolumeMenuButton
} from "video-react";

import { Button } from "primereact/button";
import React from "react";
import sample from "../../assets/sample.mp4";
import { useNavigate } from "react-router-dom";

function VideoPlayerScreen() {
  const navigate = useNavigate();

  return (
    <div className="player-container">
      <div className="overlay-btn">
        <Button
          icon="pi pi-arrow-left"
          className="p-button-rounded p-button-outlined p-button-secondary btn"
          onClick={() => {
            navigate("/shows/view");
          }}
        />
      </div>

      <div className="player">
        <Player
          className="video-player"
          autoPlay={true}
          fluid={true}
          controls={true}
          onEnd={() => {
            setTimeout(() => navigate("/shows/view"), 1000);
          }}
          src={sample}
        >
          <ControlBar autoHide={true}>
            <PlayToggle />
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={10} order={1.1} />
            <VolumeMenuButton vertical />
            <PlaybackRateMenuButton
              rates={[0.25, 0.5, 1, 1.25, 1.5, 1.75, 2]}
            />
          </ControlBar>
        </Player>
      </div>
    </div>
  );
}

export default VideoPlayerScreen;
