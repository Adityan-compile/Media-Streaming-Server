import "./styles.css";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Movies",
      icon: "pi pi-ticket",
    },
    {
      label: "Tv Shows",
      icon: "pi pi-desktop",
    },
    {
      label: "Images",
      icon: "pi pi-image",
    },
    {
      label: "",
      template: (item, options) => (
        <div className="p-grid p-fluid p-3">
          <div className="p-col-12 p-md-4">
            <div className="p-inputgroup">
              <InputText placeholder="Search" />
              <Button icon="pi pi-search" />
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Menubar
        model={navItems}
        className="nav"
        start={
          <Link to={"/"} className="brand">
            Streamflix
          </Link>
        }
        end={
          <Button icon="pi pi-user" onClick={() => navigate("/dashboard")} />
        }
      ></Menubar>
    </div>
  );
}

export default Header;
