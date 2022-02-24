import { useRef, useEffect } from 'react'
import useMovies from "../../hooks/movies";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import Card from "../Card";

function MoviesScreen() {

  const navigate = useNavigate();

  const { fetchMovies, movies } = useMovies((err) => {
    toastRef.show({
      severity: "error",
      summary: "Error",
      detail: "Error Fetching Movies",
      life: 3000,
    });
    setTimeout(() => navigate('/'), 3000);

  });

  const toastRef = useRef(null);

  useEffect(() => fetchMovies(), []);

  return (
    <div>
      <Toast ref={toastRef} />
      <div style={{
        minHeight: "100vh"
      }}>
        <h3 className="heading" style={{
          marginBottom: 0,
          marginTop: "10px"
        }}>Movies</h3>
        <div className="container">
          {
            movies.map(el => <Card key={el.id} data={el} />)
          }
        </div>
      </div>
    </div>
  )
}

export default MoviesScreen;