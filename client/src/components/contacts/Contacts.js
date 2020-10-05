import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";
import ContactContext from "./../../context/contact/contactContext";
import ContactsFilter from "./../ContactsFilter";
const Contacts = () => {
  // we import the context so we can access it's state and actions using useContext
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;
  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (contacts === null && !loading) {
    return (
      <i
        className="text-center fas fa-circle-notch fa-spin fa-3x"
        style={{ width: "100%" }}
      ></i>
    );
  } else if (contacts !== null && contacts.length === 0) {
    return <h2>Please enter your contacts</h2>;
  }

  const renderContacts = () => {
    if (contacts !== null && filtered === null && !loading) {
      return contacts.map((contact) => (
        <CSSTransition key={contact._id} timeout={500} classNames="item">
          <ContactItem contact={contact} />
        </CSSTransition>
      ));
    } else if (contacts !== null && filtered.length === 0 && !loading) {
      return <h4>Sorry no contact</h4>;
    } else {
      return filtered.map((contact) => (
        <CSSTransition key={contact._id} timeout={500} classNames="item">
          <ContactItem contact={contact} key={contact.id} />
        </CSSTransition>
      ));
    }
  };
  return (
    <>
      <TransitionGroup className="todo-list">
        {contacts !== null && contacts.length > 0 && <ContactsFilter />}
        {contacts !== null && contacts.length > 0 && renderContacts()}
      </TransitionGroup>
    </>
  );
};

export default Contacts;
