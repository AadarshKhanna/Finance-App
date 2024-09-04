import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { Button, Form } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
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
    if (!formData.email || !formData.password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
          navigate("/register");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className='center-form'>
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
