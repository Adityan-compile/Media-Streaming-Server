import axios from "./axios";

const show = {
  saveShow: (showId)=>{
    return new Promise((resolve,reject)=>{
        axios.post(`/media/shows/new?id=${showId}`).then(({data})=>resolve(data.movie)).catch(err=>reject(err));
    });
  }
};

export default show;