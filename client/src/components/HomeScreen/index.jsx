import "./styles.css";

import Card from "../Card";
import React from "react";

function HomeScreen() {
  return (
    <div className="home">
      <div id="explore">
        <h2 className="home-title">Explore,</h2>
        <div className="container">
          {Array.from(Array(10).keys()).map((el) => (
            <Card key={el} />
          ))}
        </div>
      </div>
      <div id="continue">
        <h2 className="home-title">Continue Watching,</h2>
        <div className="continue">
          {Array.from(Array(2).keys()).map((el) => (
            <Card key={el} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
