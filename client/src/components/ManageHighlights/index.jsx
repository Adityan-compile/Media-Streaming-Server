import "./styles.css";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';

function ManageHighlights() {

  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Sidebar visible={visible} fullScreen onHide={() => setVisible(false)}>
        <h4 className="heading">New Highlight</h4>
        <div className="modal-section m-20">
          <div className="col-12 md:col-4">
            <div className="p-inputgroup">
              <InputText Placeholder="Search Movies or TV Shows" />
              <Button icon="pi pi-search" label="Search" className="p-button-warning" />
            </div>
          </div>
          <div className="results">

          </div>

        </div>
      </Sidebar>
      <div className="m-20">
        <Button label="New Highlight" icon="pi pi-plus" onClick={() => setVisible(true)} />
      </div>
    </div>
  );
}

export default ManageHighlights;
