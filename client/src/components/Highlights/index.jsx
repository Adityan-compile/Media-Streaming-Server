// import { } from "react";
import "./styles.css";

import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";

function Highlights() {
  const images = [
    {
      name: "Spiderman: No Way Home",
      year: 2021,
      backdrop:
        "https://www.themoviedb.org/t/p/original/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg",
      poster:
        "https://www.themoviedb.org/t/p/original/j5f5bRlpChRuyHdexmeSnQmklDt.jpg",
    },
    {
      name: "Shang Chi and the Legend of the Ten Rings",
      year: 2021,
      backdrop:
        "https://www.themoviedb.org/t/p/original/cinER0ESG0eJ49kXlExM0MEWGxW.jpg",
      poster:
        "https://www.themoviedb.org/t/p/original/65MHN2VZ9kwQ0X9pi3QvbJjZGR1.jpg",
    },
    {
      name: "Avengers: Endgame",
      year: 2019,
      backdrop:
        "https://www.themoviedb.org/t/p/original/orjiB3oUIsyz60hoEqkiGpy5CeO.jpg",
      poster:
        "https://www.themoviedb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    },
  ];

  const itemTemplate = (item) => (
    <div className="item-container">
      <img src={item.poster} className="poster" />
      <img src={item.backdrop} className="carousel" />
    </div>
  );

  const captionTemplate = (item) => (
    <div className="caption-container">
      <Button
        icon="pi pi-play"
        style={{ margin: "10px" }}
        className="p-button-info p-button-rounded p-button-outlined p-button-raised"
      />
      <div className="caption-text">
        <h3>{item.name}</h3>
        <p>{item.year}</p>
      </div>
    </div>
  );

  return (
    <div>
      <Galleria
        value={images}
        item={itemTemplate}
        autoPlay={true}
        transitionInterval={5000}
        showThumbnails={false}
        showIndicators={true}
        circular={true}
        caption={captionTemplate}
        style={{
          margin: "20px",
        }}
      ></Galleria>
    </div>
  );
}

export default Highlights;
