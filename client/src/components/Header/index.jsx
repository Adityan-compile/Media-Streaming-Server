import "./styles.css";

import { Offline, Online } from "react-detect-offline";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AutoComplete } from "primereact/autocomplete";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import RenderSuggestion from "../RenderSuggestion";
import useSearch from "../../hooks/search";

function Header() {
  const navigate = useNavigate();

  const search = useSearch();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [visible, setVisible] = useState(true);


  const handler = () => {
    search(query).then(res => results).catch(err => { });
  };

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
    },
    {
      label: "TV Shows",
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
              <AutoComplete
                placeholder="Search"
                value={query}
                onChange={e => setQuery(e.value)}
                itemTemplate={RenderSuggestion} />
              <Button icon="pi pi-search" onClick={() => handler()} />
            </div>
          </div>
        </div>
      ),
    },
  ];
  if (visible) {
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
