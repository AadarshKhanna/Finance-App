import React, { useState, useEffect } from 'react';
import './FDComponent.css';

const FDComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const [investment, setInvestment] = useState('');
  const [fdData, setFdData] = useState([]);

  useEffect(() => {
    // Fetch FD data from the backend
    const fetchFdData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/fds');
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }
        const data = await response.json(); // Parse JSON directly
        setFdData(data);
      } catch (error) {
        console.error('Error fetching FD data:', error);
      }
    };

    fetchFdData();
  }, []);

  const handleCardClick = () => setExpanded(!expanded);

  const handleInvestmentChange = (e) => {
    const value = e.target.value;
    setInvestment(value);
  };

  const calculateReturn = (amount, fd) => {
    if (!amount || isNaN(amount) || amount < fd.minInvestment) return 0;
    const interestRate = fd.interest / 100;
    return amount * (1 + interestRate * fd.tenure / 12); // Simple interest formula
  };

  return (
    <div className="container">
      <h1 className="dashboard">Fixed Deposits</h1>
      {fdData.length > 0 ? (
        fdData.map((fd, index) => (
          <div
            key={index}
            className={`fd-row ${expanded ? 'expanded' : ''}`}
            onClick={handleCardClick}
          >
            <div className="fd-column">
              <h2>{fd.name}</h2>
              <p>Tenure: {fd.tenure} months</p>
              <p>Interest Rate: {fd.interest}%</p>
            </div>
            <div className="fd-column">
              <p>Minimum Investment: ₹{fd.minInvestment}</p>
              <label>Amount to Invest:</label>
              <input
                type="number"
                value={investment}
                onChange={handleInvestmentChange}
                min={fd.minInvestment}
              />
            </div>
            <div className="fd-column">
              <p>Estimated Retur n: ₹{calculateReturn(investment, fd).toFixed(2)}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading FD data...</p>
      )}
    </div>
  );
};

export default FDComponent;
