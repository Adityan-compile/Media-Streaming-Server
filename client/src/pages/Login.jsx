import React, { useContext, useEffect, useState } from "react";

import Context from "../store";
import LoginScreen from "../components/LoginScreen";

function Login() {

  const [userCount,setUserCount] = useState(0);

  const { getUserCount } = useContext(Context);

  useEffect(()=>{
    getUserCount().then(res=>{}).catch(e=>{});
  },[]);

  return <LoginScreen />;
}

export default Login;
