import React, { useContext, useState } from "react";

import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import Context from "../../store";
import { Dialog } from "primereact/dialog";
import RenderSuggestion from "../RenderSuggestion";

function NewShow({ visible, setVisible, onSuccess, onError }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const { searchShow, saveShow } = useContext(Context);



  const save = (selected) => {
    const id = selected.value;
    saveShow(id)
      .then((res) => {
        setQuery("");
        setSuggestions([]);
        onSuccess(res);
      })
      .catch((e) => {
        console.error(e);
        onError(e);
      });
  };

  const search = () => {
    setError("");
    if (!query) return setError("Search Query is Empty");
    searchShow(query)
      .then((res) => {
        console.log(res)
        const mapped = res.map((elem) => {
          return {
            label: elem.original_name,
            value: elem.id,
            image: elem.backdrop_path,
          };
        });
        setSuggestions(mapped);
      })
      .catch((e) => setError("Cannot Reach Server or TMDB"));
  };



  return (
    <Dialog
      header="New Show"
      visible={visible}
      onHide={() => setVisible(false)}
    >
      {error && (
        <h4
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#FF3333",
          }}
        >
          {error}
        </h4>
      )}
      <div className="p-grid p-fluid">
        <div className="p-col-12 p-md-4">
          <div className="p-inputgroup">
            <AutoComplete
              placeholder="Search Show"
              suggestions={suggestions}
              value={query}
              field="label"
              completeMethod={() => {
                return;
              }}
              onChange={(e) => {
                setQuery(e.value);
              }}
              itemTemplate={RenderSuggestion}
              onSelect={(e) => save(e.value)}
            />
            <Button label="Search" onClick={() => search()} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default NewShow;