import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import HighlightCard from "../HighlightCard";
import { InputText } from "primereact/inputtext";
import ResultCard from "../ResultCard";
import styles from "./styles.module.css";
import useHighlights from "../../hooks/highlights";
import useSearch from "../../hooks/search";
import { useState } from 'react';
import useToast from "../../hooks/toast";

function ManageHighlights() {

  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const toastRef = useToast();

  const search = useSearch();
  const { highlights, createHighlight, deleteHighlight } = useHighlights();

  const handler = () => {
    search(query).then(res => setResults(res)).catch(err => { });
  };

  const onSelect = (body) => {
    createHighlight(body.id, body.highlightType, () => {
      toastRef.current.show({
        severity: "success",
        summary: "Success",
        detail: "Highlight Created Successfully",
        life: 3000,
      });
      setQuery("");
      setResults([]);
      setVisible(false);
    }, () => {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "Highlight Creation Error",
        life: 3000,
      });
    });
  };

  const deleteSuccess = () => {
    toastRef.current.show({
      severity: "success",
      summary: "Success",
      detail: "Highlight Deleted",
      life: 3000,
    });
  };
  const deleteError = () => {
    toastRef.current.show({
      severity: "error",
      summary: "Error",
      detail: "Cannot Delete Highlight",
      life: 3000,
    });
  };

  return (
    <div>
      <div id="create-highlight-modal">
        <Dialog visible={visible} onHide={() => setVisible(false)} style={{ width: '80vw' }}>
          <h4 className="heading">New Highlight</h4>
          <div className={[styles.modalSection].join(" ")}>
            <div className="col-12 md:col-4">
              <div className="p-inputgroup">
                <InputText Placeholder="Search Movies or TV Shows" value={query} onChange={e => setQuery(e.target.value)} />
                <Button icon="pi pi-search" className="p-button-warning" onClick={() => handler()} />
              </div>
            </div>
            <div className="results">
              <h6 className={styles.subHead}>Results</h6>
              <div>
                {
                  results?.map(el => <ResultCard key={el.id} item={el} navigation={false} handler={(id) => onSelect(id)} />)
                }
              </div>
            </div>
          </div>
        </Dialog>
      </div>
      <div id="page-content">
        <div className="m-20">
          <Button label="New Highlight" icon="pi pi-plus" onClick={() => setVisible(true)} />
        </div>
        <div className="flex" style={{
          justifyContent: 'center'
        }}>
          {
            highlights.map(el => <HighlightCard key={el.id} data={el} successHandler={deleteSuccess} errorHandler={deleteError} deleteHighlight={deleteHighlight} />)
          }
        </div>
      </div>
    </div>
  );
}

export default ManageHighlights;
