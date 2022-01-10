import "./styles.css";

import React from "react";
import { useNavigate } from "react-router-dom";

function Card({data, admin=false}) {

  const navigate = useNavigate();
  
  if(admin){
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          navigate(`/shows/edit`);
        }}
      >
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${data?.poster}'), url('https://media.comicbook.com/files/img/default-movie.png')`,
          }}
          className="card"
        >
        </div>
      </div>
    );
  }else{
    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          navigate("/shows/view");
        }}
      >
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${data?.poster}'), url('https://media.comicbook.com/files/img/default-movie.png')`,
          }}
          className="card"
        >
        </div>
      </div>
    );    
  }
}

export default Card;
