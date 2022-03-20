import axios from "./axios";
import emitter from "./emitter";
import storage from "../../storage";

const auth = {
  getAuthStatus: () => {
    return new Promise((resolve, reject) => {
      const user = storage.get("USER");
      if (user === null || user === undefined) {
        return resolve({
          authenticated: false,
        });
      }
      resolve({
        user: user,
        authenticated: true,
      });
    });
  },
  getUserCount: () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/auth/users/count")
        .then(({ data }) => {
          resolve(data.count);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  serverSetup: (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/auth/setup", data)
        .then(({ data: res }) => {
          if (res.status === 200) {
            resolve({
              status: "Completed",
            });
          } else {
            resolve({
              user: res.user,
              status: "Partial",
            });
          }
        })
        .catch((e) => {
          console.error(e);
          reject(e);
        });
    });
  },
  loginUser: (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/auth/login", data)
        .then(({ data: res }) => {
          storage.set("USER", res.user);
          emitter.emit("login");
          resolve({
            user: res.user,
          });
        })
        .catch((e) => reject(e));
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      axios
        .delete("/auth/logout")
        .then(() => {
          storage.clear();
          emitter.emit("logout");
          resolve(true);
        })
        .catch((e) => {
          if (e.response.status === 400) {
            storage.clear();
            emitter.emit("logout");
            resolve(true);
          } else {
            reject(e);
          }
        });
    });
  },
  fetchUsers: () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/auth/users/all")
        .then(({ data }) => {
          resolve(data.users);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteUser: (id) => {

    return new Promise((resolve, reject) => {
      axios
        .delete(`/auth/users/delete?id=${id}`)
        .then(({ data }) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addUser: (body) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/auth/users/new", body)
        .then(({ data }) => {
          resolve(data.user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default auth;
