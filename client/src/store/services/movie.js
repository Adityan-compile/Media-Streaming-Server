import axios from "./axios";

const movie = {
    save:(movieId)=>{
        return new Promise((resolve,reject)=>{
            axios.post(`/media/movies/new?id=${movieId}`).then(({data})=>resolve(data.movie)).catch(err=>reject(err));
        });
    }
};

export default movie;
