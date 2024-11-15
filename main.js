const express = require('express');
const addInfoRoute = require('./addUser'); 
const getInfoRoute = require('./getUser'); 

const app = express();
const port = 3000;

app.use(express.json()); 
app.use('/api', addInfoRoute); 
app.use('/api', getInfoRoute); 
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
