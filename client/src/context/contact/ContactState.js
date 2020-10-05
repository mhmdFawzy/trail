// here we create our state and actions and export the provider with
// those so childs can access them

import React, { useReducer } from "react";
import axios from "axios";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  FAILED_ADD,
  DELETE_CONTACT,
  CLEAR_CURRENT,
  SET_CURRENT,
  FILTER_CONTACT,
  UPDATE_CONTACT,
  CLEAR_FILTER,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  SET_LOADING,
} from "../types";
const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  // state let us access our state and dipatch to access actions and reducer
  // reducer first then initialstate second arg
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // here we put our actions where we dispatch to our reducer
  // and here we don't write action as redux we put it in dispatch action directly
  // we also can make action seperate and dispatch it
  // SET_LOADING
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };
  // GET_CONTACTS
  const getContacts = async () => {
    try {
      const res = await axios.get(
        "https://finalcontactkeeperbk.herokuapp.com/api/contacts"
      );
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FAILED_ADD,
        payload: error.response.msg,
      });
    }
  };
  // DELETE_CONTACTS
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };
  //   ADD_CONTACT
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://finalcontactkeeperbk.herokuapp.com/api/contacts",
        contact,
        config
      );
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FAILED_ADD,
        payload: error.response.msg,
      });
    }
  };
  //   DELETE_CONTACT
  const deleteContact = async (id) => {
    try {
      await axios.delete(
        `https://finalcontactkeeperbk.herokuapp.com/api/contacts/${id}`
      );
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FAILED_ADD,
        payload: error.response.msg,
      });
    }
  };
  //   SET_CURRENT
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };
  //   CLEAR_CURRENT
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };
  //   FILTER_CONTACT
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACT,
      payload: text,
    });
  };
  //   CLEAR_FILTER
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };
  //   UPDATE_CONTACT
  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FAILED_ADD,
        payload: error.response.msg,
      });
    }
  };

  //   SET_ALERT

  //   REMOVE_ALERT

  // then we export our provider to wrap our app in it and can access it
  //   value is what we want the children to access, it contain state and actions
  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts,
        setLoading,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
