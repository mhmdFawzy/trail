import React, { useRef, useContext } from "react";
import ContactContext from "./../context/contact/contactContext";
const ContactsFilter = () => {
  // this is a simple form so we just gonna use a useRef with current
  // instead of making state
  const filter = useRef("");
  const contactContext = useContext(ContactContext);
  const onChange = (e) => {
    if (filter.current.value !== "") {
      contactContext.filterContacts(e.target.value);
    } else {
      contactContext.clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={filter}
        type="text"
        name="filter"
        onChange={onChange}
        placeholder="Filter contacts"
      />
    </form>
  );
};

export default ContactsFilter;
