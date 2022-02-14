import axios from "./axios";

const media = {
    search: (query)=>{
      console.log(query)
        return new Promise((resolve, reject) => {
            axios
              .get(`/media/search?q=${query}`)
              .then(({ data }) => {
                resolve(data.results);
              })
              .catch((e) => reject(e));
          });
    }
};

export default media;