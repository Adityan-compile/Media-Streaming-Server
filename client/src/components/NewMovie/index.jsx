import React, { useState } from "react";

import { AutoComplete } from "primereact/autocomplete";
import {Button} from "primereact/button";
import { Dialog } from "primereact/dialog";

function NewMovie({ visible, setVisible }) {
  const [query,setQuery] = useState("");
  return (
    <Dialog
      header="New Movie"
      visible={visible}
      onHide={() => setVisible(false)}
    >
      <div className="p-grid p-fluid">
        <div className="p-col-12 p-md-4">
          <div className="p-inputgroup">
            <AutoComplete placeholder="Search Movie" value={query} onChange={(e)=>setQuery(e.value)} />
            <Button label="Search" />
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
