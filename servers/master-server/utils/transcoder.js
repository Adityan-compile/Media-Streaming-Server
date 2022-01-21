const ffmpeg = require("fluent-ffmpeg");
var ffprobeStatic = require('ffprobe-static');
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const fs = require("fs");
const path = require("path");

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobeStatic.path);

exports.transcode = async (filename) => {
  console.log("Starting Transcoder");
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(path.resolve(`/var/app/uploads/temp/${filename}`))
      .videoCodec("libx264")
      .audioCodec("libmp3lame")
      .audioBitrate("320k")
      .outputFormat('mp4')
      .size("1920x?")
      .on("progress", (event)=>{
        console.info(event)
      })
      .on("error", (err) => {
        console.error("Transcoding Error", err);
        fs.renameSync(path.resolve(`/var/app/uploads/temp/${filename}`), path.resolve(`/var/app/uploads/${filename}`));
        reject(err);
      }).on('end', ()=>{
        console.log(
          "Transcoding Finished"
        );
        fs.unlinkSync(path.resolve(`/var/app/uploads/temp/${filename}`));
        resolve(null)
      })
      .save(path.resolve(`/var/app/uploads/${filename}`));
  });
};

