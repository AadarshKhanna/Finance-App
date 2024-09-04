import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Signup.css";
import { Form, Button } from 'react-bootstrap';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if any field is empty
    if (!formData.email || !formData.name || !formData.password) {
      setError("All fields are required. Please fill in your email, name, and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate("/login");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className='center-form'>
      <Form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
            isInvalid={!formData.email && error}
          />
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleInputChange}
            isInvalid={!formData.name && error}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
            isInvalid={!formData.password && error}
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100">
          Signup
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
