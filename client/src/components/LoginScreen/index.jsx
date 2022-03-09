import React, { useContext, useRef, useState } from "react";

import { Button } from "primereact/button";
import Context from "../../store";
import { InputText } from "primereact/inputtext";
import { isEmpty } from "../../utils";
import styles from  "./styles.module.css";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/toast";

function LoginScreen() {
  const toastRef = useToast();

  const navigate = useNavigate();

  const { loginUser } = useContext(Context);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (isEmpty(name) || isEmpty(password)) {
      return toastRef.current.show({
        severity: "warn",
        summary: "Required",
        detail: "All Form Fields Are Required",
        life: 3000,
      });
    }

    const form = {
      name,
      password,
    };

    loginUser(form)
      .then(() => {
        return setTimeout(() => navigate("/"), 500);
      })
      .catch((e) => {
        return toastRef.current.show({
          severity: "error",
          summary: "Error",
          detail: "Error Logging In Check your Credentials or Try Again Later",
          life: 3000,
        });
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <form className={styles.loginForm}>
          <h1 className="heading">Streamflix</h1>
          <span className="p-input-icon-left m-2 input-container">
            <i className="pi pi-user"></i>
            <InputText
              id="username"
              className="input"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></InputText>
          </span>
          <span className="p-input-icon-left m-2 input-container">
            <i className="pi pi-lock"></i>
            <InputText
              id="password"
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></InputText>
          </span>
          <span className={styles.btnContainer}>
            <Button
              label="Login"
              icon="pi pi-chevron-right"
              className="p-shadow-6"
              iconPos="right"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            ></Button>
          </span>
        </form>
        <div className={styles.footer}>
          Photo by{" "}
          <a
            className={styles.link}
            href="https://unsplash.com/@jenskreuter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Jens Kreuter
          </a>{" "}
          on{" "}
          <a
            className={styles.link}
            href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Unsplash
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;