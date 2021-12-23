import "./styles.css";

import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import React from 'react';

function EditScreen() {
    return (
        <div className="edit">
                <form className="form-grid">
                    <span className="form-control">
                        <InputText label="Title" />
                    </span>
                    <span className="form-control">
                        <InputText label="Tagline" />
                    </span>
                    <span className="form-control">
                        <InputTextarea autoResize />
                    </span>
                </form>
        </div>
    )
}

export default EditScreen;
