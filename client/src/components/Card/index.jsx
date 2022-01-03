import "./styles.css";

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Card({admin=false}) {

  const navigate = useNavigate();

  const [backgroundImage, setBackgroundImage] = useState(  [
    "https://www.themoviedb.org/t/p/original/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
    "https://www.themoviedb.org/t/p/original/lYYUrFTl0JtEvqxjQLsodTe4j0S.jpg",
    "https://www.themoviedb.org/t/p/w220_and_h330_face/1gxZrx9gL9ov2c1NpXimEUzMTmh.jpg",
    "https://www.themoviedb.org/t/p/original/ryjHVu68Hgk368sS8KpdzHapx3J.jpg",
    "https://www.themoviedb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
    "https://www.themoviedb.org/t/p/original/ebA1c7DvbCOH7Tjdfe7glNCb6uF.jpg",
    "https://www.themoviedb.org/t/p/original/1MJNcPZy46hIy2CmSqOeru0yr5C.jpg",
    "https://www.themoviedb.org/t/p/original/96MUCdrr6Plc5W4mTiQWtBlnN8L.jpg",
    "https://www.themoviedb.org/t/p/original/kchu0regBPDjWORUzvTblyoA5aE.jpg",
  ]);
  
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
            backgroundImage: `url('${
              backgroundImage[
                Math.round(Math.random() * (backgroundImage.length - 1) + 0)
              ]
            }'), url('https://media.comicbook.com/files/img/default-movie.png')`,
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
            backgroundImage: `url('${
              backgroundImage[
                Math.round(Math.random() * (backgroundImage.length - 1) + 0)
              ]
            }')`,
          }}
          className="card"
        >
        </div>
      </div>
    );    
  }
}

export default Card;
