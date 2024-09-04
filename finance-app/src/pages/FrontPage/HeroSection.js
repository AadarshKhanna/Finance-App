import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="hero-container">
            <div className="subtitle">Simply Finance App</div>
            <div className="title">Your One Place to Track All Your Investments</div>
            <div className="buttons">
                <button className="button" onClick={handleLogin}>Login</button>
                <button className="button" onClick={handleSignup}>Signup</button>
            </div>
        </div>
    );
}

export default HeroSection;
