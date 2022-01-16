const ffmpeg = require("fluent-ffmpeg");
var ffprobeStatic = require('ffprobe-static');
var ffmpegStatic = require('ffmpeg-static');
const fs = require("fs");
const path = require("path");

ffmpeg.setFfmpegPath(ffmpegStatic.path);
ffmpeg.setFfprobePath(ffprobeStatic.path);

exports.transcodeVideo = async (filename) => {
  console.log("Transcoding");
  return new Promise((resolve, reject) => {
    let fileStream = fs.createReadStream(path.resolve(`../public/uploads/${filename}`));
    ffmpeg()
      .input(fileStream)
      .videoCodec("libx264")
      .audioCodec("libmp3lame")
      .audioBitrate("320k")
      .outputFormat('mp4')
      .size("1920x?")
      .on("error", (err) => {
        reject(err);
      }).on('end', ()=>resolve(null))
      .save(path.resolve(`../public/uploads/${filename}`));
  });
};
