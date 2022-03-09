import React,{ useContext, useRef, useState } from "react";

import Context from '../../store';
import ManageContent from "../ManageContent";
import ManageHighlights from "../ManageHighlights";
import { TabMenu } from "primereact/tabmenu";
import styles from "./styles.module.css";
import useToast from "../../hooks/toast";

function DashboardScreen() {

  const [activeTab,setActiveTab] = useState("manage-content");

  const {logout} = useContext(Context);

  const toastRef = useToast();

  const RenderActiveTab = ()=>{
    switch(activeTab){
      case "manage-content":
        return <ManageContent/>
      case "manage-highlights":
        return <ManageHighlights/>; 
      default: 
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
      label: "Manage Highlights",
      icon: "pi pi-star",
      command: ()=> setActiveTab("manage-highlights")
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
    <div className={styles.dashboard}>
      <div className={styles.menu}>
        <TabMenu
          model={menuItems}
          activeIndex={1}
        />
      </div>
      <RenderActiveTab/>
    </div>
  );
}

export default DashboardScreen;
