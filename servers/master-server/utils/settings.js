const Server = require("../models/server");

exports.loadServerSettings = ()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let settings = await Server.findAll({});
            console.log(settings);
            process.env.SERVER_NAME = settings.serverName;
            process.env.TMDB_API_KEY = settings.tmdbKey;
            process.env.VIDEO_QUALITY = settings.videoQuality;
            process.env.AUDIO_QUALITY = settings.audioQuality;
            resolve(true);
        }catch(e){
            reject(e);
        }
    });
};