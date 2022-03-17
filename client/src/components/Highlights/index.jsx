import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
import styles from "./styles.module.css";
import useHighlights from "../../hooks/highlights";

function Highlights() {

  const { highlights } = useHighlights();

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

  const itemTemplate = (item) => {
    console.log(item)
    if (item.highlightType === "movie") {
      return (
        <div className={styles.itemContainer}>
          <img src={`https://www.themoviedb.org/t/p/original${item['Movie.poster']}`} className={styles.poster} />
          <img src={`https://www.themoviedb.org/t/p/original${item['Movie.backdrop']}`} className={styles.carousel} />
        </div>
      );
    } else {
      return (
        <div className={styles.itemContainer}>
          <img src={`https://www.themoviedb.org/t/p/original${item['Show.poster']}`} className={styles.poster} />
          <img src={`https://www.themoviedb.org/t/p/original${item['Show.backdrop']}`} className={styles.carousel} />
        </div>
      );
    }
  };

  const captionTemplate = (item) => (
    <div className={styles.captionContainer}>
      <Button
        icon="pi pi-play"
        style={{ margin: "10px" }}
        className="p-button-info p-button-rounded p-button-outlined p-button-raised"
      />
      <div className={styles.captionText}>
        {item.highlightType === "movie" ? (
          <div>
            <h3>{item['Movie.name']}</h3>
            <p>{new Date(item['Movie.createdAt']).getFullYear()}</p>
          </div>
        ) : (
          <div>
            <h3>{item.Show.name}</h3>
            <p>{item.Show.year}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <Galleria
        value={highlights}
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
