const express = require('express');
const Joi = require('joi'); 
const db = require('./db.js'); 

const router = express.Router();
const infoSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required.",
        "string.empty": "Name cannot be empty.",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email is required.",
        "string.email": "Invalid email format.",
    }),
    education: Joi.string().max(100).optional(),
    age: Joi.number().integer().min(1).max(120).required(),
    mobile_no: Joi.string()
        .pattern(/^[7-9]{1}\d{9}$/)
        .required()
        .messages({
            "any.required": "Mobile number is required.",
            "string.pattern.base":
                "Invalid mobile number format. It should start with 7, 8, or 9 followed by 10 digits.",
        }),
    city: Joi.string().max(100).optional(),
});
router.post('/addInfo', async (req, res) => {
    const { error, value } = infoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const { name, email, education, age, mobile_no, city } = value;

    const checkQuery = 'SELECT * FROM info WHERE email = ? AND mobile_no = ?';
    db.query(checkQuery, [email, mobile_no], (err, result) => {
        if (err) {
            console.error('Error checking for duplicates', err);
            return res.status(500).json({ error: 'Failed to check for duplicates' });
        }

        if (result.length > 0) {
            return res.status(400).json({
                error: 'User already registered. Please use a different email address or mobile number.',
            });
        }
        const query = 'INSERT INTO info (name, email, education, age, mobile_no, city) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [name, email, education, age, mobile_no, city], (err, result) => {
            if (err) {
                console.error('Error inserting data', err);
                return res.status(500).json({ error: 'Failed to insert data' });
            }
            res.status(200).json({ message: 'Data inserted successfully', id: result.insertId });
        });
    });
});
module.exports = router;
