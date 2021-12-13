import "./styles.css";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";

function Header() {
  const navigate = useNavigate();

  const [visible,setVisible] = useState(true);

  const location = useLocation();

  useEffect(()=>{
    if(location.pathname === '/player'){
      setVisible(false);
    }else{
      setVisible(true);
    }
  },[location]);

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
  if(visible){
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
  }else{
    return null;
  }
}

export default Header;
