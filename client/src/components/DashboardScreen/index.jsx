import React, { useContext, useRef, useState } from "react";

import Context from '../../store';
import ManageContent from "../ManageContent";
import ManageHighlights from "../ManageHighlights";
import ManageUsers from "../ManageUsers";
import ServerStatsScreen from "../ServerStatsScreen";
import Settings from "../Settings";
import { TabMenu } from "primereact/tabmenu";
import styles from "./styles.module.css";
import useSettings from "../../hooks/settings";
import useToast from "../../hooks/toast";

function DashboardScreen() {

  const [activeTab, setActiveTab] = useState("server-stats");

  const { logout } = useContext(Context);

  const toastRef = useToast();

  const { settings } = useSettings();

  const RenderActiveTab = () => {
    switch (activeTab) {
      case "manage-content":
        return <ManageContent />;
      case "manage-highlights":
        return <ManageHighlights />;
      case "manage-users":
        return <ManageUsers />;
      case "settings":
        return <Settings />;
      case "server-stats":
        return <ServerStatsScreen />;
      default:
        return null;
    }
  };

  const logoutHandler = () => {
    logout().then(() => { }).catch(e => {
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
      label: settings.serverName || "Streamflix",
      icon: "pi pi-server",
      command: () => { setActiveTab("server-stats") }
    },
    {
      label: "Manage Content",
      icon: "pi pi-upload",
      command: () => setActiveTab("manage-content")
    },
    {
      label: "Manage Highlights",
      icon: "pi pi-star",
      command: () => setActiveTab("manage-highlights")
    },
    {
      label: "Manage Users",
      icon: "pi pi-users",
      command: () => setActiveTab("manage-users")
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      command: () => setActiveTab("settings")
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
      command: () => logoutHandler()
    },
  ];
  return (
    <div className={styles.dashboard}>
      <div className={styles.menu}>
        <TabMenu
          model={menuItems}
          activeIndex={0}
        />
      </div>
      <RenderActiveTab />
    </div>
  );
}

export default DashboardScreen;
