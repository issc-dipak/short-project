const express = require('express');
const Joi = require('joi'); 
const db = require('./db.js'); 

const router = express.Router();
router.get('/getInfo', async (req, res) => {
    const email = req.query.email;
    const emailValidation = Joi.string().email().required();
    const { error } = emailValidation.validate(email);
    if (error) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    const query = 'SELECT * FROM info WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Error fetching data', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'No record found for the given email' });
        }

        res.status(200).json(result[0]);
    });
});

module.exports = router;
