import "./styles.css";

import React,{ useContext, useRef, useState } from "react";

import Context from '../../store';
import ManageContent from "../ManageContent";
import { TabMenu } from "primereact/tabmenu";
import {Toast} from "primereact/toast";
import { useNavigate } from "react-router-dom";

function DashboardScreen() {

  const [activeTab,setActiveTab] = useState("manage-content");

  const {logout} = useContext(Context);

  const navigate = useNavigate();

  const toastRef = useRef(null);

  const RenderActiveTab = ()=>{
    if(activeTab === "manage-content") {
      return <ManageContent/>
    }else{
      return null;
    }
  };

  const logoutHandler = ()=>{
    logout().then(()=>{}).catch(e=>{
      return toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error Logging Out Try Again Later",
        life: 3000,
      });
    });
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
      command: ()=>logoutHandler()
    },
  ];
  return (
    <div className="dashboard">
      <Toast ref={toastRef}/>
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
