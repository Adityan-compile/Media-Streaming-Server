import { Offline, Online } from "react-detect-offline";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import styles from "./styles.module.css";

function Header() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/player") {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [location]);

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
      command: () => {
        navigate('/movies');
      }
    },
    {
      label: "Shows",
      icon: "pi pi-desktop",
      command: () => {
        navigate('/shows');
      }
    },
    {
      label: "Search",
      icon: "pi pi-search",
      command: () => {
        navigate("/search");
      },
    },
  ];
  if (visible) {
    return (
      <div>
        <Menubar
          model={navItems}
          className={styles.nav}
          start={
            <Link to={"/"} className={styles.brand}>
              Streamflix
            </Link>
          }
          end={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  margin: "10px",
                }}
              >
                <Online>
                  <Badge value="Online" severity="success" />
                </Online>

                <Offline>
                  <Badge value="Offline" severity="danger" />
                </Offline>
              </div>
              <Button
                icon="pi pi-user"
                onClick={() => navigate("/dashboard")}
              />
            </div>
          }
        ></Menubar>
      </div>
    );
  } else {
    return null;
  }
}

export default Header;
