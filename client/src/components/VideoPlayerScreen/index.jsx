import "vimond-replay/index.css";

import { useLocation, useNavigate } from "react-router-dom";

import { Replay } from "vimond-replay";
import styles from "./styles.module.css";
import { useState } from "react";
import { useThrottledCallback } from "use-debounce";
import useWatching from "../../hooks/watching";

function VideoPlayerScreen() {

  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state.data;
  const mediaType = state.type;

  const [player, setPlayer] = useState(0);

  const { updateWatching } = useWatching();

  // Update Watching Position Every 10 Seconds
  const throttledUpdate = useThrottledCallback((pos)=>{
    updateWatching({
      timestamp: pos,
      filename: data.file,
      type: mediaType,
      mediaId: data.id,
      title: data.name,
      poster: data.poster
    });
  },10000);

  const handleStreamStateChange = (state) => {
    if(state.hasOwnProperty("position")){
      throttledUpdate(state.position);
    }
    if (state.playState === 'inactive') {
      const playerState = player.inspect();
      if (playerState.duration !== 0 && playerState.position !== 0) {

        setTimeout(() => {
          if (mediaType === "movie") {
            navigate("/movies/view", { state: { data } })
          } else {
            navigate("/shows/view", { state: { data } })
          }

        }, 3000);
      }
    }
    return;
  }
  return (
    <div className={styles.playerContainer}>
      <Replay
        onPlaybackActionsReady={setPlayer}
        onExit={() => {
          if (mediaType === "movie") {
            navigate("/movies/view", { state: { data } })
          } else {
            navigate("/shows/view", { state: { data } })
          }
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
