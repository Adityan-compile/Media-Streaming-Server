import "./styles.css";

import React,{ useState } from "react";

import ManageContent from "../ManageContent";
import { TabMenu } from "primereact/tabmenu";

function DashboardScreen() {

  const [activeTab,setActiveTab] = useState("manage-content");

  const RenderActiveTab = ()=>{
    if(activeTab === "manage-content") {
      return <ManageContent/>
    }else{
      return null;
    }
  };

  const menuItems = [
    {
      label: "Server Name",
      icon: "pi pi-server",
      disabled: true,
      command: ()=>{return;}
    },
    {
      label: "Manage Content",
      icon: "pi pi-upload",
      command: ()=> setActiveTab("manage-content")
    },
    {
      label: "Manage Users",
      icon: "pi pi-users",
      command: ()=>setActiveTab("manage-users")
    },
    {
      label: "File Manager",
      icon: "pi pi-file",
      command: ()=>setActiveTab("file-manager")
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      command: ()=>setActiveTab("settings")
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: ()=>{return;}
    },
  ];
  return (
    <div className="dashboard">
      <div className="menu">
        <TabMenu
          model={menuItems}
        />
      </div>
      <RenderActiveTab/>
    </div>
  );
}

export default DashboardScreen;
