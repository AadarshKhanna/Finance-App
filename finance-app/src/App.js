import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroSection from './pages/FrontPage/HeroSection'
import MainPage from './stocks/MainPage';
import IndianStocksPage from './stocks/IndianStocksPage';
import USStocksPage from './stocks/USStocksPage';
import FDComponent from './stocks/FD/FDComponent'
import AssetDetail from './stocks/AssetDetail';
import LoanApp from './stocks/Loan/LoanApp';
import UserRegistrationForm from './pages/components/UserRegistrationForm';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import './global.css';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HeroSection/>} />  
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<UserRegistrationForm />} />
          <Route path="/dashboard" element={<MainPage />} />
          <Route path="/indian-stocks" element={<IndianStocksPage />} />
          <Route path="/us-stocks" element={<USStocksPage />} />
          <Route path="/fd" element={<FDComponent />} />
          <Route path="/assets/:id" element={<AssetDetail />} />
          <Route path="/apply-loan" element={<LoanApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
