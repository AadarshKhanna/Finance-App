import React, { useState, useEffect } from 'react';
import IndianStocksDashboard from './IndianStocksDashboard';
import StockDisplay from './StockDisplay';

function IndianStocksPage({ setIndianStocksTotal }) {
  const [stocks, setStocks] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalInvestment: 0,
    dayChange: 0,
    invested: 0,
    return: 0,
    returnPercentage: 0,
  });

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stocks/indian');
        const data = await response.json();

        const formattedStocks = data.map(stock => ({
          name: stock.name,
          sector: stock.sector,
          livePrice: parseFloat(stock.liveprice),
          units: parseFloat(stock.units),
          avgBuyPrice: parseFloat(stock.avgbuyprice),
          currentValue: parseFloat(stock.currentvalue),
          change: parseFloat(stock.change),
        }));

        setStocks(formattedStocks);

        // Calculate dashboard data based on fetched stocks
        const currentTotalValue = formattedStocks.reduce((sum, stock) => sum + stock.currentValue, 0);
        const investedValue = formattedStocks.reduce((sum, stock) => sum + (stock.units * stock.avgBuyPrice), 0);
        const returnValue = currentTotalValue - investedValue;
        const returnPercentage = (returnValue / investedValue) * 100;
        const dayChange = formattedStocks.reduce((sum, stock) => sum + (stock.currentValue - stock.units * stock.livePrice), 0);
        const totalInvestment = investedValue + returnValue;

        
        setDashboardData({
          totalInvestment: parseFloat(totalInvestment.toFixed(2)),
          dayChange: parseFloat(dayChange.toFixed(2)),
          invested: parseFloat(investedValue.toFixed(2)),
          return: parseFloat(returnValue.toFixed(2)),
          returnPercentage: parseFloat(returnPercentage.toFixed(2)),
        });

        // Update the Indian Stocks total investment in App.js
        setIndianStocksTotal(totalInvestment);

      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStocks();
  }, [setIndianStocksTotal]);

  return (
    <div className="container">
      <IndianStocksDashboard stockData={dashboardData} />
      <StockDisplay stocks={stocks} />
    </div>
  );
}

export default IndianStocksPage;
