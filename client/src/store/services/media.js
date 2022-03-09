import axios from "./axios";

const media = {
    search: (query)=>{
        return new Promise((resolve, reject) => {
            axios
              .get(`/media/search?q=${query}`)
              .then(({ data }) => {
                resolve(data.results);
              })
              .catch((e) => reject(e));
          });
    },
    fetchHighlights: ()=>{
      return new Promise((resolve, reject) => {
        axios
          .get("/media/highlights")
          .then(({ data }) => {
            resolve(data.highlights);
          })
          .catch((e) => reject(e));
      });
    },
    fetchTopRated: ()=>{
      return new Promise((resolve, reject) => {
        axios
          .get("/media/toprated")
          .then(({ data }) => {
            resolve(data.results);
          })
          .catch((e) => reject(e));
      });
    },
    createHighlight: (id)=>{
      return new Promise((resolve, reject) => {
        axios
          .post("/media/highlights/new")
          .then(({ data }) => {
            resolve(data.highlight);
          })
          .catch((e) => reject(e));
      });
    },
};

export default media;