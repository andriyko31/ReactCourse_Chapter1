import React, { useState } from 'react';

const AddressForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};
    if (!firstName) formErrors.firstName = 'The first name is required';
    if (!lastName) formErrors.lastName = 'The last name is required';
    if (!phone) formErrors.phone = 'The phone is required';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      onSubmit({ firstName, lastName, phone });
      setFirstName('');
      setLastName('');
      setPhone('');
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={errors.firstName ? 'error' : ''}
        />
        {errors.firstName && (
          <span className="error-text">{errors.firstName}</span>
        )}
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={errors.lastName ? 'error' : ''}
        />
        {errors.lastName && (
          <span className="error-text">{errors.lastName}</span>
        )}
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddressForm;
