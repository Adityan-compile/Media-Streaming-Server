const multer = require("../../config/multer");

exports.uploadFile = (req, res) => {
  const body = req.body;

  if (!body || Object.keys(body) === 0 || !req.file) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }

  if(body.mediaType === "movie"){
      //Add Movie File Upload Code 
  }else if(body.mediaType === "show"){
      //Add TV Show File Upload Code
  }else if(body.mediaType === "generic"){
      //Add Generic Media Upload Code
  }else{
      return res.status(400).json({
          status: 400,
          message: "Bad or Unsupported Media Type"
      });
  }

};
