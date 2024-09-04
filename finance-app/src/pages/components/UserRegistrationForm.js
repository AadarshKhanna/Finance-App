import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/userRegistrationForm.css';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    Name: '',
    surname: '',
    jobTitle: '',
    employmentStatus: '',
    state: '',
    city: '',
    zip: '',
    phoneNumber: '',
    streetAddress: '',
    country: '',
    emailNotifications: true,
    smsNotifications: true,
    preferredContactMethod: 'email',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in formData) {
      if (formData[key] === '' && key !== 'emailNotifications' && key !== 'smsNotifications') {
        newErrors[key] = `${key} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/api/submitProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/dashboard');
      } else {
        const result = await response.text();
        alert(`Submission failed: ${result}`);
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };

  return (
    <div>
      <h1>User Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Name">Name:</label>
          <input type="text" id="Name" name="Name" value={formData.Name} onChange={handleChange} required />
          {errors.Name && <p className="error">{errors.Name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
          {errors.surname && <p className="error">{errors.surname}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title:</label>
          <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
          {errors.jobTitle && <p className="error">{errors.jobTitle}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="employmentStatus">Employment Status:</label>
          <input type="text" id="employmentStatus" name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} required />
          {errors.employmentStatus && <p className="error">{errors.employmentStatus}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
          {errors.state && <p className="error">{errors.state}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="zip">Zip Code:</label>
          <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
          {errors.zip && <p className="error">{errors.zip}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="streetAddress">Street Address:</label>
          <input type="text" id="streetAddress" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required />
          {errors.streetAddress && <p className="error">{errors.streetAddress}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
          {errors.country && <p className="error">{errors.country}</p>}
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" name="emailNotifications" checked={formData.emailNotifications} onChange={handleChange} />
            Receive Email Notifications
          </label>
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" name="smsNotifications" checked={formData.smsNotifications} onChange={handleChange} />
            Receive SMS Notifications
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="preferredContactMethod">Preferred Contact Method:</label>
          <select id="preferredContactMethod" name="preferredContactMethod" value={formData.preferredContactMethod} onChange={handleChange} required>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="sms">SMS</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
