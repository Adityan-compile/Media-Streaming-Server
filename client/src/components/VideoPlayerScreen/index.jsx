import "vimond-replay/index.css";

import { useLocation, useNavigate } from "react-router-dom";

import { Replay } from "vimond-replay";
import styles from "./styles.module.css";
import { useState } from "react";

function VideoPlayerScreen() {
  
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state.data;
   
  const [player,setPlayer] = useState(0);
  
  // Implement Stream Ended State Navigation
  const handleStreamStateChange = (state)=>{
          if(state.playState === 'inactive'){
            const playerState = player.inspect();
            if(playerState.duration !== 0 && playerState.position !== 0){
              setTimeout(navigate("/shows/view", { state: { data } }),3000);
            }
          }
      return;
  }
  return (
    <div className={styles.playerContainer}>
      <Replay
        onPlaybackActionsReady={setPlayer}
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
