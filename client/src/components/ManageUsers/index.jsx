import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react'
import styles from "./styles.module.css";
function ManageUsers() {
    return (
        <div className='m-20'>
            <h1 className="heading">Manage Users</h1>
            <div>
                <DataTable  responsiveLayout="scroll">
                    <Column header="Name"/>
                    <Column header="Privilage" />
                    <Column header="Delete"/>
                </DataTable>
            </div>
        </div>
    )
}

export default ManageUsers;