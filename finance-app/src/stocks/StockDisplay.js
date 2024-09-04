import React from 'react';
import './StockDisplay.css';

function StockDisplay({ stocks }) {
  return (
    <div className="stock-display">
      {stocks.map((stock, index) => (
        <div key={index} className="stock-card">
          <div className="stock-info">
            <h2>{stock.name}</h2>
            <p>{stock.sector}</p>
          </div>
          <div className="stock-details">
            <div className="stock-detail">
              <p>Live Price</p>
              <h3>₹{stock.livePrice}</h3>
            </div>
            <div className="stock-detail">
              <p>Units</p>
              <h3>{stock.units}</h3>
            </div>
            <div className="stock-detail">
              <p>Avg. Buy Price</p>
              <h3>₹{stock.avgBuyPrice}</h3>
            </div>
            <div className="stock-detail">
              <p>Current Value</p>
              <h3>₹{stock.currentValue}</h3>
              <p style={{ color: stock.change >= 0 ? '#45c49b' : '#f05454' }}>
                {stock.change >= 0 ? '▲' : '▼'} {stock.change}%
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StockDisplay;
