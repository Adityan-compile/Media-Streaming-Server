import "./styles.css";
import "video-react/dist/video-react.css";

import {
  ControlBar,
  ForwardControl,
  PlayToggle,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  VolumeMenuButton,
} from "video-react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import React from "react";

function VideoPlayerScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state.data;

  return (
    <div className="player-container">
      <div className="overlay-btn">
        <Button
          icon="pi pi-arrow-left"
          className="p-button-rounded p-button-outlined p-button-secondary btn"
          onClick={() => {
            navigate("/shows/view", { state: { data } });
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
            setTimeout(
              () => navigate("/shows/view", { state: { data } }),
              1000
            );
          }}
          src={`/api/media/movies/stream?file=${data.file}`}
        >
          <ControlBar autoHide={true}>
            <PlayToggle />
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={10} order={1.1} />
            <VolumeMenuButton vertical />
            <PlaybackRateMenuButton
              rates={[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]}
            />
          </ControlBar>
        </Player>
      </div>
    </div>
  );
}

export default VideoPlayerScreen;
