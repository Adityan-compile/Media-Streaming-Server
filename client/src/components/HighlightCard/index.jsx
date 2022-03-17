import { useEffect, useState } from 'react'

import { Button } from "primereact/button";
import styles from "./styles.module.css";

function HighlightCard({ data, successHandler, errorHandler, deleteHighlight }) {
    const [item, setItem] = useState({});

    useEffect(() => {
        if (data.highlightType === "movie") {
            let temp = {};
            temp.id = data.id;
            temp.name = data['Movie.name'];
            temp.backdrop = data['Movie.backdrop'];
            temp.adult = data['Movie.adult'];
            temp.date = data['Movie.createdAt'];
            setItem(temp);
        } else {
            let temp = {};
            temp.id = data.id;
            temp.name = data['Show.name'];
            temp.backdrop = data['Show.backdrop'];
            temp.adult = data['Show.adult'];
            temp.date = data['Show.createdAt'];
            setItem(temp);
        }
    }, []);

    return (
        <div className={styles.highlight}>
            <img src={`https://image.tmdb.org/t/p/original${item.backdrop}`} alt="" className={styles.preview} />
            <div>
                <h3>{item.name}</h3>
                <h4>{new Date(item.date).getFullYear()}</h4>
            </div>
            <div className="m-20">
                <Button icon="pi pi-trash" className="p-button-danger" label="Delete" onClick={e=>{
                    e.preventDefault();
                    deleteHighlight(item.id, successHandler,errorHandler);
                }}/>
            </div>
        </div>
    )
}

export default HighlightCard;