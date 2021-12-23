import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React from "react";

function NewMovie({ visible, setVisible }) {
  return (
    <Dialog
      header="New Movie"
      visible={visible}
      onHide={() => setVisible(false)}
    >
      <div className="p-float-label form-control">
          <InputText id="searchName" />
          <label htmlFor="searchName">Movie Name</label>
      </div>
    </Dialog>
  );
}

export default NewMovie;

{/* <div className="modal">
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
</div> */}