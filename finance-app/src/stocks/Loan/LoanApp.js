import React, { useState } from 'react';
import './LoanApp.css'; // Ensure the CSS is specific to LoanApp

const LoanApp = () => {
    const [loanType, setLoanType] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [tenure, setTenure] = useState('');
    const [emiResult, setEmiResult] = useState('');
    const [eligibilityResult, setEligibilityResult] = useState('');
    const [approvalResult, setApprovalResult] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleLoanTypeChange = (event) => {
        setLoanType(event.target.value);
        setInputValue('');
        setLoanAmount('');
        setTenure('');
        setEmiResult('');
        setEligibilityResult('');
        setApprovalResult('');
        setIsSubmitted(false);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleLoanAmountChange = (event) => {
        setLoanAmount(event.target.value);
    };

    const handleTenureChange = (event) => {
        setTenure(event.target.value);
    };

    const calculateEMI = (amount, tenure, interestRate) => {
        const monthlyInterestRate = interestRate / 12 / 100;
        const emi = amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure) / (Math.pow(1 + monthlyInterestRate, tenure) - 1);
        return emi;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true); // Set isSubmitted to true

        let maxLoanAmount;
        let interestRate;

        if (loanType === 'portfolio') {
            maxLoanAmount = inputValue * 0.5; // 50% of portfolio size
            interestRate = 12; // 12% interest for portfolio-based loans
        } else if (loanType === 'income') {
            maxLoanAmount = inputValue * 10; // 10 times the monthly income
            interestRate = 14; // 14% interest for income-based loans
        }

        if (loanAmount <= maxLoanAmount) {
            if (loanAmount < 5000 && tenure <= 3) {
                interestRate = 0; // No interest for small loans under ₹5000 with a tenure of 3 months or less
            }

            const emi = calculateEMI(loanAmount, tenure, interestRate);
            setEmiResult(`Your EMI is ₹${emi.toFixed(2)} for a loan of ₹${loanAmount} over ${tenure} months at ${interestRate}% interest rate.`);
            setEligibilityResult(`You are eligible for a loan of ₹${loanAmount}`);

            // Call API to approve loan
            const loanDetails = {
                loanType,
                portfolioOrIncome: inputValue,
                loanAmount,
                tenure,
            };

            try {
                const response = await fetch('http://localhost:5000/api/loans/approve', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loanDetails),
                });

                if (response.ok) {
                    setApprovalResult('Loan Approved');
                } else {
                    const data = await response.json();
                    setApprovalResult(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Error approving loan:', error);
                setApprovalResult('An error occurred while approving the loan.');
            }
        } else {
            setEligibilityResult('Loan amount exceeds your eligible limit.');
            setEmiResult('');
            setApprovalResult('');
        }
    };

    return (
        <div className="loan-app-container">
            <header>
                <h1>Loan Application</h1>
            </header>
            <div className="container">
                <form id="loan-form" onSubmit={handleSubmit}>
                    <label htmlFor="loanType">Choose Loan Type:</label>
                    <select id="loanType" name="loanType" value={loanType} onChange={handleLoanTypeChange} required>
                        <option value="">Select...</option>
                        <option value="portfolio">Based on Portfolio</option>
                        <option value="income">Based on Income</option>
                    </select>

                    {loanType && (
                        <>
                            <label htmlFor="inputValue">
                                {loanType === 'portfolio' ? 'Portfolio Size:' : 'Monthly Income:'}
                            </label>
                            <input
                                type="number"
                                id="inputValue"
                                name="inputValue"
                                value={inputValue}
                                onChange={handleInputChange}
                                required
                            />

                            <label htmlFor="loanAmount">Loan Amount:</label>
                            <input
                                type="number"
                                id="loanAmount"
                                name="loanAmount"
                                value={loanAmount}
                                onChange={handleLoanAmountChange}
                                required
                            />

                            <label htmlFor="tenure">Tenure (months):</label>
                            <input
                                type="number"
                                id="tenure"
                                name="tenure"
                                value={tenure}
                                onChange={handleTenureChange}
                                required
                            />

                            <button type="submit">Submit</button>
                        </>
                    )}

                    {isSubmitted && (
                        <>
                            <div id="eligibility-result" className="result">{eligibilityResult}</div>
                            <div id="emi-result" className="result">{emiResult}</div>
                            <div id="approval-result" className="result">{approvalResult}</div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoanApp;
