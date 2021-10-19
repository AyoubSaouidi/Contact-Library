const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// User Model
const User = require('../models/User');

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get('/', auth, async(req, res) => {
    try {
        // Find request User in DataBase by ID
        const user = await User.findById(req.user.id).select('-password');

        // Send User in response
        res.json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Sever Error' });
    }
});

// @route    POST api/auth
// @desc     Auth user & get token
// @access   Public
router.post(
    '/', [
        // Email validation
        body('email', 'Please enter a valid email').isEmail(),
        // Password validation
        body('password', 'Password is required').exists(),
    ],
    async(req, res) => {
        // Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Data in Request Body
        const { email, password } = req.body;

        try {
            // Check if there's a user with the email provided
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            // Verify user's password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            // Payload of token
            const payload = {
                user: {
                    id: user.id,
                },
            };

            // Create TOKEN
            jwt.sign(
                payload,
                config.get('jwtSecret'), { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(err.message);
            res.status(500).json({ error: 'Server Error' });
        }
    }
);

module.exports = router;