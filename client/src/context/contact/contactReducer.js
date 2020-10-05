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
export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: false,
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: [],
        current: null,
        filtered: null,
        error: null,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false,
      };

    case FAILED_ADD:
      return { ...state, error: action.payload, loading: false };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: [
          ...state.contacts.filter((contact) => {
            return contact._id !== action.payload;
          }),
        ],
        loading: false,
      };
    case SET_CURRENT:
      return { ...state, current: action.payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: [
          ...state.contacts.map((contact) => {
            if (contact._id === action.payload._id) {
              return action.payload;
            } else {
              return contact;
            }
          }),
        ],
      };
    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return { ...state, filtered: null };

    default:
      return { ...state };
  }
};
