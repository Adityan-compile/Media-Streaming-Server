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
    },
    movieUploader: (formData, movieId, onProgress, cancelToken)=>{
        return new Promise((resolve,reject)=>{
            axios.post(`/media/movies/upload?movieId=${movieId}&mediaType=movie`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: e=>{
                    onProgress(Math.floor((100 * e.loaded) /e.total))
                },
                cancelToken: cancelToken
            }).then(({data})=>resolve(data)).catch(err=>reject(err));
        });
    },
    deleteMovie: (movieId)=>{
        return new Promise((resolve,reject)=>{
            axios.delete(`/media/movies/delete?id=${movieId}`).then(({data})=>resolve(data.movie)).catch(err=>reject(err));
        });  
    }
};

export default movie;
