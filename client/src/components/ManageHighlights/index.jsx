import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import ResultCard from "../ResultCard";
import { Sidebar } from 'primereact/sidebar';
import styles from "./styles.module.css";
import useHighlights from "../../hooks/highlights";
import useSearch from "../../hooks/search";
import { useState } from 'react';

function ManageHighlights() {

  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = useSearch();
  const { highlights, createHighlight } = useHighlights();

  const handler = () => {
    search(query).then(res => setResults(res)).catch(err => { });
  };

  const onSelect = (body) => {
    // console.log({ body.id, body.highlightType })
    createHighlight(body.id, body.highlightType, () => { }, () => { });
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
        {
          highlights.map(el => <ResultCard key={el.id} item={el} navigation={false} handler={onSelect} />)
        }
      </div>
    </div>
  );
}

export default ManageHighlights;
