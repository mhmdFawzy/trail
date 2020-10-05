import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "./../../context/auth/authContext";
import ContactContext from "./../../context/contact/contactContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logOut } = authContext;
  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;
  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li
        style={{ cursor: "pointer" }}
        onClick={() => {
          logOut();
          clearContacts();
        }}
      >
        <i className="fas fa-sign-out-alt"></i>{" "}
        <span className="hide-sm">Logout</span>
      </li>
    </>
  );
  const guestLinks = (
    <>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};
export default Navbar;
