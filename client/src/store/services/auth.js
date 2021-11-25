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
};

export default auth;
