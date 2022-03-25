const { server } = require("../models");

exports.loadServerSettings = () => {
  return new Promise(async (resolve, reject) => {
    if (process.env.NODE_ENV === "development") {
      process.env.SERVER_NAME = "Streamflix";
      process.env.VIDEO_QUALITY = "1280x?";
      process.env.AUDIO_QUALITY = "128k";
      process.env.TRANSCODER_ENABLED = true;
      resolve(true);
    } else {
      try {
        let settings = await server.findAll({})[0];
        if (!settings) settings = {};
        process.env.SERVER_NAME = settings.serverName || "Streamflix";
        process.env.TMDB_API_KEY = settings.tmdbKey || "";
        process.env.VIDEO_QUALITY = settings.videoQuality || "1280x?";
        process.env.AUDIO_QUALITY = settings.audioQuality || "128k";
        process.env.TRANSCODER_ENABLED = settings.transcoder || true;
        resolve(true);
      } catch (e) {
        reject(e);
      }
    }
  });
};

exports.serverSettingsDump = {
  servername: process.env.SERVER_NAME,
  tmdbKey: process.env.TMDB_API_KEY,
  videoQuality: process.env.VIDEO_QUALITY,
  audioQuality: process.env.AUDIO_QUALITY,
  transcoder: process.env.TRANSCODER_ENABLED,
};
