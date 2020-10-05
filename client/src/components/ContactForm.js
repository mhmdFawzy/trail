import React, { useState, useContext, useEffect } from "react";
import ContactContext from "./../context/contact/contactContext";
import AlertContext from "./../context/alert/alertContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (contactContext.current === null) {
      setContact({ name: "", email: "", phone: "", type: "personal" });
    } else {
      setContact(contactContext.current);
    }
  }, [contactContext]);
  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || phone === "") {
      alertContext.setAlert("Must have Name and Phone", "danger");
    } else if (contactContext.current === null) {
      contactContext.addContact(contact);
    } else {
      console.log("Sss");
      contactContext.updateContact(contact);
      clearForm();
    }
    setContact({ name: "", email: "", phone: "", type: "personal" });
  };
  const clearForm = () => {
    contactContext.clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {contactContext.current ? "Update contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Enter a name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Enter a email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Enter a phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="perosnal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      perosnal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      professional
      <div>
        <input
          name="type"
          type="submit"
          value={contactContext.current ? "Update contact" : "Add Contact"}
          className="btn btn-primary btn-block"
          onClick={onSubmit}
        />
        {contactContext.current && (
          <button
            className="btn btn-block btn-light"
            onClick={() => {
              clearForm();
            }}
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
