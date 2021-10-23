const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// User Model
const User = require('../models/User');
// Contact Model
const Contact = require('../models/Contact');

// @route    GET api/contacts
// @desc     Get all user's contacts
// @access   Private
router.get('/', auth, async(req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sever Error');
    }
});

// @route    POST api/contacts
// @desc     Add new contact
// @access   Private
router.post(
    '/', [
        auth, [
            // Name is required
            body('name', 'Name is required').not().isEmpty(),
            // Email is required
            body('email', 'Please enter a valid email').isEmail(),
        ],
    ],
    async(req, res) => {
        // Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Data in Request Body
        const { name, email, phone, type } = req.body;

        try {
            // Create new Contact
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id,
            });

            // Save in DataBase
            const contact = await newContact.save();

            // Return contact in response
            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Sever Error');
        }
    }
);

// @route    PUT api/contacts/:id
// @desc     Update contact
// @access   Private
router.put('/:id', auth, async(req, res) => {
    // Id parameter in request
    const id = req.params.id;

    // Data in Request Body
    const { name, email, phone, type } = req.body;

    // Build Contact Fields
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        // Find Contact by ID in DataBase
        let contact = await Contact.findById(id);
        if (!contact) {
            return res.status(400).json({ msg: 'Contact does not exist' });
        }

        // Check if user owns Contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Update Contact
        contact = await Contact.findByIdAndUpdate(
            id, { $set: contactFields }, { new: true }
        );

        // Return contact in response
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sever Error');
    }
});

// @route    DELETE api/contacts/:id
// @desc     Delete contact
// @access   Private
router.delete('/:id', auth, async(req, res) => {
    // Id parameter in request
    const id = req.params.id;

    try {
        // Find Contact by ID in DataBase
        let contact = await Contact.findById(id);
        if (!contact) {
            return res.status(400).json({ msg: 'Contact does not exist' });
        }

        // Check if user owns Contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Delete Contact
        await Contact.findByIdAndRemove(id);

        // Return contact in response
        res.json({ msg: 'Contact deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sever Error');
    }
});

module.exports = router;