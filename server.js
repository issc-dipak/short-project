const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow CORS for frontend requests

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'md181023', // replace with your MySQL password
    database: 'personal_info'
});

db.connect((err) => {
    if (err) {
        console.error('Could not connect to the database', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

// POST API to add personal information
app.post('/api/addInfo', (req, res) => {
    const { full_name, education, age, mobile_no, city } = req.body;

    const query = 'INSERT INTO information (full_name, education, age, mobile_no, city) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [full_name, education, age, mobile_no, city], (err, result) => {
        if (err) {
            console.error('Error inserting data', err);
            return res.status(500).json({ error: 'Failed to insert data' });
        }
        res.status(201).json({ message: 'Data inserted successfully', id: result.insertId });
    });
});

// GET API to retrieve all personal information
app.get('/api/getInfo', (req, res) => {
    const query = 'SELECT * FROM information';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching data', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.status(200).json(result);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
