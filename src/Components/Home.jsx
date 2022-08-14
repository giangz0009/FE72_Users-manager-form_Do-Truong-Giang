import React, { useState } from "react";
import Form from "./Form";
import UsersList from "./UsersList";
import "antd/dist/antd.css";

function Home() {
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  function updateUser(id, data) {
    const cloneUserList = [...usersList];
    const index = cloneUserList.findIndex((user) => user.id === id);
    if (index === -1) return;
    cloneUserList[index] = data;

    setUsersList(cloneUserList);
    setSelectedUser(null);
  }

  function deleteUser(id) {
    const cloneUserList = [...usersList];

    const foundUser = cloneUserList.findIndex((user) => user.id === id);

    if (foundUser === -1) return;

    cloneUserList.splice(foundUser, 1);

    setUsersList(cloneUserList);
  }

  function createUser(user) {
    const foundUserByName = usersList.find(
      (item) => item.userName === user.userName
    );

    if (foundUserByName) return alert("Tài khoản đã tồn tại!");

    setUsersList([...usersList, user]);
  }

  return (
    <div>
      <h1>Quản lý User</h1>
      <Form
        createUser={createUser}
        selectedUser={selectedUser}
        updateUser={updateUser}
      />
      <UsersList
        usersList={usersList}
        deleteUser={deleteUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}

export default Home;
