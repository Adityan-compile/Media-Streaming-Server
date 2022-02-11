import { Button } from "primereact/button";
import React from 'react'
import ResultCard from "../ResultCard";
import { useNavigate } from "react-router-dom";
function SearchScreen() {

  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh"
    }}>
      <div className="m-20">
        <Button className="p-button-rounded" icon="pi pi-home" onClick={()=>navigate('/')} />
        <h3 className="sub-head">Results</h3>
        <div className="result-items">
          <ResultCard/>
        </div>
      </div>
    </div>
  )
}

export default SearchScreen;