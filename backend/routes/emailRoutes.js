const express = require('express');
const router = express.Router();
const sendEmail = require('../configuration/email');

// Route to send an email
router.post('/send', (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'All fields are required: to, subject, text' });
  }

  sendEmail(to, subject, text, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error.message });
    }

    res.status(200).json({ message: 'Email sent successfully', info });
  });
});

module.exports = router;