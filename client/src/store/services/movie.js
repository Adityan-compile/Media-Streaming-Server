import axios from "./axios";

const movie = {
    saveMovie:(movieId)=>{
        return new Promise((resolve,reject)=>{
            axios.post(`/media/movies/new?id=${movieId}`).then(({data})=>resolve(data.movie)).catch(err=>reject(err));
        });
    },
    getMovies: ()=>{
        return new Promise((resolve,reject)=>{
            axios.get('/media/movies/all').then(({data})=>resolve(data.movies)).catch(err=>reject(err));
        });
    }
};

export default movie;
