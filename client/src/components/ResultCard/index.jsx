import React from 'react'
import styles from "./styles.module.css"

function ResultCard({item={}, navigate=()=>{}, navigation=true, handler=()=>{}}) {

  return (
    <div className={[styles.resultCard,"m-20 mb-30"]} onClick={() => {
      if(navigation){
        navigate("/shows/view", {
          state: {
            data: item
          }
        })
      }else{
        return handler(item.id);
      }
    }}>
      <div className={styles.cardContainer}>
        <div><img src={`https://www.themoviedb.org/t/p/original${item.backdrop}`} className={styles.resultImage} /></div>
        <div className={styles.resultData}>
          <h2>{item.name}</h2>
          <h3>{item.tagline}</h3>
          <h4>{new Date(item.createdAt).getFullYear()}</h4>
        </div>
        <div>

        </div>
      </div>
    </div >
  )
}

export default ResultCard;