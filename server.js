const express = require('express');
const connectDB = require('./config/db');

// Create Express App
const app = express();

// Connect to DataBase
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;
// Run application
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));