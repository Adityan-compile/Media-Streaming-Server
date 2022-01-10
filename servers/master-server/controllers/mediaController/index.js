const {movies} = require("../../models");

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