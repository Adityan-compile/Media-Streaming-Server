import { useEffect, useState } from "react";

function useManageUsers() {
  const [users, setUsers] = useState([]);
  const addUser = () => {};
  const deleteUser = () => {};
  return { users, addUser, deleteUser };
}

export default useManageUsers;
