import { Button } from "primereact/button";
import React from "react";
import error from "../assets/error404.png";
import { useNavigate } from "react-router-dom";

function NotFoundError() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <img src={error} height={"auto"} width={"470px"} alt="" />

      <Button
        label="Take me Home"
        icon="pi pi-home"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      />

      <h4
        style={{
          margin: "20px",
        }}
      >
        Image from{" "}
        <a href="https://pngtree.com/so/error" className="link">
          pngtree.com
        </a>
      </h4>
    </div>
  );
}

export default NotFoundError;
