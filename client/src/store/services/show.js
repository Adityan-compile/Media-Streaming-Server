import axios from "./axios";

const show = {
  saveShow: (showId)=>{
    return new Promise((resolve,reject)=>{
        axios.post(`/media/shows/new?id=${showId}`).then(({data})=>resolve(data.show)).catch(err=>reject(err));
    });
  },
  getShows: ()=>{
    return new Promise((resolve,reject)=>{
      axios.get('/media/shows/all').then(({data})=>resolve(data.shows)).catch(err=>reject(err));
  });
  },
};

export default show;