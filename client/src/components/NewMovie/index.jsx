import React, { useContext, useState } from "react";

import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import Context from "../../store";
import { Dialog } from "primereact/dialog";

function NewMovie({ visible, setVisible, onSuccess, onError }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const { searchMovie, saveMovie } = useContext(Context);



  const save = (selected) => {
    const id = selected.value;
    saveMovie(id)
      .then((res) => {
        setQuery("");
        setSuggestions([]);
        onSuccess();
      })
      .catch((e) => {
        console.error(e);
        onError(e);
      });
  };

  const search = () => {
    setError("");
    if (!query) return setError("Search Query is Empty");
    searchMovie(query)
      .then((res) => {
        const mapped = res.map((elem) => {
          return {
            label: elem.original_title,
            value: elem.id,
            image: elem.backdrop_path,
          };
        });
        setSuggestions(mapped);
      })
      .catch((e) => setError("Cannot Reach Server or TMDB"));
  };

  const renderSuggestion = (item) => (
    <div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: 'center'
      }}>
        <img
          src={`https://www.themoviedb.org/t/p/original${item.image}`}
          alt="poster"
          height="60"
          width="80"
          style={{
            objectFit: 'contain'
          }}
        ></img>
        <h3 style={{
          margin: '10px'
        }}>{item.label}</h3>
      </div>
    </div>
  );

  return (
    <Dialog
      header="New Movie"
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
              placeholder="Search Movie"
              suggestions={suggestions}
              value={query}
              field="label"
              completeMethod={() => {
                return;
              }}
              onChange={(e) => {
                setQuery(e.value);
              }}
              itemTemplate={renderSuggestion}
              onSelect={(e) => save(e.value)}
            />
            <Button label="Search" onClick={() => search()} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default NewMovie;
