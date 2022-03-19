import { useContext, useEffect, useState } from "react";

import Context from "../store";

function useManageUsers(onError = () => {}, onSuccess = () => {}) {
  const {
    fetchUsers,
    addUser: createUser,
    deleteUser: removeUser,
  } = useContext(Context);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => setUsers(res))
      .catch((err) => onError("fetchUsersError"));
  }, []);

  const addUser = (body) => {
    createUser(body)
      .then((user) => {
        let temp = users;
        temp.unshift(user);
        setUsers(temp);
        onSuccess("addUser");
      })
      .catch((err) => onError("createUserError"));
  };

  const deleteUser = (id) => {
    removeUser(id)
      .then(() => {
        let temp = users.filter((el) => el.id !== id);
        setUsers(temp);
        onSuccess("deleteUser");
      })
      .catch((err) => onError("deleteUserError"));
  };

  return { users, addUser, deleteUser };
}

export default useManageUsers;
