import React, { Fragment, useEffect, useState } from "react";
import { Card, Table, Button, Input } from "antd";

const { Search } = Input;

function UserList({ usersList, deleteUser, setSelectedUser }) {
  const [search, setSearch] = useState("");

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tài khoản",
      dataIndex: "userName",
      key: "userName",
      render: (_, user) => {
        return <h3>{user.userName}</h3>;
      },
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Loại người dùng",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, user) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                setSelectedUser(user);
              }}
            >
              Chỉnh sửa
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Xóa
            </Button>
          </>
        );
      },
    },
  ];

  let timing;

  const onSearch = (e) => {
    clearTimeout(timing);

    const inputValue = e.target.value;
    setSearch(inputValue);
  };

  const usersListToShow = () => {
    return usersList.filter((user) => {
      const inputToLowerCase = search.toLowerCase();
      return (
        user.userName.includes(inputToLowerCase) ||
        user.name.includes(inputToLowerCase)
      );
    });
  };

  return (
    <Card
      title="Danh sách người dùng"
      headStyle={{
        backgroundColor: "black",
        color: "white",
      }}
    >
      <div style={{ textAlign: "center", paddingBottom: 20 }}>
        <Search
          value={search}
          onChange={onSearch}
          enterButton
          placeholder="input search text"
          style={{
            width: 500,
          }}
        />
      </div>
      <Table
        dataSource={usersListToShow().map((user) => {
          return { ...user, key: user.id };
        })}
        columns={columns}
      ></Table>
    </Card>
  );
}

export default UserList;
