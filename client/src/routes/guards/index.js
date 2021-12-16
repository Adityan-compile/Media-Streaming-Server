import Context from "../../store";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

export const RouteGuard = ({ children }) => {
  const {user} = useContext(Context);
  if (user.authenticated === true) {
    return children;
  }
  return <Navigate to={"/login"} />;
};

export const AuthGuard = ({ children }) => {
  const {user, userCount:count} = useContext(Context);
  if (user.authenticated === true) {
    return <Navigate to={"/"} />;
  }else{
    if(count === 0) return <Navigate to={"/setup"} />
  }
  return children;
};

export const SetupGuard = ({ children }) => {
  const {user, userCount:count} = useContext(Context);
  if (user.authenticated === true) {
    return <Navigate to={"/"} />;
  }else{
    if(count > 0){
      return <Navigate to={"/login"} />;
    }
  }
  return children;
};

