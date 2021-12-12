import "./styles.css";
import "video.js/dist/video-js.css";

import { Button } from "primereact/button";
import React from "react";
import ReactPlayer from "react-player";
import sample from "../../assets/sample.mp4";
import { useNavigate } from "react-router-dom";
import videojs from "video.js";

function VideoPlayerScreen() {
  const navigate = useNavigate();
  return (
    <div className="player-screen-container">
      <div className="overlay-btn">
        <Button
          icon="pi pi-arrow-left"
          className="p-button-rounded p-button-outlined p-button-secondary btn"
          onClick={()=>{
            navigate('/shows/view');
          }}
        />
      </div>

      <div className="player-container">
        {/* <ReactPlayer
          url="https://youtu.be/SmqeO5mj0ec"
          playing={true}
          controls={true}
          height="100vh"
          width="100%"
          pip={true}
        /> */}
        <video
          src={sample}
          autoPlay
          controls
          className="player"
          controlsList="nodownload"
          onEnded={()=>navigate('/shows/view')}
        ></video>
      </div>
    </div>
  );
}

export default VideoPlayerScreen;
