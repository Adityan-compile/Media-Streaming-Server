import {Button} from "primereact/button";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react'
import styles from "./styles.module.css";
import useManageUsers from '../../hooks/users';
import useToast from "../../hooks/toast";

function ManageUsers() {
    
    const toastRef = useToast();

    const { users } = useManageUsers((err)=>{
        let errObj = {
            severity: "error",
            summary: "Error",
            detail: "",
            life: 3000,
        };
        if(err === "fetchUsersError"){
            errObj.detail = "Cannot Fetch Users"
        }
        toastRef.current.show(errObj);
    });

    console.log(users)

    return (
        <div className='m-20'>
            <h1 className="heading">Manage Users</h1>
            <div>
                <DataTable value={users}  responsiveLayout="scroll">
                    <Column field="0" header="Id" body={el=><h3>{el[0]}</h3>}/>
                    <Column field="1" header="Name" body={el=><h3>{el[1]}</h3>} />
                    <Column header="Privilage" body={<h3>Root</h3>} />
                    <Column header="Delete" body={item=><Button label="Delete" className="p-button-danger"/>}/>
                </DataTable>
            </div>
        </div>
    )
}

export default ManageUsers;