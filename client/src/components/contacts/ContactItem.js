import React, { useContext } from "react";
import ContactContext from "./../../context/contact/contactContext";
import PropTypes from "prop-types";
const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { _id, name, email, phone, type } = contact;
  const badgeType = type === "professional" ? "badge-success" : "badge-primary";
  const handleEditContact = () => {
    contactContext.setCurrent(contact);
  };
  const handleDeleteContact = () => {
    contactContext.deleteContact(_id);
    contactContext.clearCurrent(); 
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
        <span
          style={{ float: "right" }}
          className={`badge text-capitalize ${badgeType}`}
        >
          {type}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i>
            &nbsp; {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i>
            &nbsp; {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => {
            handleEditContact();
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            handleDeleteContact();
          }}
        >
          Delete
        </button>
      </p>
    </div>
  );
};
ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
export default ContactItem;
