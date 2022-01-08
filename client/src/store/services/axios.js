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
      instance
        .post("/auth/tokens/refresh")
        .then(() => {
          err.config._isRetryRequest = true;
          instance(err.config);
        })
        .catch((e) => {
          storage.clear();
          emitter.emit("logout");
          return err;
        });
    }
  }
);

export default instance;
