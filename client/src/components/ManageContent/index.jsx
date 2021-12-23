import "./styles.css";

import React, {useState} from 'react'

import { Button } from 'primereact/button';
import Card from '../Card';
import NewMovie from "../NewMovie";

function ManageContent() {
    const [movieModal, setMovieModal] = useState(false);
    return (
        <div className="manage">
            <Button label="New Movie" icon="pi pi-plus-circle" className="btn" onClick={()=>setMovieModal(true)}/>
            <Button label="New Show" icon="pi pi-plus-circle" className="btn"/>
            <NewMovie visible={movieModal} setVisible={setMovieModal}/>
            <div className="content">
                {
                    Array.from(Array(10).keys()).map(el=>(
                        <Card key={el} admin={true} />
                    ))
                }
            </div>
        </div>
    )
}

export default ManageContent;
