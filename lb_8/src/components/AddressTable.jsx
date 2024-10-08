import React, { useState } from 'react';

const AddressTable = ({ contacts, onEdit, onDelete }) => {
  const [editId, setEditId] = useState(null); // ID контакту, який редагується
  const [editedContact, setEditedContact] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const handleEditClick = (contact) => {
    setEditId(contact.id); // Встановлюємо ID контакту, який редагується
    setEditedContact(contact); // Заповнюємо інпут поточним значенням контакту
    setErrors({}); // Очищуємо помилки при початку редагування
  };

  const validate = () => {
    const errors = {};
    if (!editedContact.firstName) errors.firstName = 'The first name is required';
    if (!editedContact.lastName) errors.lastName = 'The last name is required';
    if (!editedContact.phone) errors.phone = 'The phone number is required';
    return errors;
  };

  const handleSaveClick = (id) => {
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Показуємо помилки, якщо вони є
      return;
    }
    onEdit(id, editedContact); // Викликаємо onEdit для збереження змін
    setEditId(null); // Виходимо з режиму редагування
    setErrors({}); // Очищуємо помилки після успішного збереження
  };

  const handleDeleteClick = (id) => {
    onDelete(id); // Викликаємо onDelete для видалення контакту
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value }); // Оновлюємо значення інпутів
  };

  return (
    <div>
      {contacts.length === 0 ? (
        <p>No data to display</p>
      ) : (
        <table className="address-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>
                  {editId === contact.id ? (
                    <>
                      <input
                        type="text"
                        name="firstName"
                        value={editedContact.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? 'error' : ''}
                      />
                      {errors.firstName && (
                        <div className="error-text">{errors.firstName}</div>
                      )}
                    </>
                  ) : (
                    contact.firstName
                  )}
                </td>
                <td>
                  {editId === contact.id ? (
                    <>
                      <input
                        type="text"
                        name="lastName"
                        value={editedContact.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? 'error' : ''}
                      />
                      {errors.lastName && (
                        <div className="error-text">{errors.lastName}</div>
                      )}
                    </>
                  ) : (
                    contact.lastName
                  )}
                </td>
                <td>
                  {editId === contact.id ? (
                    <>
                      <input
                        type="text"
                        name="phone"
                        value={editedContact.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error' : ''}
                      />
                      {errors.phone && (
                        <div className="error-text">{errors.phone}</div>
                      )}
                    </>
                  ) : (
                    contact.phone
                  )}
                </td>
                <td>
                  {editId === contact.id ? (
                    <>
                      <button onClick={() => handleSaveClick(contact.id)}>Save</button>
                      <button onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(contact)}>Edit</button>
                      <button onClick={() => handleDeleteClick(contact.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddressTable;
