import "./styles.css";

import { Button } from "primereact/button";
import React from "react";
import { Toolbar } from "primereact/toolbar";

function DashboardScreen() {
  const menuItems = [
    {
      label: "Create Content",
      icon: "pi pi-upload",
    },
    {
      label: "Manage Users",
      icon: "pi pi-users",
    },
    {
      label: "File Manager",
      icon: "pi pi-file",
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
    },
  ];
  return (
    <div className="dashboard">
      <div className="menu">
        <Toolbar
          left={
            <div>
              <Button
                className="btn"
                label="Manage Content"
                icon="pi pi-server"
              />
              <Button
                className="btn p-button-info"
                label="Manage Users"
                icon="pi pi-users"
              />
              <Button
                className="btn"
                label="File Manager"
                icon="pi pi-folder"
              />
            </div>
          }
          right={
            <div>
              <Button
                className="btn p-button-info"
                label="Settings"
                icon="pi pi-sitemap"
              />
              <Button
                icon="pi pi-power-off"
                label="Logout"
                className="btn p-button-danger"
              />
            </div>
          }
        />
      </div>
    </div>
  );
}

export default DashboardScreen;
