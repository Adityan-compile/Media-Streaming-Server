import axios from "./axios";

const server = {
    fetchServerSettings: ()=>{
        return new Promise((resolve, reject) => {
          axios
            .get("/server/settings")
            .then(({ data }) => {
              resolve(data.settings);
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
      pingServer: ()=>{
        return new Promise((resolve, reject) => {
            axios
              .get("/server/ping")
              .then(({ data }) => {
                resolve(data.body.server.stats);
              })
              .catch((err) => {
                reject(err);
              });
          })
      }
};

export default server;