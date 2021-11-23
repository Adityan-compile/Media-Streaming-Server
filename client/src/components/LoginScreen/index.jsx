import "./styles.css";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";

function LoginScreen() {
  return (
    <div className="login">
      <div className="login-container">
        <form className="login-form">
          <h1 className="heading">Streamflix</h1>
          <span className="p-input-icon-left m-2 input-container">
            <i className="pi pi-user"></i>
            <InputText
              id="username"
              className="input"
              placeholder="Username"
            ></InputText>
          </span>
          <span className="p-input-icon-left m-2 input-container">
            <i className="pi pi-lock"></i>
            <InputText
              id="password"
              type="password"
              className="input"
              placeholder="Password"
            ></InputText>
          </span>
          <span className="btn-container">
            <Button
              label="Login"
              icon="pi pi-chevron-right"
              className="p-shadow-6"
              iconPos="right"
            ></Button>
          </span>
        </form>

        <div className="footer">
          Photo by{" "}
          <a
            className="link"
            href="https://unsplash.com/@jenskreuter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Jens Kreuter
          </a>{" "}
          on{" "}
          <a
            className="link"
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

// Credit Footer for Background
/* <div className="footer">
Photo by{" "}
<a
  className="link"
  href="https://unsplash.com/@jenskreuter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
>
  Jens Kreuter
</a>{" "}
on{" "}
<a
  className="link"
  href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
>
  Unsplash
</a>
</div> */
