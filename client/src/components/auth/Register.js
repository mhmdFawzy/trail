import React, { useContext, useState, useEffect } from "react";
import AuthContext from "./../../context/auth/authContext";
import AlertContext from "./../../context/alert/alertContext";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  useEffect(() => {
    if (authContext.isAuthenticated) {
      props.history.push("/");
    }
    if (authContext.error === "User already exists") {
      alertContext.setAlert(authContext.error, "danger");
      authContext.clearErros();
    }
    // eslint-disable-next-line
  }, [authContext.error, authContext.isAuthenticated, props.history]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      alertContext.setAlert("Please fill all fields", "danger");
    } else if (password !== password2) {
      alertContext.setAlert("Passwords do not match", "danger");
    } else {
      authContext.register({
        name,
        email,
        password,
      });
    }
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="from-group">
          <label>
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                onChange(e);
              }}
              placeholder="Please enter your name"
            />
          </label>
        </div>
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
        <div className="from-group">
          <label>
            Confirm Password
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={(e) => {
                onChange(e);
              }}
              placeholder="Please confirm your password"
            />
          </label>
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
