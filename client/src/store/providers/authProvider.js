import auth from "../services/auth";
import server from "../services/server";

const AuthProvider = {
  ...auth,
  ...server
};

export default AuthProvider;
