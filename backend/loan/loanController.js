const fs = require('fs');
const path = require('path');

// Path to loans.json file
const loansFilePath = path.join(__dirname, 'loans.json');

// Function to get all approved loans
const getApprovedLoans = (req, res) => {
    try {
        // Read the loans.json file
        const data = fs.readFileSync(loansFilePath, 'utf8');
        const loans = JSON.parse(data);
        res.json(loans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Function to approve a loan (for example)
const approveLoan = (req, res) => {
    try {
        const { loanType, portfolioSizeOrIncome, loanAmount, tenure } = req.body;

        // Create new loan object
        const newLoan = {
            loanType,
            portfolioSizeOrIncome,
            loanAmount,
            tenure,
            approvalDate: new Date().toISOString()
        };

        // Read existing loans
        const data = fs.readFileSync(loansFilePath, 'utf8');
        const loans = JSON.parse(data);

        // Add new loan to the loans array
        loans.push(newLoan);

        // Save updated loans array to loans.json
        fs.writeFileSync(loansFilePath, JSON.stringify(loans, null, 2));

        res.status(201).json(newLoan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getApprovedLoans, approveLoan };
