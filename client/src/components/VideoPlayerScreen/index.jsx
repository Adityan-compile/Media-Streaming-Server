import "./styles.css";
import "vimond-replay/index.css";

import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import React from "react";
import { Replay } from "vimond-replay";

function VideoPlayerScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state.data;

  return (
    <div className="player-container">
      {/* <div className="overlay-btn">
        <Button
          icon="pi pi-arrow-left"
          className="p-button-rounded p-button-outlined p-button-secondary btn"
          onClick={() => {
            navigate("/shows/view", { state: { data } });
          }}
        />
      </div> */}
      <div className="player">
        <Replay
          onEnd={() => {
            setTimeout(
              () => navigate("/shows/view", { state: { data } }),
              1000
            );
          }}
          initialPlaybackProps={{
            isPaused: true
          }}
          source={`/api/media/movies/stream?file=${data.file}`}
          className="video-player"
        />
      </div>
    </div>
  );
}

export default VideoPlayerScreen;
