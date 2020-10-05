import React, { useReducer } from "react";
import axios from "axios";
import setAuthToken from "./../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "./../types";
import authContext from "./authContext";
import authReducer from "./authReducer";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: null,
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // REGISTER_SUCCESS
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://finalcontactkeeperbk.herokuapp.com/api/users",
        formData,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  // REGISTER_FAIL
  // USER_LOADED
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(
        "https://finalcontactkeeperbk.herokuapp.com/api/auth"
      );
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      // AUTH_ERROR
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
  // LOGIN_SUCCESS
  const loginUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://finalcontactkeeperbk.herokuapp.com/api/auth",
        formData,
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      // LOGIN_FAIL
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });
    }
  };
  // LOGOUT
  const logOut = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  // CLEAR_ERRORS
  const clearErros = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
  return (
    <authContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        clearErros,
        loadUser,
        loginUser,
        logOut,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
