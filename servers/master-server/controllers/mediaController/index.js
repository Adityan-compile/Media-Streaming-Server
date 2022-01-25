const {movies} = require("../../models");
const fs = require("fs");

exports.getMovies = async(req,res)=>{
    try {
        const results = await movies.findAll({});
        res.status(200).json({
            status:200,
            movies: results
        });        
    } catch (e) {
        res.status(500).json({status:500,message:"Error Getting Movies"});
    }
    
};

exports.streamMovie = (req,res)=>{
    const filename = req.query.file;
    const range = req.headers.range;
    
    if(!filename) return res.status(400).json({
        status: 400,
        message: "Bad Request, Filename Required"
    });

    if(!range){
        return res.status(400).json({
            status:400,
            message: "Range Header is Required"
        })
    }

    const filePath = `/var/app/uploads/${filename}`;
    const fileSize = fs.statSync(filePath).size;
     
    const CHUNK_SIZE = 3000000;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
    const contentLength = end - start + 1;

    res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    });

    const videoStream = fs.createReadStream(filePath, { start, end });

    videoStream.pipe(res);

};