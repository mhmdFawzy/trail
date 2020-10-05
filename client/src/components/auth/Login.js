import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./../../context/auth/authContext";
import AlertContext from "./../../context/alert/alertContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  useEffect(() => {
    if (authContext.isAuthenticated) {
      props.history.push("/");
    }
    if (authContext.error === "Invalid Credentials") {
      alertContext.setAlert(authContext.error, "danger");
    }
    //eslint-disable-next-line
  }, [authContext.isAuthenticated, authContext.error, props.history]);
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alertContext.setAlert("Please fill in all fields");
    } else {
      authContext.loginUser({ email, password });
    }
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="from-group">
          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                onChange(e);
              }}
              placeholder="Please enter your email"
            />
          </label>
        </div>
        <div className="from-group">
          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                onChange(e);
              }}
              placeholder="Please enter your password"
            />
          </label>
        </div>

        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
