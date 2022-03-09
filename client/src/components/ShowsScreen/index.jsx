import { useEffect, useRef } from 'react'

import Card from "../Card";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import useShows from "../../hooks/shows";
import useToast from '../../hooks/toast';

function ShowsScreen() {
    const toastRef = useToast();
    const navigate = useNavigate();

    const { fetchShows, shows } = useShows((err) => {
        toastRef.show({
            severity: "error",
            summary: "Error",
            detail: "Error Fetching Shows",
            life: 3000,
        });
        setTimeout(() => navigate('/'), 3000);

    });

    useEffect(() => {
        fetchShows();
    }, []);

    return (
        <div>
            <div style={{
                minHeight: "100vh"
            }}>
                <h3 className="heading" style={{
                    marginBottom: 0,
                    marginTop: "10px"
                }}>Shows</h3>
                <div className="container">
                    {
                        shows.map(el => <Card key={el.id} data={el} type="s" />)
                    }
                </div>
            </div>
        </div>
    )
}

export default ShowsScreen;