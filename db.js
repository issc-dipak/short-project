const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'md181023', 
    database: 'homechef'
});

db.connect((err) => {
    if (err) {
        console.error('Could not connect to the database', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

module.exports = db;
