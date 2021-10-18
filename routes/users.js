const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, check, validationResult } = require('express-validator');

// User Model
const User = require('../models/User');

// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post(
    '/',
    // Name validation
    body('name', 'Name is required').not().isEmpty(),
    // Email validation
    body('email', 'Please enter a valid email').isEmail(),
    // Password validation
    body(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    async(req, res) => {
        // Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Data in Request Body
        const { name, email, password } = req.body;

        try {
            // Check if there's a User with same Email
            let user = await User.findOne({ email }); // Finds a user with same email in DataBase
            if (user) return res.status(400).json({ msg: 'User already exists' });

            // Instatiate a User Model object
            user = new User({
                name,
                email,
                password,
            });

            // Hashing Password (Salt & Hash)
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;

            // Saving user in DataBase
            await user.save();

            // Response
            res.json({ msg: 'User Saved' });
        } catch (err) {}
    }
);

module.exports = router;