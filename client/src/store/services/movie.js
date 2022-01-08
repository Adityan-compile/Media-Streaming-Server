import axios from "./axios";

const movie = {
    save:(movie)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/media/movies/new', movie).then(({data})=>resolve(data.movie)).catch(err=>reject(err));
        });
    }
};

export default movie;
