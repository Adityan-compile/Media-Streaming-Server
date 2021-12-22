import "./styles.css";

import { Button } from 'primereact/button';
import Card from '../Card';
import React from 'react'

function ManageContent() {
    return (
        <div className="manage">
            <Button label="New Movie" icon="pi pi-plus-circle" className="btn"/>
            <Button label="New Show" icon="pi pi-plus-circle" className="btn"/>
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
