import axios from "axios";
import emitter from "./emitter";
import retry from "axios-retry";
import storage from "../../storage";

const instance = axios.create({
  baseURL: "/api/",
});

instance.defaults.withCredentials = true;

retry(axios, {
  retries: 2,
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401 && !err.config._isRetryRequest) {
      return new Promise((resolve,reject)=>{
        instance
          .post("/auth/tokens/refresh")
          .then(() => {
            err.config._isRetryRequest = true;
            resolve(instance(err.config));
          })
          .catch((e) => {
            storage.clear();
            emitter.emit("logout");
            reject(err);
          });
      });
    }else{
      return err;
    }
  }
);

export default instance;
