import { Input, Card, Select, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Form.module.css";
import * as yup from "yup";
import isEmpty from "lodash.isempty";

const userSchema = yup.object().shape({
  userName: yup.string().required("*Vui lòng nhập tài khoản!"),
  name: yup
    .string()
    .required("*Vui lòng nhập trường này!")
    .required("*Vui lòng nhập tên!")
    .matches(/^[A-Za-z ]+$/, "*Họ tên phải nhập chữ"),
  password: yup
    .string()
    .required("*Vui lòng nhập mật khẩu!")
    .min(8, "*Vui lòng nhập ít nhất 8 ký tự!")
    .max(16, "*Mật khẩu không được quá 16 ký tự!"),
  email: yup.string().required().email("*Vui lòng nhập đúng định dạng mail!"),
  phone: yup
    .string()
    .required("*Vui lòng nhập trường này!")
    .matches(/^[0-9]+$/),
  role: yup.string().required("*Vui lòng chọn mã người dùng!"),
});

const { Option } = Select;

function Form({ createUser, selectedUser, updateUser }) {
  const refForm = useRef();
  const [user, setUser] = useState({
    id: "",
    userName: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!selectedUser) return;
    if (selectedUser.id === user.id) return;

    setUser(selectedUser);
    setErrors({});
  }, [selectedUser]);

  function handleChange(e) {
    const targetInput = e.target;
    setUser({ ...user, [targetInput.getAttribute("name")]: targetInput.value });
  }

  function handleSelect(e) {
    setUser({ ...user, role: e });
  }

  async function handleCreateUser(e) {
    e.preventDefault();
    const isValid = await validateForm();

    if (!isValid) return;

    createUser({ ...user, id: Math.floor(Math.random() * 1000) });

    resetForm();
    setErrors({});
  }

  async function validateForm() {
    const validationErrors = {};

    try {
      await userSchema.validate(user, { abortEarly: false });
    } catch (err) {
      const errObj = { ...err };

      errObj.inner.forEach((validationErr) => {
        if (validationErrors[validationErr.path]) return;
        validationErrors[validationErr.path] = validationErr.message;
      });

      setErrors(validationErrors);
    }

    return isEmpty(validationErrors);
  }

  function resetForm() {
    setUser({
      id: "",
      userName: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      role: "",
    });
  }

  return (
    <Card
      title="Form đăng ký"
      headStyle={{
        backgroundColor: "black",
        color: "white",
      }}
    >
      <form
        className={styles.form}
        id="form"
        ref={refForm}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={styles.formGroup}>
          <label htmlFor="">Tài khoản</label>
          <Input
            name="userName"
            placeholder="Tài khoản"
            onChange={handleChange}
            value={user.userName}
          />
          <span style={{ color: "red" }}>{errors.userName}</span>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="">Họ tên</label>
          <Input
            name="name"
            placeholder="Họ tên"
            onChange={handleChange}
            value={user.name}
          />
          <span style={{ color: "red" }}>{errors.name}</span>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="">Mật khẩu</label>
          <Input
            name="password"
            placeholder="Mật khẩu"
            type="password"
            onChange={handleChange}
            value={user.password}
          />
          <span style={{ color: "red" }}>{errors.password}</span>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="">Số điện thoại</label>
          <Input
            name="phone"
            placeholder="Số điện thoại"
            onChange={handleChange}
            value={user.phone}
          />
          <span style={{ color: "red" }}>{errors.phone}</span>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="">Email</label>
          <Input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={user.email}
          />
          <span style={{ color: "red" }}>{errors.email}</span>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="">Mã loại người dùng</label>
          <Select
            defaultValue="user"
            style={{
              minWidth: 300,
            }}
            name="role"
            onChange={handleSelect}
            value={user.role}
          >
            <Option value="">--Hãy chọn loại người dùng--</Option>
            <Option value="user">Khách hàng</Option>
            <Option value="admin">Quản trị viên</Option>
          </Select>
          <span style={{ color: "red" }}>{errors.role}</span>
        </div>
        <div className={styles.btn}>
          {selectedUser ? (
            <Button
              htmlType="submit"
              type="primary"
              onClick={async () => {
                const isValid = await validateForm();

                if (!isValid) return;

                updateUser(user.id, user);

                setErrors({});

                resetForm();
              }}
            >
              Cập nhật
            </Button>
          ) : (
            <Button
              htmlType="submit"
              type="primary"
              danger
              onClick={handleCreateUser}
            >
              Đăng ký
            </Button>
          )}
          <Button htmlType="reset" onClick={resetForm}>
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Form;
