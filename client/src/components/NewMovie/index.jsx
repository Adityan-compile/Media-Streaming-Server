import React, { useContext, useRef, useState } from "react";

import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import Context from '../../store';
import { Dialog } from "primereact/dialog";

function NewMovie({ visible, setVisible }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error,setError] = useState("");

  const {searchMovie} = useContext(Context);

  const search = ()=>{
    setError("");
    if(!query) return setError("Search Query is Empty");
    searchMovie(query).then(res=>setSuggestions(res)).catch(e=>setError("Cannot Reach Server or TMDB"));
  };

  return (
    <Dialog
      header="New Movie"
      visible={visible}
      onHide={() => setVisible(false)}
    >
      {error && (        
        <h4 style={{
          textAlign: "center",
          marginBottom: "10px",
          color:"#FF3333"
        }}>{error}</h4>
      )}
      <div className="p-grid p-fluid">
        <div className="p-col-12 p-md-4">
          <div className="p-inputgroup">
            <AutoComplete
              placeholder="Search Movie"
              suggestions={suggestions}
              value={query}
              onChange={(e) => setQuery(e.value)}
            />
            <Button label="Search" onClick={()=>search()} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default NewMovie;

{
  /* <div className="modal">
  <div
    className="form-grid modal-content"
    style={{
      margin: "20px",
    }}
  >
    <div className="form-control p-float-label">
      <InputText id="name" />
      <label htmlFor="name">Name</label>
    </div>
    <div className="form-control p-float-label">
      <InputText id="tagline" />
      <label htmlFor="tagline">Tagline</label>
    </div>
  </div>
  <div
    className="form-control p-float-label"
    style={{
      width: "100%",
      marginLeft: "20px",
      marginRight: "20px"    
    }}
  >
    <InputTextarea
      id="desc"
      autoResize
      style={{
        width: "100%",
      }}
    />
    <label htmlFor="desc">Description</label>
  </div>
</div> */
}
