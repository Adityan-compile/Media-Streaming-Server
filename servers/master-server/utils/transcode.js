const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");

exports.transcodeVideo = async (filename, filepath) => {
  return new Promise((resolve, reject) => {
    let fileStream = fs.createReadStream(path.resolve(filepath));
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
