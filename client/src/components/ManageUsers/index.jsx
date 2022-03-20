import { Button } from "primereact/button";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import styles from "./styles.module.css";
import useManageUsers from '../../hooks/users';
import { useState } from 'react'
import useToast from "../../hooks/toast";

function ManageUsers() {

    const toastRef = useToast();
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { users, deleteUser, addUser } = useManageUsers((err) => {
        setVisible(false);
        let errObj = {
            severity: "error",
            summary: "Error",
            detail: "",
            life: 3000,
        };
        if (err === "fetchUsersError") {
            errObj.detail = "Cannot Fetch Users";
        } else if (err === "deleteUserError") {
            errObj.detail = "Cannot Delete User";
        } else if (err === "createUserError") {
            errObj.detail = "Cannot Create User";
        }

        toastRef.current.show(errObj);
    }, (res) => {
        setUsername("");
        setPassword("");
        setVisible(false);
        let messageObj = {
            severity: "success",
            summary: "Success",
            detail: "",
            life: 3000,
        };
        if (res === "addUser") {
            messageObj.detail = "User Added";
        } else if (res === "deleteUser") {
            messageObj.detail = "User Deleted";
        }

        toastRef.current.show(messageObj);
    });

    return (
        <div className='m-20'>
            <h1 className="heading">Manage Users</h1>
            <Dialog header="New User" visible={visible} onHide={() => setVisible(false)}>
                <div>
                    <div>
                        <span className="p-input-icon-left m-2 input-container">
                            <i className="pi pi-user"></i>
                            <InputText
                                id="username"
                                className="input"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            ></InputText>
                        </span>
                        <span className="p-input-icon-left m-2 input-container">
                            <i className="pi pi-lock"></i>
                            <InputText
                                id="password"
                                type="password"
                                className="input"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            ></InputText>
                        </span>
                    </div>
                    <div className="ml-10">
                        <Button label="Add" icon="pi pi-chevron-right" iconPos="right" className="p-shadow-6" onClick={e => {
                            e.preventDefault();
                            addUser({
                                username, password
                            });
                        }} />
                    </div>
                </div>
            </Dialog>
            <div>
                <div className="m-20">
                    <Button label="Add User" icon="pi pi-plus" onClick={() => setVisible(true)} />
                </div>
                <div className="m-20">
                    <DataTable value={users} responsiveLayout="scroll">
                        <Column field="0" header="Id" body={el => <h3>{el[0]}</h3>} />
                        <Column field="1" header="Name" body={el => <h3>{el[1]}</h3>} />
                        <Column header="Privilage" body={<h3>Root</h3>} />
                        <Column header="Delete" body={el => <Button label="Delete" className="p-button-danger" onClick={e => {
                            e.preventDefault();
                            deleteUser(el[0]);
                        }} />} />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default ManageUsers;