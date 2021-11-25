import "./styles.css";

import Card from "../Card";
import React from "react";

function HomeScreen() {
  return (
    <div className="home">
      <div className="container">
        {Array.from(Array(10).keys()).map((el) => (
          <Card key={el} />
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
