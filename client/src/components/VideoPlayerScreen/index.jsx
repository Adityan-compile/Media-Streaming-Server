import "./styles.css";
import "vimond-replay/index.css";

import { useLocation, useNavigate } from "react-router-dom";

import { Replay } from "vimond-replay";
import { useState } from "react";

function VideoPlayerScreen() {
  
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state.data;
   
  const [initialLoad,setInitialLoad] = useState(true);
  
  // Implement Stream Ended State Navigation
  const handleStreamStateChange = (state)=>{
    if(initialLoad){
      setInitialLoad(false);
      return;
    }
    if(state){
      if('playState' in state){
        if(state.playState === 'inactive' && !initialLoad){
          console.log("Ended")
        }
      }
    }
  }
  return (
    <div className="player-container">
      <Replay
        onEnd={() => {
          console.log("Video Ended")
          setTimeout(() => navigate("/shows/view", { state: { data } }), 1000);
        }}
        onExit={() => {
          navigate("/shows/view", { state: { data } });
        }}
        initialPlaybackProps={{
          volume: 0.6
        }}
        source={`/api/media/movies/stream?file=${data.file}`}
        onStreamStateChange={handleStreamStateChange}
      />
    </div>
  );
}

export default VideoPlayerScreen;
