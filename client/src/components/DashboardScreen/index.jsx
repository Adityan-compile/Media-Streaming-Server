import "./styles.css";

import React from "react";
import { TabMenu } from "primereact/tabmenu";

function DashboardScreen() {
  const menuItems = [
    {
      label: "Server Name",
      icon: "pi pi-server",
      disabled: true
    },
    {
      label: "Manage Content",
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
      label: "Settings",
      icon: "pi pi-cog",
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
    },
  ];
  return (
    <div className="dashboard">
      <div className="menu">
        <TabMenu
          model={menuItems}
        />
      </div>
    </div>
  );
}

export default DashboardScreen;
