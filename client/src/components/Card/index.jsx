import "./styles.css";

import React, { useContext, useState } from "react";

import Context from "../../store/";
import { ContextMenu } from "primereact/contextmenu";

function Card() {
  const { contextMenu } = useContext(Context);

  const [backgroundImage, setBackgroundImage] = useState([
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
  const items = [
    {
      label: "Play",
      icon: "pi pi-play",
    },
    {
      separator: true,
    },
    {
      label: "Info",
      icon: "pi pi-info",
    },
    {
      separator: true,
    },
    {
      label: "Edit",
      icon: "pi pi-pencil",
    },
    {
      separator: true,
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
    },
  ];
  return (
    <div>
      <ContextMenu model={items} ref={contextMenu} />
      <div
        style={{
          backgroundImage: `url('${
            backgroundImage[
              Math.round(Math.random() * (backgroundImage.length - 1) + 0)
            ]
          }')`,
        }}
        className="card"
        onContextMenu={(e) => contextMenu.current.show(e)}
      >
        <div className="overlay">
          <i className="pi pi-play overlay-icon"></i>
        </div>
      </div>
    </div>
  );
}

export default Card;
