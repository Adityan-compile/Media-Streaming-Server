import "./styles.css";

import { InputText } from "primereact/inputtext";
import React from "react";

function LoginScreen() {
  return (
    <div className="login">
      <div className="login-container">
        <form className="login-form">
          <span className="p-input-icon-left m-2">
            <i className="pi pi-user"></i>
            <InputText
              id="username"
              className="input"
              placeholder="Username"
            ></InputText>
          </span>
          <span className="p-input-icon-left m-2">
            <i className="pi pi-lock"></i>
            <InputText
              id="password"
              type="password"
              className="input"
              placeholder="Password"
            ></InputText>
          </span>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;

// Credit Footer for Background
{
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
}
