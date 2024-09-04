// backend/fdController.js
const fs = require('fs').promises;
const path = require('path');

// File path for FD data
const fdDataFilePath = path.join(__dirname, 'fdData.json');

// Utility function to read JSON file 
const readJSONFile = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

// Utility function to write JSON file
const writeJSONFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Function to get FD data
const getFDs = async (req, res) => {
  try {
    const fdData = await readJSONFile(fdDataFilePath);
    res.json(fdData);
  } catch (err) {
    console.error('Error reading FD data:', err);
    res.status(500).json({ error: 'Failed to load FD data' });
  }
};

// Function to add a new FD
const addFD = async (req, res) => {
  try {
    const newFD = req.body;
    const fdData = await readJSONFile(fdDataFilePath);
    fdData.push(newFD);
    await writeJSONFile(fdDataFilePath, fdData);
    res.status(201).json(newFD);
  } catch (err) {
    console.error('Error adding FD:', err);
    res.status(500).json({ error: 'Failed to add FD' });
  }
};

// Function to update an existing FD
const updateFD = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFD = req.body;
    const fdData = await readJSONFile(fdDataFilePath);
    const index = fdData.findIndex(fd => fd.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ error: 'FD not found' });
    }

    fdData[index] = updatedFD;
    await writeJSONFile(fdDataFilePath, fdData);
    res.json(updatedFD);
  } catch (err) {
    console.error('Error updating FD:', err);
    res.status(500).json({ error: 'Failed to update FD' });
  }
};

// Function to delete an FD
const deleteFD = async (req, res) => {
  try {
    const { id } = req.params;
    let fdData = await readJSONFile(fdDataFilePath);
    fdData = fdData.filter(fd => fd.id !== parseInt(id));
    await writeJSONFile(fdDataFilePath, fdData);
    res.status(200).send('FD Deleted');
  } catch (err) {
    console.error('Error deleting FD:', err);
    res.status(500).json({ error: 'Failed to delete FD' });
  }
};

module.exports = { getFDs, addFD, updateFD, deleteFD };
