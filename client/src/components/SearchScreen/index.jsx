import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { OrderList } from 'primereact/orderlist';
import ResultCard from "../ResultCard";
import useSearch from "../../hooks/search";
import { useState } from "react";

function SearchScreen() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const search = useSearch();


  const handler = () => {
    search(query).then(res => setResults(res)).catch(err => { });
  };

  return (
    <div style={{
      height: "100vh"
    }}>
      <div className="m-20">
        <h2 className="heading">Search</h2>
        <div className="m-20" style={{
          display: 'flex',
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <InputText placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button icon="pi pi-search" className="p-button-warning" onClick={() => handler()} />
            </div>
          </div>
        </div>
        <div className="m-20">
          <OrderList value={results} header="Results" itemTemplate={ResultCard} dragdrop={false} />
        </div>
      </div>
    </div>
  )
}

export default SearchScreen;