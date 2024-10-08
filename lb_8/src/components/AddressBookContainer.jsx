import React, { useState } from 'react';
import AddressForm from './AddressForm.jsx';
import SearchInput from './SearchInput.jsx';
import AddressTable from './AddressTable.jsx';

const AddressBookContainer = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');

  const addContact = (contact) => {
    const newContact = { id: Date.now(), ...contact };
    setContacts([...contacts, newContact]);
  };

  const editContact = (id, updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id)); // Видаляємо контакт за ID
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search)
  );

  return (
    <div>
      <AddressForm onSubmit={addContact} />
      <SearchInput search={search} onSearchChange={setSearch} />
      <AddressTable contacts={filteredContacts} onEdit={editContact} onDelete={deleteContact} />
    </div>
  );
};

export default AddressBookContainer;
