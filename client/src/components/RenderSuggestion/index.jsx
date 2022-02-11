import React from "react";
const RenderSuggestion = (item) => (
    <div>
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: 'center'
        }}>
            <img
                src={`https://www.themoviedb.org/t/p/original${item.image}`}
                alt="poster"
                height="60"
                width="80"
                style={{
                    objectFit: 'contain'
                }}
            ></img>
            <h3 style={{
                margin: '10px'
            }}>{item.label}</h3>
        </div>
    </div>
);

export default RenderSuggestion