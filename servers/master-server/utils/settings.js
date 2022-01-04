const { server } = require("../models");

exports.loadServerSettings = () => {
  return new Promise(async (resolve, reject) => {
    if (process.env.NODE_ENV === "development") {
      process.env.SERVER_NAME = "Streamflix";
      process.env.VIDEO_QUALITY = "1280x?";
      process.env.AUDIO_QUALITY = "128k";
      resolve(true);
    } else {
      try {
        let settings = await server.findAll({})[0];
        if (!settings) settings = {};
        process.env.SERVER_NAME = settings.serverName || "Streamflix";
        process.env.TMDB_API_KEY = settings.tmdbKey || "";
        process.env.VIDEO_QUALITY = settings.videoQuality || "1280x?";
        process.env.AUDIO_QUALITY = settings.audioQuality || "128k";
        resolve(true);
      } catch (e) {
        reject(e);
      }
    }
  });
};
