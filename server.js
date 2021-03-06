const express = require('express');
const path = require('path');
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

// Load static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    // Send index.html for every Route...
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

const PORT = process.env.PORT || 5000;
// Run application
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));