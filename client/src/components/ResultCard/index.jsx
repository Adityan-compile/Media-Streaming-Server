import "./styles.css"

import React from 'react'

function ResultCard({item={}, navigate=()=>{}, navigation=true, handler=()=>{}}) {

  return (
    <div className="m-20 result-card mb-30" onClick={() => {
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
      <div className="card-container">
        <div><img src={`https://www.themoviedb.org/t/p/original${item.backdrop}`} className="result-image" /></div>
        <div className="result-data">
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