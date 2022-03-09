import { useEffect, useRef } from 'react'

import Card from "../Card";
import useMovies from "../../hooks/movies";
import { useNavigate } from "react-router-dom";
import useToast from '../../hooks/toast';

function MoviesScreen() {

  const navigate = useNavigate();
  const toastRef = useToast();

  const { fetchMovies, movies } = useMovies((err) => {
    toastRef.current.show({
      severity: "error",
      summary: "Error",
      detail: "Error Fetching Movies",
      life: 3000,
    });
    setTimeout(() => navigate('/'), 3000);

  });


  useEffect(() => fetchMovies(), []);

  return (
    <div>
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