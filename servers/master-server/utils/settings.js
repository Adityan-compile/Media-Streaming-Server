const {Server} = require("../models");

exports.loadServerSettings = ()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let settings = await Server.findAll({})[0];
            if(!settings) settings = {};
            process.env.SERVER_NAME = settings.serverName || "Streamflix";
            process.env.TMDB_API_KEY = settings.tmdbKey || "";
            process.env.VIDEO_QUALITY = settings.videoQuality || "1280x?";
            process.env.AUDIO_QUALITY = settings.audioQuality || "128k";
            resolve(true);
        }catch(e){
            reject(e);
        }
    });
};