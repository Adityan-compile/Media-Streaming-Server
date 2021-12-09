import "./styles.css";

import React from "react";
import ReactPlayer from "react-player";

function VideoPlayerScreen() {
  return (
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
  );
}

export default VideoPlayerScreen;
