import { useContext, useEffect, useState } from "react";

import Context from "../store";

function useManageUsers(onError=()=>{}) {
  
  const {fetchUsers} = useContext(Context);
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetchUsers().then(res=>setUsers(res)).catch(err=>onError("fetchUsersError"));
  },[]);

  const addUser = () => {};
  const deleteUser = () => {};
  return { users, addUser, deleteUser };
}

export default useManageUsers;
