const { shows, movies } = require("../../models");
const transcoder = require("../../utils/transcoder");
const axios = require("../../config/axios");

exports.addShow = async (req, res) => {
  const showId = req.query.id;
  if (!showId) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }

  try {

    const { data: showData } = await axios.get(
      `/movie/${showId}?append_to_response=trailers,credits`
    );
    let genres = [];
    if (showData.genres.length > 0) {
      genres = showData.genres.map((el) => {
        return el.name;
      });
    }

    let crew = [];
    if (showData.credits.cast.length > 0) {
      crew = showData.credits.cast.slice(0, 10).map((el) => {
        return {
          name: el.name,
          character: el.character,
        };
      });
    }

    let trailer = "";
    if (showData.trailers.youtube.length > 0) {
      trailer = showData.trailers.youtube.filter((el) => {
        return el.type === "Trailer";
      })[0].source;
    }

    let studio = "";
    if (showData.networks.length > 0) {
      studio = showData.networks[0].name;
    }

    try {
      const newShow = await shows.create({
        name: showData.original_name,
        description: showData.overview,
        lang: showData.original_language.toUpperCase(),
        tagline: showData.tagline,
        poster: showData.poster_path,
        rating: showData.vote_average,
        createdAt: showData.release_date,
        adult: showData.adult,
        genres: genres,
        crew: crew,
        trailer: trailer,
        studio: studio,
        runtime: showData.episode_run_time[0].toString(),
        backdrop: showData.backdrop_path
      });

      res.status(201).json({
        status: 201,
        message: "Show Created Successfully",
        movie: newShow.toJSON(),
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        status: 500,
        message: "Cannot Create Movie",
      });
    }    
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Cannot Create Show",
    });
  }
};

exports.addMovie = async (req, res) => {
  const movieId = req.query.id;
  if (!movieId) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  }

  try {
    const { data: movieData } = await axios.get(
      `/movie/${movieId}?append_to_response=trailers,credits`
    );
    let genres = [];
    if (movieData.genres.length > 0) {
      genres = movieData.genres.map((el) => {
        return el.name;
      });
    }

    let crew = [];
    if (movieData.credits.cast.length > 0) {
      crew = movieData.credits.cast.slice(0, 10).map((el) => {
        return {
          name: el.name,
          character: el.character,
        };
      });
    }

    let trailer = "";
    if (movieData.trailers.youtube.length > 0) {
      trailer = movieData.trailers.youtube.filter((el) => {
        return el.type === "Trailer";
      })[0].source;
    }

    let studio = "";
    if (movieData.production_companies.length > 0) {
      studio = movieData.production_companies[0].name;
    }
    
    try {
      const newMovie = await movies.create({
        name: movieData.title,
        description: movieData.overview,
        lang: movieData.original_language.toUpperCase(),
        tagline: movieData.tagline,
        poster: movieData.poster_path,
        rating: movieData.vote_average,
        createdAt: movieData.release_date,
        adult: movieData.adult,
        genres: genres,
        crew: crew,
        trailer: trailer,
        studio: studio,
        runtime: movieData.runtime.toString(),
        backdrop: movieData.backdrop_path
      });

      res.status(201).json({
        status: 201,
        message: "Show Created Successfully",
        movie: newMovie.toJSON(),
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        status: 500,
        message: "Cannot Create Show",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(503).json({
      status: 503,
      message: "TMDB Unavailable",
    });
  }
};

exports.uploadMovieFile = async(req, res) => {
 const params = req.query;
 const file = req.file;

 if(!file){
   return res.status(400).json({
     status: 400,
     message: "Movie File Required for upload"
   });
 }
 let updated = {};
try {
 updated = await movies
  .update(
    {
      file: file.filename,
    },
    {
      where: {
        id: params.movieId,
      },
      returning: true,
      plain: true
    }
  );
} catch (e) {
  return res.status(500).json({status: 500, message: "Cannot Save Movie"})

}
if(process.env.TRANSCODER_ENABLED){
  try{
    await transcoder.transcode(file.filename);
  }catch(err){
    return res.status(206).json({
      status: 206,
      message: "Transcode Error, File Saved Successfully"
    });
  }
}else{
  transcoder.moveFile(file.filename);
}

return res.status(201).json({
  status: 201,
  movie: updated[1].toJSON(),
  message: "File Saved Successfully"
})

};

exports.uploadShowFile = async(req, res) => {
  const params = req.query;
  const file = req.file;
 
  if(!file){
    return res.status(400).json({
      status: 400,
      message: "Movie File Required for upload"
    });
  }
  let updated = {};
 try {
  updated = await shows
   .update(
     {
       file: file.filename,
     },
     {
       where: {
         id: params.movieId,
       },
       returning: true,
       plain: true
     }
   );
 } catch (e) {
   return res.status(500).json({status: 500, message: "Cannot Save Movie"})
 
 }
 if(process.env.TRANSCODER_ENABLED){
   try{
     await transcoder.transcode(file.filename);
   }catch(err){
     return res.status(206).json({
       status: 206,
       message: "Transcode Error, File Saved Successfully"
     });
   }
 }else{
   transcoder.moveFile(file.filename);
 }
 
 return res.status(201).json({
   status: 201,
   movie: updated[1].toJSON(),
   message: "File Saved Successfully"
 })
 
 };
 